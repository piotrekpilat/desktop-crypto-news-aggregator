package main

import (
	"strings"
	"testing"
)

func TestExportAndImportSettingsJSON(t *testing.T) {
	original := AppSettingsExport{
		Version:               1,
		ExportedAt:            1715000000000,
		ObservedCoins:         []string{"BTCUSDT", "ETHUSDT", "ADAUSDT"},
		CurrentCoin:           "BTCUSDT",
		FilterKeywords:        []string{"hack", "etf", "upgrade"},
		AlarmEnabled:          true,
		MaxVibrations:         12,
		NightModeEnabled:      true,
		NightModeStart:        "23:00",
		NightModeEnd:          "06:30",
		AppLanguage:           "de",
		MaxStoredNews:         5000,
		Sources: []FeedSource{
			{
				ID:       "src_test",
				Name:     "Test Source",
				URL:      "https://example.com/rss.xml",
				ColorHex: "#00E5FF",
				IsActive: true,
			},
		},
		FavoriteNewsIDs:       []string{"fav_1", "fav_2"},
		SeenNewsIDs:           []string{"fav_1", "seen_3"},
		SelectedSourceFilters: []string{"CoinDesk", "Whale Alert"},
		CryptoPanicToken:      "test_token_123",
	}

	jsonStr, err := ExportSettingsToJSON(original)
	if err != nil {
		t.Fatalf("ExportSettingsToJSON error: %v", err)
	}

	if !strings.Contains(jsonStr, `"BTCUSDT"`) {
		t.Errorf("Expected JSON to contain BTCUSDT, got: %s", jsonStr)
	}

	imported, err := ImportSettingsFromJSON(jsonStr)
	if err != nil {
		t.Fatalf("ImportSettingsFromJSON error: %v", err)
	}

	if imported.CurrentCoin != original.CurrentCoin {
		t.Errorf("CurrentCoin mismatch: got %s, want %s", imported.CurrentCoin, original.CurrentCoin)
	}
	if imported.MaxVibrations != original.MaxVibrations {
		t.Errorf("MaxVibrations mismatch: got %d, want %d", imported.MaxVibrations, original.MaxVibrations)
	}
	if imported.AppLanguage != original.AppLanguage {
		t.Errorf("AppLanguage mismatch: got %s, want %s", imported.AppLanguage, original.AppLanguage)
	}
	if len(imported.Sources) != 1 || imported.Sources[0].Name != "Test Source" {
		t.Errorf("Sources mismatch: got %+v", imported.Sources)
	}
	if len(imported.SeenNewsIDs) != 2 || imported.SeenNewsIDs[1] != "seen_3" {
		t.Errorf("SeenNewsIDs mismatch: got %+v", imported.SeenNewsIDs)
	}
	if len(imported.SelectedSourceFilters) != 2 || imported.SelectedSourceFilters[0] != "CoinDesk" {
		t.Errorf("SelectedSourceFilters mismatch: got %+v", imported.SelectedSourceFilters)
	}
	if imported.CryptoPanicToken != original.CryptoPanicToken {
		t.Errorf("CryptoPanicToken mismatch: got %s, want %s", imported.CryptoPanicToken, original.CryptoPanicToken)
	}
}

func TestExportAndImportNewsCSV(t *testing.T) {
	newsList := []CryptoNewsItem{
		{
			ID:                "n_001",
			Title:             `Bitcoin reaches "ATH" on ETF inflows`,
			Description:       "Details about ETF inflows,\nincluding SEC statements and trader comments.",
			Source:            "CoinDesk, Official",
			URL:               "https://coindesk.com/article/1",
			PublishedAtMillis: 1715001000000,
			FormattedTime:     "10 min ago",
			Tag:               "#BTC, #ETF",
			ColorHex:          "#F7931A",
			AssociatedPrice:   68500.50,
			IsFavorite:        true,
			IsSeen:            true,
		},
		{
			ID:                "n_002",
			Title:             "Polskie znaki: ąćęłńóśźż",
			Description:       "Prosty opis z przecinkiem, test.",
			Source:            "Bankier Krypto",
			URL:               "https://example.com/2",
			PublishedAtMillis: 1715002000000,
			FormattedTime:     "1 godz. temu",
			Tag:               "#ETH",
			ColorHex:          "#627EEA",
			AssociatedPrice:   3520.10,
			IsFavorite:        false,
			IsSeen:            false,
		},
	}

	csvStr, err := ExportNewsToCSV(newsList)
	if err != nil {
		t.Fatalf("ExportNewsToCSV error: %v", err)
	}

	if !strings.HasPrefix(csvStr, "id,title,description,source,url,") {
		t.Errorf("CSV missing standard header: %s", csvStr)
	}

	imported, err := ImportNewsFromCSV(csvStr)
	if err != nil {
		t.Fatalf("ImportNewsFromCSV error: %v", err)
	}

	if len(imported) != 2 {
		t.Fatalf("Expected 2 items, got %d", len(imported))
	}

	first := imported[0]
	if first.ID != "n_001" {
		t.Errorf("ID mismatch: got %s, want n_001", first.ID)
	}
	if first.Title != `Bitcoin reaches "ATH" on ETF inflows` {
		t.Errorf("Title mismatch: got %s", first.Title)
	}
	if first.Description != "Details about ETF inflows,\nincluding SEC statements and trader comments." {
		t.Errorf("Description mismatch: got %s", first.Description)
	}
	if !first.IsFavorite {
		t.Errorf("IsFavorite expected true")
	}
	if !first.IsSeen {
		t.Errorf("IsSeen expected true")
	}

	second := imported[1]
	if second.Title != "Polskie znaki: ąćęłńóśźż" {
		t.Errorf("Title polish characters mismatch: got %s", second.Title)
	}
	if second.IsFavorite {
		t.Errorf("Second IsFavorite expected false")
	}
	if second.IsSeen {
		t.Errorf("Second IsSeen expected false")
	}
}

func TestImportNewsCSVWithAlternativeHeaders(t *testing.T) {
	customCSV := `title,link,desc,source,timestamp,favorite,seen
"Major Crypto Exploit Detected","https://llama.fi/hacks/1","Loss of $10M detected in lending protocol","DefiLlama",1715003000000,"1","true"`

	imported, err := ImportNewsFromCSV(customCSV)
	if err != nil {
		t.Fatalf("ImportNewsFromCSV error: %v", err)
	}
	if len(imported) != 1 {
		t.Fatalf("Expected 1 item, got %d", len(imported))
	}

	item := imported[0]
	if item.Title != "Major Crypto Exploit Detected" {
		t.Errorf("Title mismatch: got %s", item.Title)
	}
	if item.URL != "https://llama.fi/hacks/1" {
		t.Errorf("URL mismatch: got %s", item.URL)
	}
	if item.Description != "Loss of $10M detected in lending protocol" {
		t.Errorf("Description mismatch: got %s", item.Description)
	}
	if item.PublishedAtMillis != 1715003000000 {
		t.Errorf("PublishedAtMillis mismatch: got %d", item.PublishedAtMillis)
	}
	if !item.IsFavorite {
		t.Errorf("IsFavorite expected true")
	}
	if !item.IsSeen {
		t.Errorf("IsSeen expected true")
	}
}
