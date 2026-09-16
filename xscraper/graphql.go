package xscraper

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// GraphQL endpoints and query IDs used by the official web client
const (
	// UserByScreenName query ID
	UserByScreenNameQueryID = "sLVLhk0bGj3MVFEKTdax1w"
	// UserTweets query ID
	UserTweetsQueryID = "V7H0Ap3_Hh2FyS75OCDO3Q"
)

// Standard feature flags expected by X GraphQL API
var defaultFeatures = map[string]bool{
	"hidden_profile_likes_enabled":                                     true,
	"hidden_profile_subscriptions_enabled":                              true,
	"responsive_web_graphql_exclude_directive_enabled":                 true,
	"verified_phone_label_enabled":                                     false,
	"subscriptions_verification_info_is_identity_verified_enabled":     true,
	"subscriptions_verification_info_verified_since_enabled":           true,
	"highlights_tweets_tab_ui_enabled":                                 true,
	"creator_subscriptions_tweet_preview_api_enabled":                  true,
	"responsive_web_graphql_skip_user_profile_image_extensions_enabled": false,
	"responsive_web_graphql_timeline_navigation_enabled":               true,
	"responsive_web_enhance_cards_enabled":                             false,
}

// GetUserByScreenName fetches user profile and internal Rest ID.
func (c *Client) GetUserByScreenName(screenName string) (*User, error) {
	screenName = strings.TrimPrefix(screenName, "@")

	variables := map[string]interface{}{
		"screen_name":                screenName,
		"withSafetyModeUserFields":  true,
	}

	varJSON, _ := json.Marshal(variables)
	featJSON, _ := json.Marshal(defaultFeatures)

	apiURL := fmt.Sprintf(
		"https://x.com/i/api/graphql/%s/UserByScreenName?variables=%s&features=%s",
		UserByScreenNameQueryID,
		url.QueryEscape(string(varJSON)),
		url.QueryEscape(string(featJSON)),
	)

	req, err := c.newRequest("GET", apiURL)
	if err != nil {
		return nil, err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("network request failed: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("UserByScreenName failed with status %d: %s", resp.StatusCode, string(body))
	}

	var res struct {
		Data struct {
			User struct {
				Result struct {
					RestID string `json:"rest_id"`
					Legacy struct {
						Name            string `json:"name"`
						ScreenName      string `json:"screen_name"`
						Description     string `json:"description"`
						FollowersCount  int    `json:"followers_count"`
						FriendsCount    int    `json:"friends_count"`
						StatusesCount   int    `json:"statuses_count"`
						ProfileImageURL string `json:"profile_image_url_https"`
						Verified        bool   `json:"verified"`
					} `json:"legacy"`
				} `json:"result"`
			} `json:"user"`
		} `json:"data"`
	}

	if err := json.Unmarshal(body, &res); err != nil {
		return nil, fmt.Errorf("failed to parse user json: %w", err)
	}

	u := res.Data.User.Result
	if u.RestID == "" {
		return nil, fmt.Errorf("user @%s not found or account is restricted", screenName)
	}

	return &User{
		RestID:          u.RestID,
		Name:            u.Legacy.Name,
		ScreenName:      u.Legacy.ScreenName,
		Description:     u.Legacy.Description,
		FollowersCount:  u.Legacy.FollowersCount,
		FollowingCount:  u.Legacy.FriendsCount,
		StatusesCount:   u.Legacy.StatusesCount,
		ProfileImageURL: u.Legacy.ProfileImageURL,
		Verified:        u.Legacy.Verified,
	}, nil
}

// GetUserTweets fetches the most recent tweets for the given username.
func (c *Client) GetUserTweets(screenName string, count int) ([]Tweet, error) {
	if count <= 0 {
		count = 20
	}

	user, err := c.GetUserByScreenName(screenName)
	if err != nil {
		return nil, fmt.Errorf("failed resolving user @%s: %w", screenName, err)
	}

	variables := map[string]interface{}{
		"userId":                                 user.RestID,
		"count":                                  count,
		"includePromotedContent":                 false,
		"withQuickPromoteEligibilityTweetFields": true,
		"withVoice":                              true,
		"withV2Timeline":                         true,
	}

	varJSON, _ := json.Marshal(variables)
	featJSON, _ := json.Marshal(defaultFeatures)

	apiURL := fmt.Sprintf(
		"https://x.com/i/api/graphql/%s/UserTweets?variables=%s&features=%s",
		UserTweetsQueryID,
		url.QueryEscape(string(varJSON)),
		url.QueryEscape(string(featJSON)),
	)

	req, err := c.newRequest("GET", apiURL)
	if err != nil {
		return nil, err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("network request failed: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("UserTweets failed with status %d: %s", resp.StatusCode, string(body))
	}

	return parseTimelineTweets(body)
}

// parseTimelineTweets navigates the complex nested timeline structure returned by Twitter GraphQL.
func parseTimelineTweets(raw []byte) ([]Tweet, error) {
	var rawData map[string]interface{}
	if err := json.Unmarshal(raw, &rawData); err != nil {
		return nil, err
	}

	var tweets []Tweet
	seen := make(map[string]bool)

	// Recursive extraction of all "tweet_results" or "legacy" structures
	var extractTweets func(v interface{})
	extractTweets = func(v interface{}) {
		if v == nil {
			return
		}

		switch val := v.(type) {
		case map[string]interface{}:
			// Check if this map is a tweet item
			if result, ok := val["tweet_results"].(map[string]interface{}); ok {
				if tweetRes, ok := result["result"].(map[string]interface{}); ok {
					t := parseSingleTweet(tweetRes)
					if t != nil && t.ID != "" && !seen[t.ID] {
						seen[t.ID] = true
						tweets = append(tweets, *t)
					}
				}
			}

			// Continue traversing
			for _, item := range val {
				extractTweets(item)
			}
		case []interface{}:
			for _, item := range val {
				extractTweets(item)
			}
		}
	}

	extractTweets(rawData)
	return tweets, nil
}

func parseSingleTweet(tweetObj map[string]interface{}) *Tweet {
	// If tweet is wrapped in TweetWithVisibilityResults
	if typeName, ok := tweetObj["__typename"].(string); ok && typeName == "TweetWithVisibilityResults" {
		if inner, ok := tweetObj["tweet"].(map[string]interface{}); ok {
			tweetObj = inner
		}
	}

	legacy, ok := tweetObj["legacy"].(map[string]interface{})
	if !ok {
		return nil
	}

	id, _ := tweetObj["rest_id"].(string)
	if id == "" {
		if idVal, ok := legacy["id_str"].(string); ok {
			id = idVal
		}
	}

	fullText, _ := legacy["full_text"].(string)
	createdAtStr, _ := legacy["created_at"].(string)
	favCount, _ := legacy["favorite_count"].(float64)
	retweetCount, _ := legacy["retweet_count"].(float64)
	replyCount, _ := legacy["reply_count"].(float64)
	conversationID, _ := legacy["conversation_id_str"].(string)

	// Parse date e.g. "Wed Sep 16 07:15:30 +0000 2026"
	tTime, _ := time.Parse(time.RubyDate, createdAtStr)

	// Author info from core / user_results
	authorHandle := ""
	authorName := ""
	avatar := ""
	if core, ok := tweetObj["core"].(map[string]interface{}); ok {
		if userRes, ok := core["user_results"].(map[string]interface{}); ok {
			if uResult, ok := userRes["result"].(map[string]interface{}); ok {
				if uLegacy, ok := uResult["legacy"].(map[string]interface{}); ok {
					authorHandle, _ = uLegacy["screen_name"].(string)
					authorName, _ = uLegacy["name"].(string)
					avatar, _ = uLegacy["profile_image_url_https"].(string)
				}
			}
		}
	}

	// Media parsing
	var mediaURLs []string
	if extendedEntities, ok := legacy["extended_entities"].(map[string]interface{}); ok {
		if mediaArr, ok := extendedEntities["media"].([]interface{}); ok {
			for _, m := range mediaArr {
				if mObj, ok := m.(map[string]interface{}); ok {
					if mediaURL, ok := mObj["media_url_https"].(string); ok {
						mediaURLs = append(mediaURLs, mediaURL)
					}
				}
			}
		}
	}

	isRetweet := strings.HasPrefix(fullText, "RT @")
	isReply := legacy["in_reply_to_status_id_str"] != nil

	tweetURL := ""
	if authorHandle != "" && id != "" {
		tweetURL = fmt.Sprintf("https://x.com/%s/status/%s", authorHandle, id)
	}

	return &Tweet{
		ID:           id,
		Text:         fullText,
		CreatedAt:    tTime,
		CreatedAtRaw: createdAtStr,
		Author:       authorHandle,
		AuthorName:   authorName,
		AuthorAvatar: avatar,
		PermanentURL: tweetURL,
		Likes:        int(favCount),
		Retweets:     int(retweetCount),
		Replies:      int(replyCount),
		IsRetweet:    isRetweet,
		IsReply:      isReply,
		MediaURLs:    mediaURLs,
		Conversation: conversationID,
	}
}
