package main

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
	ID                       string `json:"id"`
	Name                     string `json:"name"`
	URL                      string `json:"url"`
	ColorHex                 string `json:"colorHex"`
	IsActive                 bool   `json:"isActive"`
	FailureCount             int    `json:"failureCount"`
	AutoDisabledAfterFailure bool   `json:"autoDisabledAfterFailure"`
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

func GetDefaultSources() []FeedSource {
	return []FeedSource{
		{ID: "llama_hacks", Name: "DefiLlama (Hacks & Exploits)", URL: "https://api.llama.fi/hacks", ColorHex: "#FF3366", IsActive: false},
		{ID: "macro_cal", Name: "Makro Kalendarz (FED/CPI)", URL: "https://nfs.faireconomy.media/ff_calendar_thisweek.json", ColorHex: "#F59E0B", IsActive: false},
		{ID: "tg_unfolded", Name: "Unfolded (TG)", URL: "https://t.me/s/unfolded", ColorHex: "#00E5FF", IsActive: false},
		{ID: "tg_wu", Name: "Wu Blockchain (TG)", URL: "https://t.me/s/wublockchainenglish", ColorHex: "#FF9900", IsActive: false},
		{ID: "tg_binance", Name: "Binance News (TG)", URL: "https://t.me/s/binance_announcements", ColorHex: "#F3BA2F", IsActive: false},
		{ID: "tg_whale", Name: "Whale Alert (TG)", URL: "https://t.me/s/whale_alert_io", ColorHex: "#2AABEE", IsActive: false},
		{ID: "tg_watcherguru", Name: "Watcher Guru (TG)", URL: "https://t.me/s/WatcherGuru", ColorHex: "#10B981", IsActive: false},
		{ID: "tg_peckshield", Name: "PeckShield Alert (TG)", URL: "https://t.me/s/PeckShieldAlert", ColorHex: "#EF4444", IsActive: false},
		{ID: "theblock_rss", Name: "The Block", URL: "https://www.theblock.co/rss.xml", ColorHex: "#6366F1", IsActive: false},
		{ID: "blockworks_rss", Name: "Blockworks", URL: "https://blockworks.co/feed", ColorHex: "#EC4899", IsActive: false},
		{ID: "btc_mag_rss", Name: "Bitcoin Magazine", URL: "https://bitcoinmagazine.com/feed", ColorHex: "#F7931A", IsActive: false},
		{ID: "bankless_rss", Name: "Bankless", URL: "https://www.bankless.com/rss/feed", ColorHex: "#E11D48", IsActive: false},
		{ID: "cd_rss", Name: "CoinDesk", URL: "https://www.coindesk.com/arc/outboundfeeds/rss/", ColorHex: "#A855F7", IsActive: false},
		{ID: "ct_rss", Name: "Cointelegraph", URL: "https://cointelegraph.com/rss", ColorHex: "#F59E0B", IsActive: false},
		{ID: "cp_api", Name: "CryptoPanic", URL: "https://cryptopanic.com/developers/api/", ColorHex: "#00E5FF", IsActive: false},
		{ID: "cs_rss", Name: "CryptoSlate", URL: "https://cryptoslate.com/feed/", ColorHex: "#38BDF8", IsActive: false},
		{ID: "dc_rss", Name: "Decrypt", URL: "https://decrypt.co/feed", ColorHex: "#34D399", IsActive: false},
		{ID: "beincrypto_pl", Name: "BeInCrypto (PL)", URL: "https://pl.beincrypto.com/feed/", ColorHex: "#3B82F6", IsActive: false},
		{ID: "bithub_pl", Name: "BitHub (PL)", URL: "https://bithub.pl/feed/", ColorHex: "#14B8A6", IsActive: false},
		{ID: "cryps_pl", Name: "CrypS (PL)", URL: "https://cryps.pl/feed/", ColorHex: "#8B5CF6", IsActive: false},
		{ID: "iog_news", Name: "IOG News", URL: "https://www.iog.io/feed.xml", ColorHex: "#0033AD", IsActive: false},
		{ID: "rd_rss", Name: "Reddit", URL: "https://www.reddit.com/r/CryptoCurrency/new/.rss", ColorHex: "#FF4500", IsActive: false},
		{ID: "ut_rss", Name: "U.Today", URL: "https://u.today/rss", ColorHex: "#FF3366", IsActive: false},
	}
}
