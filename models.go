package main

import (
	_ "embed"
	"encoding/json"
	"strings"
)

type FeedSourceType string

const (
	FeedSourceTypeX           FeedSourceType = "X"
	FeedSourceTypeTelegram    FeedSourceType = "TELEGRAM"
	FeedSourceTypeRSS         FeedSourceType = "RSS"
	FeedSourceTypeReddit      FeedSourceType = "REDDIT"
	FeedSourceTypeDefiLlama   FeedSourceType = "DEFILLAMA"
	FeedSourceTypeMacro       FeedSourceType = "MACRO"
	FeedSourceTypeCryptoPanic FeedSourceType = "CRYPTOPANIC"
)

type PricePoint struct {
	Timestamp int64   `json:"timestamp"`
	Price     float64 `json:"price"`
}

type CoinInfo struct {
	Symbol     string `json:"symbol"`     // e.g. ADAUSDT
	BaseAsset  string `json:"baseAsset"`  // e.g. ADA
	QuoteAsset string `json:"quoteAsset"` // e.g. USDT
	Name       string `json:"name"`       // e.g. Cardano
	IconSymbol string `json:"iconSymbol"` // e.g. ₳
	ColorHex   string `json:"colorHex"`   // e.g. #0033AD
}

type FeedSource struct {
	ID                       string         `json:"id"`
	Name                     string         `json:"name"`
	URL                      string         `json:"url"`
	ColorHex                 string         `json:"colorHex"`
	Type                     FeedSourceType `json:"type"`
	IsActive                 bool           `json:"isActive"`
	FailureCount             int            `json:"failureCount"`
	AutoDisabledAfterFailure bool           `json:"autoDisabledAfterFailure"`
}

type CryptoNewsItem struct {
	ID                string  `json:"id"`
	Title             string  `json:"title"`
	Description       string  `json:"description"`
	Source            string  `json:"source"`
	URL               string  `json:"url"`
	PublishedAtMillis int64   `json:"publishedAtMillis"`
	FormattedTime     string  `json:"formattedTime"`
	Tag               string  `json:"tag"`
	ColorHex          string  `json:"colorHex"`
	AssociatedPrice   float64 `json:"associatedPrice"`
	IsFavorite        bool    `json:"isFavorite"`
	IsSeen            bool    `json:"isSeen"`
}

type AlarmCycleState struct {
	IsActive         bool   `json:"isActive"`
	VibrationCount   int    `json:"vibrationCount"`
	MaxVibrations    int    `json:"maxVibrations"`
	SecondsRemaining int    `json:"secondsRemaining"`
	Acknowledged     bool   `json:"acknowledged"`
	LastNewsID       string `json:"lastNewsId"`
}

type AppTab string

const (
	TabChartAndFeed AppTab = "CHART_AND_FEED"
	TabFeedOnly     AppTab = "FEED_ONLY"
	TabNew          AppTab = "NEW"
	TabFavorites    AppTab = "FAVORITES"
	TabSettings     AppTab = "SETTINGS"
)

type SettingsSubTab string

const (
	SubTabPairs     SettingsSubTab = "PAIRS"
	SubTabSources   SettingsSubTab = "SOURCES"
	SubTabAppConfig SettingsSubTab = "APP_CONFIG"
)

type FullAppState struct {
	PricePoints                []PricePoint     `json:"pricePoints"`
	NewsList                   []CryptoNewsItem `json:"newsList"`
	SourcesList                []FeedSource     `json:"sourcesList"`
	SelectedCoin               CoinInfo         `json:"selectedCoin"`
	ObservedCoins              []CoinInfo       `json:"observedCoins"`
	AllAvailableCoins          []CoinInfo       `json:"allAvailableCoins"`
	Keywords                   []string         `json:"keywords"`
	CurrentPrice               float64          `json:"currentPrice"`
	PriceChangePercent         float64          `json:"priceChangePercent"`
	SelectedNewsID             string           `json:"selectedNewsId"`
	ActiveSourceFilter         string           `json:"activeSourceFilter"`
	SelectedSourceFilters      []string         `json:"selectedSourceFilters"`
	CurrentTab                 AppTab           `json:"currentTab"`
	SettingsSubTab             SettingsSubTab   `json:"settingsSubTab"`
	IsOffline                  bool             `json:"isOffline"`
	IsLiveMarket               bool             `json:"isLiveMarket"`
	AlarmEnabled               bool             `json:"alarmEnabled"`
	MaxVibrations              int              `json:"maxVibrations"`
	NightModeEnabled           bool             `json:"nightModeEnabled"`
	NightModeStart             string           `json:"nightModeStart"`
	NightModeEnd               string           `json:"nightModeEnd"`
	IsNightTimeNow             bool             `json:"isNightTimeNow"`
	CurrentLanguage            string           `json:"currentLanguage"`
	CryptoPanicTokenConfigured bool             `json:"cryptoPanicTokenConfigured"`
	AlarmCycle                 AlarmCycleState  `json:"alarmCycle"`
	MaxStoredNews              int              `json:"maxStoredNews"`
	TotalStoredNewsCount       int              `json:"totalStoredNewsCount"`
	UnreadNewsCount            int              `json:"unreadNewsCount"`
	UseInternalBrowser         bool             `json:"useInternalBrowser"`
	AlwaysOnTop                bool             `json:"alwaysOnTop"`
	Autostart                  bool             `json:"autostart"`
	IsXLoggedIn                bool             `json:"isXLoggedIn"`
}

