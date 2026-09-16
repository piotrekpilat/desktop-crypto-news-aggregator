package xscraper

import "time"

// Tweet represents a parsed tweet with key metadata.
type Tweet struct {
	ID           string    `json:"id"`
	Text         string    `json:"text"`
	CreatedAt    time.Time `json:"created_at"`
	CreatedAtRaw string    `json:"created_at_raw"`
	Author       string    `json:"author"`       // Screen name (handle), e.g. "saylor"
	AuthorName   string    `json:"author_name"`  // Display name, e.g. "Michael Saylor"
	AuthorAvatar string    `json:"author_avatar"`
	PermanentURL string    `json:"permanent_url"`
	Likes        int       `json:"likes"`
	Retweets     int       `json:"retweets"`
	Replies      int       `json:"replies"`
	Views        string    `json:"views,omitempty"`
	IsRetweet    bool      `json:"is_retweet"`
	IsReply      bool      `json:"is_reply"`
	IsQuote      bool      `json:"is_quote"`
	QuoteTweet   *Tweet    `json:"quote_tweet,omitempty"`
	MediaURLs    []string  `json:"media_urls,omitempty"`
	Conversation string    `json:"conversation_id,omitempty"`
}

// User represents basic profile information.
type User struct {
	ID              string `json:"id"`
	RestID          string `json:"rest_id"`
	Name            string `json:"name"`
	ScreenName      string `json:"screen_name"`
	Description     string `json:"description"`
	FollowersCount  int    `json:"followers_count"`
	FollowingCount  int    `json:"following_count"`
	StatusesCount   int    `json:"statuses_count"`
	ProfileImageURL string `json:"profile_image_url"`
	Verified        bool   `json:"verified"`
}

// Session holds the credentials needed for authenticated requests.
type Session struct {
	AuthToken string    `json:"auth_token"`
	CT0       string    `json:"ct0"`
	UpdatedAt time.Time `json:"updated_at"`
}
