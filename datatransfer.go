package main

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type AppSettingsExport struct {
	Version                    int          `json:"version"`
	ExportedAt                 int64        `json:"exported_at"`
	ObservedCoins              []string     `json:"observed_coins"`
	CurrentCoin                string       `json:"current_coin"`
	FilterKeywords             []string     `json:"filter_keywords"`
	AlarmEnabled               bool         `json:"alarm_enabled"`
	MaxVibrations              int          `json:"max_vibrations"`
	NightModeEnabled           bool         `json:"night_mode_enabled"`
	NightModeStart             string       `json:"night_mode_start"`
	NightModeEnd               string       `json:"night_mode_end"`
	CheckInterval              int          `json:"check_interval"`
	NightCheckInterval         int          `json:"night_check_interval"`
	XCheckInterval             int          `json:"x_check_interval"`
	XNightCheckInterval        int          `json:"x_night_check_interval"`
	AppLanguage                string       `json:"app_language"`
	MaxStoredNews              int          `json:"max_stored_news"`
	UseInternalBrowser         bool         `json:"use_internal_browser"`
	Sources                    []FeedSource `json:"sources"`
	FavoriteNewsIDs            []string     `json:"favorite_news_ids"`
	SeenNewsIDs                []string     `json:"seen_news_ids"`
	SelectedSourceFilters      []string     `json:"selected_source_filters"`
	CryptoPanicToken           string       `json:"cryptopanic_token,omitempty"`
	DiscordWebhookEnabled      bool         `json:"discord_webhook_enabled,omitempty"`
	DiscordWebhookURL          string       `json:"discord_webhook_url,omitempty"`
	TelegramIntegrationEnabled bool         `json:"telegram_integration_enabled,omitempty"`
	TelegramBotToken           string       `json:"telegram_bot_token,omitempty"`
	TelegramChatID             string       `json:"telegram_chat_id,omitempty"`
	SlackWebhookEnabled        bool         `json:"slack_webhook_enabled,omitempty"`
	SlackWebhookURL            string       `json:"slack_webhook_url,omitempty"`

	// Fallback alias fields for camelCase JSON compatibility
	ObservedCoinsCamel              []string `json:"observedCoins,omitempty"`
	CurrentCoinCamel                string   `json:"currentCoin,omitempty"`
	FilterKeywordsCamel             []string `json:"filterKeywords,omitempty"`
	AlarmEnabledCamel               *bool    `json:"alarmEnabled,omitempty"`
	MaxVibrationsCamel              *int     `json:"maxVibrations,omitempty"`
	NightModeEnabledCamel           *bool    `json:"nightModeEnabled,omitempty"`
	NightModeStartCamel             string   `json:"nightModeStart,omitempty"`
	NightModeEndCamel               string   `json:"nightModeEnd,omitempty"`
	CheckIntervalCamel              *int     `json:"checkInterval,omitempty"`
	NightCheckIntervalCamel         *int     `json:"nightCheckInterval,omitempty"`
	XCheckIntervalCamel             *int     `json:"xCheckInterval,omitempty"`
	XNightCheckIntervalCamel        *int     `json:"xNightCheckInterval,omitempty"`
	AppLanguageCamel                string   `json:"appLanguage,omitempty"`
	MaxStoredNewsCamel              *int     `json:"maxStoredNews,omitempty"`
	UseInternalBrowserCamel         *bool    `json:"useInternalBrowser,omitempty"`
	FavoriteNewsIDsCamel            []string `json:"favoriteNewsIds,omitempty"`
	SeenNewsIDsCamel                []string `json:"seenNewsIds,omitempty"`
	SelectedSourceFiltersCamel      []string `json:"selectedSourceFilters,omitempty"`
	CryptoPanicTokenCamel           string   `json:"cryptoPanicToken,omitempty"`
	DiscordWebhookEnabledCamel      *bool    `json:"discordWebhookEnabled,omitempty"`
	DiscordWebhookURLCamel          string   `json:"discordWebhookUrl,omitempty"`
	TelegramIntegrationEnabledCamel *bool    `json:"telegramIntegrationEnabled,omitempty"`
	TelegramBotTokenCamel           string   `json:"telegramBotToken,omitempty"`
	TelegramChatIDCamel             string   `json:"telegramChatId,omitempty"`
	SlackWebhookEnabledCamel        *bool    `json:"slackWebhookEnabled,omitempty"`
	SlackWebhookURLCamel            string   `json:"slackWebhookUrl,omitempty"`
}