var DefaultInitialCoins = []CoinInfo{
	{Symbol: "ADAUSDT", BaseAsset: "ADA", QuoteAsset: "USDT", Name: "Cardano", IconSymbol: "₳", ColorHex: "#0033AD"},
	{Symbol: "BTCUSDT", BaseAsset: "BTC", QuoteAsset: "USDT", Name: "Bitcoin", IconSymbol: "₿", ColorHex: "#F7931A"},
	{Symbol: "ETHUSDT", BaseAsset: "ETH", QuoteAsset: "USDT", Name: "Ethereum", IconSymbol: "Ξ", ColorHex: "#627EEA"},
	{Symbol: "SOLUSDT", BaseAsset: "SOL", QuoteAsset: "USDT", Name: "Solana", IconSymbol: "◎", ColorHex: "#14F195"},
	{Symbol: "XRPUSDT", BaseAsset: "XRP", QuoteAsset: "USDT", Name: "Ripple", IconSymbol: "✕", ColorHex: "#23292F"},
	{Symbol: "DOGEUSDT", BaseAsset: "DOGE", QuoteAsset: "USDT", Name: "Dogecoin", IconSymbol: "Ð", ColorHex: "#C2A633"},
	{Symbol: "AVAXUSDT", BaseAsset: "AVAX", QuoteAsset: "USDT", Name: "Avalanche", IconSymbol: "▲", ColorHex: "#E84142"},
	{Symbol: "DOTUSDT", BaseAsset: "DOT", QuoteAsset: "USDT", Name: "Polkadot", IconSymbol: "●", ColorHex: "#E6007A"},
	{Symbol: "LINKUSDT", BaseAsset: "LINK", QuoteAsset: "USDT", Name: "Chainlink", IconSymbol: "⬡", ColorHex: "#375BD2"},
	{Symbol: "NEARUSDT", BaseAsset: "NEAR", QuoteAsset: "USDT", Name: "NEAR Protocol", IconSymbol: "Ⓝ", ColorHex: "#000000"},
	{Symbol: "SUIUSDT", BaseAsset: "SUI", QuoteAsset: "USDT", Name: "Sui", IconSymbol: "💧", ColorHex: "#4DA2FF"},
	{Symbol: "PEPEUSDT", BaseAsset: "PEPE", QuoteAsset: "USDT", Name: "Pepe", IconSymbol: "🐸", ColorHex: "#4B8B3B"},
}

//go:embed default_sources.json
var defaultSourcesJSON []byte

type rawDefaultSourceItem struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	URL      string `json:"url"`
	ColorHex string `json:"colorHex"`
	Type     string `json:"type,omitempty"`
}

type defaultSourcesConfig struct {
	Twitter  []rawDefaultSourceItem `json:"twitter"`
	Telegram []rawDefaultSourceItem `json:"telegram"`
	RSS      []rawDefaultSourceItem `json:"rss"`
	Reddit   []rawDefaultSourceItem `json:"reddit"`
	Special  []rawDefaultSourceItem `json:"special"`
}

func GuessFeedSourceType(url, id string) FeedSourceType {
	lowerURL := strings.ToLower(url)
	lowerID := strings.ToLower(id)
	if strings.HasPrefix(lowerID, "x_") || strings.Contains(lowerURL, "x.com") || strings.Contains(lowerURL, "twitter.com") {
		return FeedSourceTypeX
	}
	if strings.HasPrefix(lowerID, "tg_") || strings.Contains(lowerURL, "t.me/") {
		return FeedSourceTypeTelegram
	}
	if strings.HasPrefix(lowerID, "rd_") || strings.Contains(lowerURL, "reddit.com") {
		return FeedSourceTypeReddit
	}
	if lowerID == "llama_hacks" || strings.Contains(lowerURL, "api.llama.fi/hacks") {
		return FeedSourceTypeDefiLlama
	}
	if lowerID == "macro_cal" || strings.Contains(lowerURL, "ff_calendar") {
		return FeedSourceTypeMacro
	}
	if lowerID == "cp_api" || strings.Contains(lowerURL, "cryptopanic.com") {
		return FeedSourceTypeCryptoPanic
	}
	return FeedSourceTypeRSS
}

func GetDefaultSources() []FeedSource {
	var cfg defaultSourcesConfig
	if err := json.Unmarshal(defaultSourcesJSON, &cfg); err != nil {
		return nil
	}

	var sources []FeedSource
	for _, item := range cfg.Twitter {
		sources = append(sources, FeedSource{
			ID:       item.ID,
			Name:     item.Name,
			URL:      item.URL,
			ColorHex: item.ColorHex,
			Type:     FeedSourceTypeX,
			IsActive: false,
		})
	}
	for _, item := range cfg.Telegram {
		sources = append(sources, FeedSource{
			ID:       item.ID,
			Name:     item.Name,
			URL:      item.URL,
			ColorHex: item.ColorHex,
			Type:     FeedSourceTypeTelegram,
			IsActive: false,
		})
	}
	for _, item := range cfg.RSS {
		sources = append(sources, FeedSource{
			ID:       item.ID,
			Name:     item.Name,
			URL:      item.URL,
			ColorHex: item.ColorHex,
			Type:     FeedSourceTypeRSS,
			IsActive: false,
		})
	}
	for _, item := range cfg.Reddit {
		sources = append(sources, FeedSource{
			ID:       item.ID,
			Name:     item.Name,
			URL:      item.URL,
			ColorHex: item.ColorHex,
			Type:     FeedSourceTypeReddit,
			IsActive: false,
		})
	}
	for _, item := range cfg.Special {
		st := FeedSourceType(strings.ToUpper(strings.TrimSpace(item.Type)))
		if st == "" {
			st = GuessFeedSourceType(item.URL, item.ID)
		}
		sources = append(sources, FeedSource{
			ID:       item.ID,
			Name:     item.Name,
			URL:      item.URL,
			ColorHex: item.ColorHex,
			Type:     st,
			IsActive: false,
		})
	}
	return sources
}
