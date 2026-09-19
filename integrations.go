package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"
)

const maxIntegrationItems = 10

var integrationHTTPClient = &http.Client{Timeout: 12 * time.Second}

type discordWebhookPayload struct {
	Content string                `json:"content,omitempty"`
	Embeds  []discordWebhookEmbed `json:"embeds,omitempty"`
}

type discordWebhookEmbed struct {
	Title       string                    `json:"title"`
	Description string                    `json:"description,omitempty"`
	URL         string                    `json:"url,omitempty"`
	Color       int                       `json:"color,omitempty"`
	Footer      discordWebhookEmbedFooter `json:"footer"`
}

type discordWebhookEmbedFooter struct {
	Text string `json:"text"`
}

type slackWebhookPayload struct {
	Text string `json:"text"`
}

func IsValidDiscordWebhookURL(rawURL string) bool {
	cleanURL := strings.TrimSpace(rawURL)
	return strings.HasPrefix(cleanURL, "https://discord.com/api/webhooks/") || strings.HasPrefix(cleanURL, "https://discordapp.com/api/webhooks/")
}

func IsValidTelegramBotToken(token string) bool {
	cleanToken := strings.TrimSpace(token)
	parts := strings.SplitN(cleanToken, ":", 2)
	return len(parts) == 2 && parts[0] != "" && parts[1] != ""
}

func IsValidSlackWebhookURL(rawURL string) bool {
	return strings.HasPrefix(strings.TrimSpace(rawURL), "https://hooks.slack.com/services/")
}

func SendDiscordWebhook(webhookURL string, items []CryptoNewsItem) error {
	if !IsValidDiscordWebhookURL(webhookURL) {
		return fmt.Errorf("invalid Discord webhook URL")
	}
	payload := discordWebhookPayload{Content: "📰 Nowe wiadomości crypto"}
	for _, item := range limitIntegrationItems(items) {
		payload.Embeds = append(payload.Embeds, discordWebhookEmbed{
			Title:       truncateText(item.Title, 250),
			Description: truncateText(item.Description, 900),
			URL:         item.URL,
			Color:       parseHexColor(item.ColorHex, 0x5865F2),
			Footer:      discordWebhookEmbedFooter{Text: item.Source},
		})
	}
	return postJSON(webhookURL, payload)
}

func SendTelegramMessages(botToken string, chatID string, items []CryptoNewsItem) error {
	if !IsValidTelegramBotToken(botToken) {
		return fmt.Errorf("invalid Telegram bot token")
	}
	if strings.TrimSpace(chatID) == "" {
		return fmt.Errorf("missing Telegram chat ID")
	}
	endpoint := "https://api.telegram.org/bot" + strings.TrimSpace(botToken) + "/sendMessage"
	for _, item := range limitIntegrationItems(items) {
		message := "📰 [" + item.Source + "] " + item.Title
		if strings.TrimSpace(item.Description) != "" {
			message += "\n\n" + item.Description
		}
		if strings.TrimSpace(item.URL) != "" {
			message += "\n" + item.URL
		}
		values := url.Values{}
		values.Set("chat_id", strings.TrimSpace(chatID))
		values.Set("text", truncateText(message, 3900))
		resp, err := integrationHTTPClient.PostForm(endpoint, values)
		if err != nil {
			return err
		}
		if err := closeAndCheck(resp); err != nil {
			return err
		}
	}
	return nil
}

func SendSlackWebhook(webhookURL string, items []CryptoNewsItem) error {
	if !IsValidSlackWebhookURL(webhookURL) {
		return fmt.Errorf("invalid Slack webhook URL")
	}
	var blocks []string
	for _, item := range limitIntegrationItems(items) {
		line := "• *" + escapeSlack(item.Title) + "*"
		if strings.TrimSpace(item.Source) != "" {
			line = "• `" + escapeSlack(item.Source) + "` *" + escapeSlack(item.Title) + "*"
		}
		if strings.TrimSpace(item.URL) != "" {
			line += "\n" + item.URL
		}
		blocks = append(blocks, line)
	}
	return postJSON(webhookURL, slackWebhookPayload{Text: "📰 Nowe wiadomości crypto\n" + strings.Join(blocks, "\n\n")})
}

func postJSON(endpoint string, payload any) error {
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	resp, err := integrationHTTPClient.Post(endpoint, "application/json", bytes.NewReader(body))
	if err != nil {
		return err
	}
	return closeAndCheck(resp)
}

func closeAndCheck(resp *http.Response) error {
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("integration returned status %d", resp.StatusCode)
	}
	return nil
}

func limitIntegrationItems(items []CryptoNewsItem) []CryptoNewsItem {
	if len(items) > maxIntegrationItems {
		return items[:maxIntegrationItems]
	}
	return items
}

func truncateText(text string, maxLen int) string {
	clean := strings.TrimSpace(text)
	if len([]rune(clean)) <= maxLen {
		return clean
	}
	runes := []rune(clean)
	return string(runes[:maxLen-1]) + "…"
}

func parseHexColor(hex string, fallback int) int {
	clean := strings.TrimPrefix(strings.TrimSpace(hex), "#")
	if len(clean) != 6 {
		return fallback
	}
	var value int
	if _, err := fmt.Sscanf(clean, "%06x", &value); err != nil {
		return fallback
	}
	return value
}

func escapeSlack(text string) string {
	replacer := strings.NewReplacer("&", "&amp;", "<", "&lt;", ">", "&gt;")
	return replacer.Replace(strings.TrimSpace(text))
}
