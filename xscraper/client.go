package xscraper

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/cookiejar"
	"os"
	"time"
)

const (
	// DefaultBearerToken is the standard public Bearer token used by x.com web frontend
	DefaultBearerToken = "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF80IUq16cHjhLTvJu4FA33AGWWjCpTnA"
	DefaultUserAgent   = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)

// Option allows configuring the Scraper client.
type Option func(*Client)

// Client handles interaction with Twitter/X endpoints.
type Client struct {
	httpClient  *http.Client
	bearerToken string
	userAgent   string
	session     Session
}

// WithSession sets initial session auth cookies.
func WithSession(session Session) Option {
	return func(c *Client) {
		c.session = session
	}
}

// WithAuthCookies sets auth_token and ct0 directly.
func WithAuthCookies(authToken, ct0 string) Option {
	return func(c *Client) {
		c.session = Session{
			AuthToken: authToken,
			CT0:       ct0,
			UpdatedAt: time.Now(),
		}
	}
}

// WithHTTPClient sets a custom http.Client.
func WithHTTPClient(client *http.Client) Option {
	return func(c *Client) {
		c.httpClient = client
	}
}

// WithUserAgent sets a custom User-Agent.
func WithUserAgent(ua string) Option {
	return func(c *Client) {
		c.userAgent = ua
	}
}

// New creates a new reusable X Scraper Client.
func New(opts ...Option) (*Client, error) {
	jar, err := cookiejar.New(nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create cookiejar: %w", err)
	}

	c := &Client{
		httpClient: &http.Client{
			Jar:     jar,
			Timeout: 20 * time.Second,
		},
		bearerToken: DefaultBearerToken,
		userAgent:   DefaultUserAgent,
	}

	for _, opt := range opts {
		opt(c)
	}

	return c, nil
}

// SetSession updates the active session credentials.
func (c *Client) SetSession(session Session) {
	c.session = session
}

// GetSession returns the current session.
func (c *Client) GetSession() Session {
	return c.session
}

// SaveSessionToFile serializes current session credentials to a JSON file.
func (c *Client) SaveSessionToFile(path string) error {
	data, err := json.MarshalIndent(c.session, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(path, data, 0600)
}

// LoadSessionFromFile reads session credentials from a JSON file and returns *Session.
func LoadSessionFromFile(path string) (*Session, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var session Session
	if err := json.Unmarshal(data, &session); err != nil {
		return nil, err
	}
	return &session, nil
}

// LoadSessionFromFile reads session credentials from a JSON file into Client.
func (c *Client) LoadSessionFromFile(path string) error {
	sess, err := LoadSessionFromFile(path)
	if err != nil {
		return err
	}
	c.session = *sess
	return nil
}

// newRequest creates an authenticated HTTP request with all required Twitter web headers.
func (c *Client) newRequest(method, endpoint string) (*http.Request, error) {
	req, err := http.NewRequest(method, endpoint, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "Bearer "+c.bearerToken)
	req.Header.Set("User-Agent", c.userAgent)
	req.Header.Set("Accept", "*/*")
	req.Header.Set("Accept-Language", "en-US,en;q=0.9")
	req.Header.Set("Referer", "https://x.com/")
	req.Header.Set("x-twitter-active-user", "yes")
	req.Header.Set("x-twitter-auth-type", "OAuth2Session")
	req.Header.Set("x-twitter-client-language", "en")

	// Set CSRF token header if available
	if c.session.CT0 != "" {
		req.Header.Set("x-csrf-token", c.session.CT0)
	}

	// Set Cookies
	if c.session.AuthToken != "" {
		cookieHeader := fmt.Sprintf("auth_token=%s", c.session.AuthToken)
		if c.session.CT0 != "" {
			cookieHeader += fmt.Sprintf("; ct0=%s", c.session.CT0)
		}
		req.Header.Set("Cookie", cookieHeader)
	}

	return req, nil
}

// ScrapeUserTweets extracts tweets using headless browser with authenticated session.
func (c *Client) ScrapeUserTweets(username string, count int) ([]Tweet, error) {
	return ScrapeUserTweetsBrowser(username, count, c.session)
}
