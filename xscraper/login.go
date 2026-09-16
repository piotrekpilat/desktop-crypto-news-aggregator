package xscraper

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/chromedp/cdproto/network"
	"github.com/chromedp/chromedp"
)

// LoginInteractive opens a stealth Chrome browser window for user login on X.com
// and automatically intercepts `auth_token` and `ct0` cookies upon successful login.
func LoginInteractive(sessionPath string) (*Session, error) {
	// Create temporary profile directory so it doesn't conflict with existing Chrome instances
	tmpDir, err := os.MkdirTemp("", "xscraper-chrome-*")
	if err != nil {
		return nil, fmt.Errorf("failed creating temp user data dir: %w", err)
	}
	defer os.RemoveAll(tmpDir)

	// Stealth flags to avoid Google / Cloudflare "insecure browser / automation" block
	opts := []chromedp.ExecAllocatorOption{
		chromedp.NoFirstRun,
		chromedp.NoDefaultBrowserCheck,
		chromedp.Flag("headless", false),
		chromedp.Flag("disable-gpu", false),
		chromedp.Flag("user-data-dir", tmpDir),
		chromedp.Flag("window-size", "950,850"),
		chromedp.Flag("disable-blink-features", "AutomationControlled"),
		chromedp.Flag("excludeSwitches", "enable-automation"),
		chromedp.Flag("useAutomationExtension", false),
		chromedp.UserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"),
	}

	allocCtx, cancelAlloc := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancelAlloc()

	ctx, cancelCtx := chromedp.NewContext(allocCtx)
	defer cancelCtx()

	fmt.Println("🌐 Otwieram okno logowania X (Twitter) w trybie stealth...")
	fmt.Println("👉 Zaloguj się (np. mailem/hasłem lub przez Google) w otwartym oknie przeglądarki.")

	var session *Session
	sessionChan := make(chan *Session, 1)

	// Run browser navigation and evaluate stealth JS
	if err := chromedp.Run(ctx,
		network.Enable(),
		chromedp.ActionFunc(func(ctx context.Context) error {
			// Overwrite navigator.webdriver to false
			return chromedp.Evaluate(`
				Object.defineProperty(navigator, 'webdriver', {
					get: () => undefined
				});
			`, nil).Do(ctx)
		}),
		chromedp.Navigate("https://x.com/login"),
	); err != nil {
		return nil, fmt.Errorf("failed starting browser: %w", err)
	}

	// Poll cookies until auth_token and ct0 are detected or timeout
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	timeout := time.After(5 * time.Minute)

	for {
		select {
		case <-timeout:
			return nil, fmt.Errorf("upłynął limit czasu na logowanie (5 min)")
		case <-ticker.C:
			var currentURL string
			var cookies []*network.Cookie
			err := chromedp.Run(ctx,
				chromedp.Location(&currentURL),
				chromedp.ActionFunc(func(ctx context.Context) error {
					var err error
					cookies, err = network.GetCookies().Do(ctx)
					return err
				}),
			)
			if err != nil {
				// Browser might have been closed by user
				continue
			}

			var authToken, ct0, twid string
			for _, cookie := range cookies {
				if cookie.Name == "auth_token" {
					authToken = cookie.Value
				}
				if cookie.Name == "ct0" {
					ct0 = cookie.Value
				}
				if cookie.Name == "twid" {
					twid = cookie.Value
				}
			}

			// Login is only complete when user has auth_token AND (twid is set OR URL is /home)
			isLoggedIn := authToken != "" && ct0 != "" && (twid != "" || (!strings.Contains(currentURL, "/login") && !strings.Contains(currentURL, "/flow") && strings.Contains(currentURL, "x.com")))

			if isLoggedIn {
				// Give 2 seconds for final cookies to be set
				time.Sleep(2 * time.Second)

				// Re-fetch final cookies
				_ = chromedp.Run(ctx, chromedp.ActionFunc(func(ctx context.Context) error {
					var err error
					cookies, err = network.GetCookies().Do(ctx)
					return err
				}))
				for _, cookie := range cookies {
					if cookie.Name == "auth_token" {
						authToken = cookie.Value
					}
					if cookie.Name == "ct0" {
						ct0 = cookie.Value
					}
				}

				session = &Session{
					AuthToken: authToken,
					CT0:       ct0,
					UpdatedAt: time.Now(),
				}
				sessionChan <- session
				goto Captured
			}
		}
	}

Captured:
	fmt.Println("\n🎉 Wykryto pomyślne logowanie! Przechwycono ciasteczka sesyjne.")

	// Close browser
	_ = chromedp.Run(ctx, chromedp.ActionFunc(func(ctx context.Context) error {
		return chromedp.Cancel(ctx)
	}))

	if sessionPath != "" {
		scraper, _ := New(WithSession(*session))
		if err := scraper.SaveSessionToFile(sessionPath); err != nil {
			fmt.Printf("⚠️ Ostrzeżenie: nie udało się zapisać do %s: %v\n", sessionPath, err)
		} else {
			fmt.Printf("💾 Zapisano sesję do pliku: %s\n\n", sessionPath)
		}
	}

	return session, nil
}
