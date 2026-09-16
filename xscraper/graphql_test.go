package xscraper

import (
	"testing"
)

func TestParseTimelineTweets(t *testing.T) {
	// Sample minimal valid GraphQL timeline snippet
	mockJSON := []byte(`{
		"data": {
			"user": {
				"result": {
					"timeline_v2": {
						"timeline": {
							"instructions": [
								{
									"type": "TimelineAddEntries",
									"entries": [
										{
											"entryId": "tweet-123456789",
											"content": {
												"itemContent": {
													"tweet_results": {
														"result": {
															"rest_id": "123456789",
															"core": {
																"user_results": {
																	"result": {
																		"legacy": {
																			"screen_name": "saylor",
																			"name": "Michael Saylor"
																		}
																	}
																}
															},
															"legacy": {
																"full_text": "Bitcoin is digital energy.",
																"created_at": "Wed Sep 16 07:15:30 +0000 2026",
																"favorite_count": 4200,
																"retweet_count": 850,
																"reply_count": 310
															}
														}
													}
												}
											}
										}
									]
								}
							]
						}
					}
				}
			}
		}
	}`)

	tweets, err := parseTimelineTweets(mockJSON)
	if err != nil {
		t.Fatalf("unexpected error parsing tweets: %v", err)
	}

	if len(tweets) != 1 {
		t.Fatalf("expected 1 tweet, got %d", len(tweets))
	}

	tweet := tweets[0]
	if tweet.ID != "123456789" {
		t.Errorf("expected ID '123456789', got '%s'", tweet.ID)
	}
	if tweet.Author != "saylor" {
		t.Errorf("expected Author 'saylor', got '%s'", tweet.Author)
	}
	if tweet.Text != "Bitcoin is digital energy." {
		t.Errorf("expected text 'Bitcoin is digital energy.', got '%s'", tweet.Text)
	}
	if tweet.Likes != 4200 {
		t.Errorf("expected 4200 likes, got %d", tweet.Likes)
	}
}
