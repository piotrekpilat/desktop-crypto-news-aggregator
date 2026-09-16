package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"desktop-widget/xscraper"
)

func main() {
	userFlag := flag.String("user", "saylor", "X (Twitter) handle to scrape (e.g. saylor)")
	countFlag := flag.Int("count", 10, "Number of tweets to retrieve")
	loginFlag := flag.Bool("login", false, "Open Chrome browser window to log in and automatically capture session cookies")
	tokenFlag := flag.String("token", "", "X auth_token cookie value (or set X_AUTH_TOKEN env)")
	ct0Flag := flag.String("ct0", "", "X ct0 (CSRF) cookie value (or set X_CT0 env)")
	sessionFile := flag.String("session", "session.json", "Path to session file containing cookies")
	saveSession := flag.Bool("save", false, "Save provided tokens to session file")
	jsonOutput := flag.Bool("json", false, "Output results as formatted JSON")
	flag.Parse()

	scraper, err := xscraper.New()
	if err != nil {
		fmt.Fprintf(os.Stderr, "❌ Error initializing scraper: %v\n", err)
		os.Exit(1)
	}

	// If -login flag is specified, open interactive login window
	if *loginFlag {
		session, err := xscraper.LoginInteractive(*sessionFile)
		if err != nil {
			fmt.Fprintf(os.Stderr, "❌ Błąd podczas logowania: %v\n", err)
			os.Exit(1)
		}
		scraper.SetSession(*session)
	} else {
		// 1. Try loading from session file if it exists
		if _, err := os.Stat(*sessionFile); err == nil {
			if err := scraper.LoadSessionFromFile(*sessionFile); err == nil {
				// Loaded
			}
		}

		// 2. Override with CLI flags or Environment variables if provided
		token := *tokenFlag
		if token == "" {
			token = os.Getenv("X_AUTH_TOKEN")
		}

		ct0 := *ct0Flag
		if ct0 == "" {
			ct0 = os.Getenv("X_CT0")
		}

		currentSession := scraper.GetSession()
		if token != "" {
			currentSession.AuthToken = token
		}
		if ct0 != "" {
			currentSession.CT0 = ct0
		}
		scraper.SetSession(currentSession)
	}

	// Check if we have auth token
	if scraper.GetSession().AuthToken == "" {
		fmt.Println("⚠️  Brak tokenu sesji Twitter/X.")
		fmt.Println("Wybierz jedną z opcji:")
		fmt.Println("  1. Automatyczne logowanie w oknie przeglądarki (zalecane):")
		fmt.Printf("     go run ./xscraper/cmd -login -user %s\n\n", *userFlag)
		fmt.Println("  2. Ręczne podanie ciasteczek z DevTools:")
		fmt.Printf("     go run ./xscraper/cmd -user %s -token TWOJ_AUTH_TOKEN -ct0 TWOJ_CT0 -save\n\n", *userFlag)
		os.Exit(1)
	}

	if *saveSession {
		if err := scraper.SaveSessionToFile(*sessionFile); err != nil {
			fmt.Printf("⚠️ Nie udało się zapisać sesji: %v\n", err)
		} else {
			absPath, _ := filepath.Abs(*sessionFile)
			fmt.Printf("💾 Zapisano sesję do: %s\n\n", absPath)
		}
	}

	targetUser := strings.TrimPrefix(*userFlag, "@")
	fmt.Printf("🔍 Pobieranie tweetów dla @%s (limit: %d)...\n\n", targetUser, *countFlag)

	tweets, err := scraper.ScrapeUserTweets(targetUser, *countFlag)
	if err != nil {
		fmt.Fprintf(os.Stderr, "❌ Błąd pobierania tweetów: %v\n", err)
		os.Exit(1)
	}

	if *jsonOutput {
		out, _ := json.MarshalIndent(tweets, "", "  ")
		fmt.Println(string(out))
		return
	}

	fmt.Printf("✅ Pomyślnie pobrano %d tweetów dla @%s:\n", len(tweets), targetUser)
	fmt.Println(strings.Repeat("=", 70))

	for i, t := range tweets {
		fmt.Printf("[%d] 🕒 %s | ❤️  %d | 🔁 %d | 💬 %d\n", i+1, t.CreatedAt.Format("2006-01-02 15:04"), t.Likes, t.Retweets, t.Replies)
		fmt.Printf("🔗 %s\n", t.PermanentURL)
		fmt.Printf("📝 %s\n", t.Text)
		if len(t.MediaURLs) > 0 {
			fmt.Printf("🖼️  Media: %s\n", strings.Join(t.MediaURLs, ", "))
		}
		fmt.Println(strings.Repeat("-", 70))
	}
}