func ExportSettingsToJSON(settings AppSettingsExport) (string, error) {
	if settings.Version == 0 {
		settings.Version = 1
	}
	if settings.ExportedAt == 0 {
		settings.ExportedAt = time.Now().UnixMilli()
	}
	data, err := json.MarshalIndent(settings, "", "  ")
	if err != nil {
		return "", err
	}
	return string(data), nil
}

func ImportSettingsFromJSON(jsonContent string) (*AppSettingsExport, error) {
	trimmed := strings.TrimSpace(jsonContent)
	if trimmed == "" {
		return nil, fmt.Errorf("Pusty plik JSON")
	}

	var parsed AppSettingsExport
	if err := json.Unmarshal([]byte(trimmed), &parsed); err != nil {
		return nil, fmt.Errorf("Błąd parsowania JSON: %w", err)
	}

	// Unify camelCase aliases with snake_case fields
	if len(parsed.ObservedCoins) == 0 && len(parsed.ObservedCoinsCamel) > 0 {
		parsed.ObservedCoins = parsed.ObservedCoinsCamel
	}
	if parsed.CurrentCoin == "" && parsed.CurrentCoinCamel != "" {
		parsed.CurrentCoin = parsed.CurrentCoinCamel
	}
	if len(parsed.FilterKeywords) == 0 && len(parsed.FilterKeywordsCamel) > 0 {
		parsed.FilterKeywords = parsed.FilterKeywordsCamel
	}
	if parsed.AlarmEnabledCamel != nil {
		parsed.AlarmEnabled = *parsed.AlarmEnabledCamel
	}
	if parsed.MaxVibrationsCamel != nil && *parsed.MaxVibrationsCamel > 0 {
		parsed.MaxVibrations = *parsed.MaxVibrationsCamel
	}
	if parsed.NightModeEnabledCamel != nil {
		parsed.NightModeEnabled = *parsed.NightModeEnabledCamel
	}
	if parsed.NightModeStart == "" && parsed.NightModeStartCamel != "" {
		parsed.NightModeStart = parsed.NightModeStartCamel
	}
	if parsed.NightModeEnd == "" && parsed.NightModeEndCamel != "" {
		parsed.NightModeEnd = parsed.NightModeEndCamel
	}
	if parsed.CheckIntervalCamel != nil && *parsed.CheckIntervalCamel > 0 {
		parsed.CheckInterval = *parsed.CheckIntervalCamel
	}
	if parsed.NightCheckIntervalCamel != nil && *parsed.NightCheckIntervalCamel > 0 {
		parsed.NightCheckInterval = *parsed.NightCheckIntervalCamel
	}
	if parsed.XCheckIntervalCamel != nil && *parsed.XCheckIntervalCamel > 0 {
		parsed.XCheckInterval = *parsed.XCheckIntervalCamel
	}
	if parsed.XNightCheckIntervalCamel != nil && *parsed.XNightCheckIntervalCamel > 0 {
		parsed.XNightCheckInterval = *parsed.XNightCheckIntervalCamel
	}
	if parsed.AppLanguage == "" && parsed.AppLanguageCamel != "" {
		parsed.AppLanguage = parsed.AppLanguageCamel
	}
	if parsed.MaxStoredNewsCamel != nil && *parsed.MaxStoredNewsCamel > 0 {
		parsed.MaxStoredNews = *parsed.MaxStoredNewsCamel
	}
	if parsed.UseInternalBrowserCamel != nil {
		parsed.UseInternalBrowser = *parsed.UseInternalBrowserCamel
	}
	if len(parsed.FavoriteNewsIDs) == 0 && len(parsed.FavoriteNewsIDsCamel) > 0 {
		parsed.FavoriteNewsIDs = parsed.FavoriteNewsIDsCamel
	}
	if len(parsed.SeenNewsIDs) == 0 && len(parsed.SeenNewsIDsCamel) > 0 {
		parsed.SeenNewsIDs = parsed.SeenNewsIDsCamel
	}
	if len(parsed.SelectedSourceFilters) == 0 && len(parsed.SelectedSourceFiltersCamel) > 0 {
		parsed.SelectedSourceFilters = parsed.SelectedSourceFiltersCamel
	}
	if parsed.CryptoPanicToken == "" && parsed.CryptoPanicTokenCamel != "" {
		parsed.CryptoPanicToken = parsed.CryptoPanicTokenCamel
	}
	if parsed.DiscordWebhookEnabledCamel != nil {
		parsed.DiscordWebhookEnabled = *parsed.DiscordWebhookEnabledCamel
	}
	if parsed.DiscordWebhookURL == "" && parsed.DiscordWebhookURLCamel != "" {
		parsed.DiscordWebhookURL = parsed.DiscordWebhookURLCamel
	}
	if parsed.TelegramIntegrationEnabledCamel != nil {
		parsed.TelegramIntegrationEnabled = *parsed.TelegramIntegrationEnabledCamel
	}
	if parsed.TelegramBotToken == "" && parsed.TelegramBotTokenCamel != "" {
		parsed.TelegramBotToken = parsed.TelegramBotTokenCamel
	}
	if parsed.TelegramChatID == "" && parsed.TelegramChatIDCamel != "" {
		parsed.TelegramChatID = parsed.TelegramChatIDCamel
	}
	if parsed.SlackWebhookEnabledCamel != nil {
		parsed.SlackWebhookEnabled = *parsed.SlackWebhookEnabledCamel
	}
	if parsed.SlackWebhookURL == "" && parsed.SlackWebhookURLCamel != "" {
		parsed.SlackWebhookURL = parsed.SlackWebhookURLCamel
	}

	// Default fallback values
	if parsed.CurrentCoin == "" {
		parsed.CurrentCoin = "ADAUSDT"
	}
	if parsed.MaxVibrations <= 0 {
		parsed.MaxVibrations = 10
	}
	if parsed.NightModeStart == "" {
		parsed.NightModeStart = "22:00"
	}
	if parsed.NightModeEnd == "" {
		parsed.NightModeEnd = "07:00"
	}
	if parsed.CheckInterval <= 0 {
		parsed.CheckInterval = 60
	}
	if parsed.NightCheckInterval <= 0 {
		parsed.NightCheckInterval = 900
	}
	if parsed.XCheckInterval <= 0 {
		parsed.XCheckInterval = 300
	}
	if parsed.XNightCheckInterval <= 0 {
		parsed.XNightCheckInterval = 600
	}
	if parsed.AppLanguage == "" {
		parsed.AppLanguage = "pl"
	}
	if parsed.MaxStoredNews <= 0 {
		parsed.MaxStoredNews = 3650
	}

	return &parsed, nil
}

