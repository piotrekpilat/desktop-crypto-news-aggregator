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

// ScrapeUserTweetsBrowser navigates to the user's profile in headless Chrome with session cookies
// and extracts tweets directly from the rendered DOM.
func ScrapeUserTweetsBrowser(username string, count int, session Session) ([]Tweet, error) {
	username = strings.TrimPrefix(username, "@")
	if count <= 0 {
		count = 10
	}

	tmpDir, err := os.MkdirTemp("", "xscraper-headless-*")
	if err != nil {
		return nil, fmt.Errorf("failed creating temp dir: %w", err)
	}
	defer os.RemoveAll(tmpDir)

	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", true),
		chromedp.Flag("disable-gpu", true),
		chromedp.Flag("user-data-dir", tmpDir),
		chromedp.Flag("disable-blink-features", "AutomationControlled"),
		chromedp.UserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"),
	)

	allocCtx, cancelAlloc := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancelAlloc()

	ctx, cancelCtx := chromedp.NewContext(allocCtx)
	defer cancelCtx()

	// Set timeout
	ctx, cancelTimeout := context.WithTimeout(ctx, 30*time.Second)
	defer cancelTimeout()

	profileURL := fmt.Sprintf("https://x.com/%s", username)

	var tweets []Tweet

	// Script that extracts tweets from rendered DOM
	extractJS := `
	(() => {
		const articles = document.querySelectorAll('article[data-testid="tweet"]');
		const results = [];

		articles.forEach((art) => {
			try {
				// Text
				const textNode = art.querySelector('div[data-testid="tweetText"]');
				const text = textNode ? textNode.innerText : '';

				// Time & URL
				const timeNode = art.querySelector('time');
				const createdAt = timeNode ? timeNode.getAttribute('datetime') : '';
				const linkNode = timeNode ? timeNode.closest('a') : null;
				const permalink = linkNode ? linkNode.href : '';

				// ID
				let id = '';
				if (permalink) {
					const parts = permalink.split('/status/');
					if (parts.length > 1) {
						id = parts[1].split('?')[0];
					}
				}

				// Author info
				const userNode = art.querySelector('div[data-testid="User-Name"]');
				let authorName = '';
				let authorHandle = '';
				if (userNode) {
					const spans = userNode.querySelectorAll('span');
					if (spans.length > 0) authorName = spans[0].innerText;
					for (const s of spans) {
						if (s.innerText.startsWith('@')) {
							authorHandle = s.innerText.replace('@', '');
							break;
						}
					}
				}

				// Metrics (reply, retweet, like)
				const getMetric = (testId) => {
					const el = art.querySelector(` + "`" + `button[data-testid="${testId}"]` + "`" + `);
					if (!el) return 0;
					const text = el.innerText.trim();
					if (!text) return 0;
					let num = parseFloat(text.replace(/,/g, ''));
					if (text.includes('K')) num *= 1000;
					if (text.includes('M')) num *= 1000000;
					return Math.round(num) || 0;
				};

				const replies = getMetric('reply');
				const retweets = getMetric('retweet');
				const likes = getMetric('like');

				// Media
				const media = [];
				art.querySelectorAll('div[data-testid="tweetPhoto"] img').forEach(img => {
					if (img.src) media.push(img.src);
				});

				if (id || text) {
					results.push({
						id: id,
						text: text,
						created_at_raw: createdAt,
						author: authorHandle,
						author_name: authorName,
						permanent_url: permalink,
						likes: likes,
						retweets: retweets,
						replies: replies,
						media_urls: media
					});
				}
			} catch (e) {}
		});

		return results;
	})()
	`

	var rawResults []struct {
		ID           string   `json:"id"`
		Text         string   `json:"text"`
		CreatedAtRaw string   `json:"created_at_raw"`
		Author       string   `json:"author"`
		AuthorName   string   `json:"author_name"`
		PermanentURL string   `json:"permanent_url"`
		Likes        int      `json:"likes"`
		Retweets     int      `json:"retweets"`
		Replies      int      `json:"replies"`
		MediaURLs    []string `json:"media_urls"`
	}

	err = chromedp.Run(ctx,
		network.Enable(),
		chromedp.ActionFunc(func(ctx context.Context) error {
			// Set cookies before navigation
			if session.AuthToken != "" {
				err := network.SetCookie("auth_token", session.AuthToken).
					WithDomain(".x.com").
					WithPath("/").
					WithSecure(true).
					WithHTTPOnly(true).
					Do(ctx)
				if err != nil {
					return err
				}
			}
			if session.CT0 != "" {
				err := network.SetCookie("ct0", session.CT0).
					WithDomain(".x.com").
					WithPath("/").
					WithSecure(true).
					Do(ctx)
				if err != nil {
					return err
				}
			}
			return nil
		}),
		chromedp.Navigate(profileURL),
		chromedp.WaitVisible(`article[data-testid="tweet"]`, chromedp.ByQuery),
		chromedp.Sleep(2*time.Second),
		chromedp.Evaluate(extractJS, &rawResults),
	)

	if err != nil {
		return nil, fmt.Errorf("błąd renderowania profilu @%s w przeglądarce: %w", username, err)
	}

	for _, r := range rawResults {
		tTime, _ := time.Parse(time.RFC3339, r.CreatedAtRaw)
		if r.Author == "" {
			r.Author = username
		}
		tweets = append(tweets, Tweet{
			ID:           r.ID,
			Text:         r.Text,
			CreatedAt:    tTime,
			CreatedAtRaw: r.CreatedAtRaw,
			Author:       r.Author,
			AuthorName:   r.AuthorName,
			PermanentURL: r.PermanentURL,
			Likes:        r.Likes,
			Retweets:     r.Retweets,
			Replies:      r.Replies,
			MediaURLs:    r.MediaURLs,
		})
		if len(tweets) >= count {
			break
		}
	}

	return tweets, nil
}