func ExportNewsToCSV(newsList []CryptoNewsItem) (string, error) {
	var buf bytes.Buffer
	writer := csv.NewWriter(&buf)

	// Write RFC 4180 Header
	header := []string{
		"id",
		"title",
		"description",
		"source",
		"url",
		"publishedAtMillis",
		"formattedTime",
		"tag",
		"colorHex",
		"associatedPrice",
		"isFavorite",
		"isSeen",
	}
	if err := writer.Write(header); err != nil {
		return "", err
	}

	for _, item := range newsList {
		row := []string{
			item.ID,
			item.Title,
			item.Description,
			item.Source,
			item.URL,
			strconv.FormatInt(item.PublishedAtMillis, 10),
			item.FormattedTime,
			item.Tag,
			item.ColorHex,
			strconv.FormatFloat(item.AssociatedPrice, 'f', -1, 64),
			strconv.FormatBool(item.IsFavorite),
			strconv.FormatBool(item.IsSeen),
		}
		if err := writer.Write(row); err != nil {
			return "", err
		}
	}

	writer.Flush()
	if err := writer.Error(); err != nil {
		return "", err
	}

	return buf.String(), nil
}

func ImportNewsFromCSV(csvContent string) ([]CryptoNewsItem, error) {
	trimmed := strings.TrimSpace(csvContent)
	if trimmed == "" {
		return nil, fmt.Errorf("Pusty plik CSV")
	}

	reader := csv.NewReader(strings.NewReader(trimmed))
	reader.FieldsPerRecord = -1
	reader.LazyQuotes = true

	records, err := reader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("Błąd parsowania CSV: %w", err)
	}
	if len(records) == 0 {
		return nil, fmt.Errorf("Brak danych w pliku CSV")
	}

	firstRow := records[0]
	isHeader := false
	for _, col := range firstRow {
		c := strings.ToLower(strings.TrimSpace(col))
		if c == "id" || c == "title" || c == "source" || c == "publishedatmillis" {
			isHeader = true
			break
		}
	}

	headerMap := make(map[string]int)
	dataRows := records
	if isHeader {
		for idx, name := range firstRow {
			headerMap[strings.ToLower(strings.TrimSpace(name))] = idx
		}
		dataRows = records[1:]
	}

	getField := func(row []string, fallbackIdx int, names ...string) string {
		if len(headerMap) > 0 {
			for _, n := range names {
				if idx, ok := headerMap[strings.ToLower(n)]; ok {
					if idx < len(row) {
						return strings.TrimSpace(row[idx])
					}
				}
			}
			return ""
		}
		if fallbackIdx < len(row) {
			return strings.TrimSpace(row[fallbackIdx])
		}
		return ""
	}

	var result []CryptoNewsItem
	for _, row := range dataRows {
		if len(row) == 0 {
			continue
		}

		idRaw := getField(row, 0, "id")
		title := getField(row, 1, "title", "headline", "name")
		description := getField(row, 2, "description", "desc", "summary", "content", "text")
		source := getField(row, 3, "source", "source_name", "author")
		if source == "" {
			source = "CSV Import"
		}
		url := getField(row, 4, "url", "link", "source_url", "href")
		publishedMillisStr := getField(row, 5, "publishedAtMillis", "published_at", "timestamp", "time", "date")
		formattedTime := getField(row, 6, "formattedTime", "formatted_time")
		tag := getField(row, 7, "tag", "tags", "category")
		if tag == "" {
			tag = "#Imported"
		}
		colorHex := getField(row, 8, "colorHex", "color", "color_hex")
		if colorHex == "" {
			colorHex = "#00E5FF"
		}
		priceStr := getField(row, 9, "associatedPrice", "price", "associated_price")
		favStr := getField(row, 10, "isFavorite", "is_favorite", "favorite", "fav")
		seenStr := getField(row, 11, "isSeen", "is_seen", "seen", "read", "is_read", "isread")

		if title == "" && description == "" {
			continue
		}

		publishedMillis, err := strconv.ParseInt(publishedMillisStr, 10, 64)
		if err != nil || publishedMillis <= 0 {
			publishedMillis = time.Now().UnixMilli()
		}

		associatedPrice, _ := strconv.ParseFloat(priceStr, 64)
		isFav := strings.EqualFold(favStr, "true") || favStr == "1" || strings.EqualFold(favStr, "yes")
		isSeen := strings.EqualFold(seenStr, "true") || seenStr == "1" || strings.EqualFold(seenStr, "yes")

		id := idRaw
		if id == "" {
			id = fmt.Sprintf("csv_%x", Md5Hash(url + title + strconv.FormatInt(publishedMillis, 10))[:10])
		}

		if formattedTime == "" {
			formattedTime = "Imported"
		}

		if !strings.HasPrefix(colorHex, "#") {
			colorHex = "#" + colorHex
		}

		result = append(result, CryptoNewsItem{
			ID:                id,
			Title:             title,
			Description:       description,
			Source:            source,
			URL:               url,
			PublishedAtMillis: publishedMillis,
			FormattedTime:     formattedTime,
			Tag:               tag,
			ColorHex:          colorHex,
			AssociatedPrice:   associatedPrice,
			IsFavorite:        isFav,
			IsSeen:            isSeen,
		})
	}

	return result, nil
}
