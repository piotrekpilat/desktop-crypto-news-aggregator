package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"math"
	"math/rand"
	"os"
	"os/exec"
	"sort"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"desktop-widget/xscraper"

	"github.com/pkg/browser"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx        context.Context
	mu         sync.Mutex
	storage    *StorageManager
	feedCli    *FeedClient
	binanceCli *BinanceClient

	// Internal state
	allNews                    []CryptoNewsItem
	sources                    []FeedSource
	cryptoPanicToken           string
	discordWebhookEnabled      bool
	discordWebhookURL          string
	telegramIntegrationEnabled bool
	telegramBotToken           string
	telegramChatID             string
	slackWebhookEnabled        bool
	slackWebhookURL            string
	xAuthToken                 string
	xCt0                       string
	pricePoints                []PricePoint
	favoriteIDs                map[string]bool
	seenNewsIDs                map[string]bool
	allAvailableCoins          []CoinInfo
	observedSymbols            map[string]bool
	currentCoinSymbol          string
	activeKeywords             []string
	selectedSourceFilters      []string

	// X (Twitter) Rate Limiting & Anti-Ban Throttling
	xLastFetchTimes map[string]time.Time
	xNextIntervals  map[string]time.Duration
	xFetchMu        sync.Mutex

	alarmEnabled        bool
	maxVibrations       int
	nightModeEnabled    bool
	nightModeStart      string
	nightModeEnd        string
	checkInterval       int
	nightCheckInterval  int
	xCheckInterval      int
	xNightCheckInterval int
	pollWakeChan        chan struct{}
	currentLanguage     string
	maxStoredNews       int
	useInternalBrowser  bool
	alwaysOnTop         bool
	autostart           bool
	windowVisible       bool
	windowWidth         int
	windowHeight        int

	currentTab         AppTab
	settingsSubTab     SettingsSubTab
	activeSourceFilter string
	selectedNewsID     string

	currentPrice       float64
	priceChangePercent float64
	isLiveMarket       bool
	isOffline          bool

	alarmCycle       AlarmCycleState
	alarmTickerStop  chan struct{}
	knownNewsIDs     map[string]bool
	deletedNewsIDs   map[string]bool
	historyClearedAt int64
	isFetchingDirect atomic.Bool
	showChart        bool
}

func NewApp() *App {
	storage := NewStorageManager()
	return &App{
		storage:               storage,
		feedCli:               NewFeedClient(),
		binanceCli:            NewBinanceClient(),
		favoriteIDs:           make(map[string]bool),
		seenNewsIDs:           make(map[string]bool),
		observedSymbols:       make(map[string]bool),
		knownNewsIDs:          make(map[string]bool),
		deletedNewsIDs:        make(map[string]bool),
		showChart:             true,
		xLastFetchTimes:       make(map[string]time.Time),
		xNextIntervals:        make(map[string]time.Duration),
		currentCoinSymbol:     "ADAUSDT",
		activeSourceFilter:    "Wszystkie",
		selectedSourceFilters: []string{"Wszystkie"},
		currentTab:            TabChartAndFeed,
		settingsSubTab:        SubTabPairs,
		allAvailableCoins:     DefaultInitialCoins,
		maxVibrations:         10,
		nightModeStart:        "22:00",
		nightModeEnd:          "07:00",
		checkInterval:         60,
		nightCheckInterval:    900,
		pollWakeChan:          make(chan struct{}, 1),
		currentLanguage:       "pl",
		maxStoredNews:         3650,
		useInternalBrowser:    false,
		windowVisible:         true,
		windowWidth:           430,
		windowHeight:          890,
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.loadSettings()
	a.loadDataSync()
	a.initTray()

	// Initial async fetch of all Binance USDT pairs
	go a.fetchPairsAsync()

	// Periodic news polling (45s)
	go a.startPeriodicNewsPolling()

	// Periodic market refresh (10m)
	go a.startPeriodicMarketRefresh()
}

func (a *App) loadSettings() {
	s := a.storage.Load()
	a.mu.Lock()
	defer a.mu.Unlock()

	a.favoriteIDs = make(map[string]bool)
	for _, id := range s.FavoriteNewsIDs {
		a.favoriteIDs[id] = true
	}

	a.seenNewsIDs = make(map[string]bool)
	for _, id := range s.SeenNewsIDs {
		a.seenNewsIDs[id] = true
	}

	if len(s.SelectedSourceFilters) > 0 {
		a.selectedSourceFilters = s.SelectedSourceFilters
	} else {
		a.selectedSourceFilters = []string{"Wszystkie"}
	}
	if len(a.selectedSourceFilters) == 1 {
		a.activeSourceFilter = a.selectedSourceFilters[0]
	} else {
		a.activeSourceFilter = strings.Join(a.selectedSourceFilters, ", ")
	}

	a.observedSymbols = make(map[string]bool)
	for _, sym := range s.ObservedCoins {
		a.observedSymbols[sym] = true
	}

	a.currentCoinSymbol = s.CurrentCoin
	if !a.observedSymbols[a.currentCoinSymbol] {
		a.observedSymbols[a.currentCoinSymbol] = true
	}

	a.activeKeywords = s.FilterKeywords
	a.alarmEnabled = s.AlarmEnabled
	a.maxVibrations = s.MaxVibrations
	a.nightModeEnabled = s.NightModeEnabled
	a.nightModeStart = s.NightModeStart
	a.nightModeEnd = s.NightModeEnd
	a.checkInterval = s.CheckInterval
	if a.checkInterval <= 0 {
		a.checkInterval = 60
	}
	a.nightCheckInterval = s.NightCheckInterval
	if a.nightCheckInterval <= 0 {
		a.nightCheckInterval = 900
	}
	a.xCheckInterval = s.XCheckInterval
	if a.xCheckInterval <= 0 {
		a.xCheckInterval = 300
	}
	a.xNightCheckInterval = s.XNightCheckInterval
	if a.xNightCheckInterval <= 0 {
		a.xNightCheckInterval = 600
	}
	a.currentLanguage = s.AppLanguage
	a.maxStoredNews = s.MaxStoredNews
	a.useInternalBrowser = s.UseInternalBrowser
	a.alwaysOnTop = s.AlwaysOnTop
	a.autostart = s.Autostart
	a.cryptoPanicToken = s.CryptoPanicToken
	a.discordWebhookEnabled = s.DiscordWebhookEnabled
	a.discordWebhookURL = s.DiscordWebhookURL
	a.telegramIntegrationEnabled = s.TelegramIntegrationEnabled
	a.telegramBotToken = s.TelegramBotToken
	a.telegramChatID = s.TelegramChatID
	a.slackWebhookEnabled = s.SlackWebhookEnabled
	a.slackWebhookURL = s.SlackWebhookURL
	a.xAuthToken = s.XAuthToken
	a.xCt0 = s.XCT0
	if a.xAuthToken == "" {
		if scraper, err := xscraper.New(); err == nil {
			sessionPath := a.storage.GetSessionPath()
			if err := scraper.LoadSessionFromFile(sessionPath); err == nil {
				sess := scraper.GetSession()
				if sess.AuthToken != "" {
					a.xAuthToken = sess.AuthToken
					a.xCt0 = sess.CT0
				}
			}
		}
	}
	if a.xAuthToken != "" {
		a.feedCli.SetXSession(xscraper.Session{
			AuthToken: a.xAuthToken,
			CT0:       a.xCt0,
		}, a.storage.GetSessionPath())
	}
	a.sources = s.Sources
	a.historyClearedAt = s.HistoryClearedAt

	a.showChart = s.ShowChart
	if !s.ShowChart && s.CurrentCoin == "" {
		a.showChart = true
	}
	a.deletedNewsIDs = make(map[string]bool)
	for _, id := range s.DeletedNewsIDs {
		a.deletedNewsIDs[id] = true
	}

	// Load news history
	a.knownNewsIDs = make(map[string]bool)
	for _, n := range s.NewsHistory {
		if a.deletedNewsIDs[n.ID] {
			continue
		}
		n.IsFavorite = a.favoriteIDs[n.ID]
		n.IsSeen = a.seenNewsIDs[n.ID]
		a.allNews = append(a.allNews, n)
		a.knownNewsIDs[n.ID] = true
	}

	if s.WindowWidth >= 380 {
		a.windowWidth = s.WindowWidth
	}
	if s.WindowHeight >= 500 {
		a.windowHeight = s.WindowHeight
	}

	if a.alwaysOnTop {
		wailsRuntime.WindowSetAlwaysOnTop(a.ctx, true)
	}

	if a.windowHeight >= 500 {
		w := a.windowWidth
		if w < 380 {
			w = 430
		}
		wailsRuntime.WindowSetSize(a.ctx, w, a.windowHeight)
	}
}

func (a *App) saveSettingsLocked() {
	favList := make([]string, 0, len(a.favoriteIDs))
	for id := range a.favoriteIDs {
		favList = append(favList, id)
	}

	seenList := make([]string, 0, len(a.seenNewsIDs))
	for id := range a.seenNewsIDs {
		seenList = append(seenList, id)
	}

	obsList := make([]string, 0, len(a.observedSymbols))
	for sym := range a.observedSymbols {
		obsList = append(obsList, sym)
	}

	history := a.allNews
	if len(history) > a.maxStoredNews {
		history = history[:a.maxStoredNews]
	}

	deletedList := make([]string, 0, len(a.deletedNewsIDs))
	for id := range a.deletedNewsIDs {
		deletedList = append(deletedList, id)
	}

	settings := &SavedSettings{
		FavoriteNewsIDs:            favList,
		SeenNewsIDs:                seenList,
		SelectedSourceFilters:      a.selectedSourceFilters,
		ObservedCoins:              obsList,
		CurrentCoin:                a.currentCoinSymbol,
		FilterKeywords:             a.activeKeywords,
		AlarmEnabled:               a.alarmEnabled,
		MaxVibrations:              a.maxVibrations,
		NightModeEnabled:           a.nightModeEnabled,
		NightModeStart:             a.nightModeStart,
		NightModeEnd:               a.nightModeEnd,
		CheckInterval:              a.checkInterval,
		NightCheckInterval:         a.nightCheckInterval,
		XCheckInterval:             a.xCheckInterval,
		XNightCheckInterval:        a.xNightCheckInterval,
		AppLanguage:                a.currentLanguage,
		MaxStoredNews:              a.maxStoredNews,
		UseInternalBrowser:         a.useInternalBrowser,
		AlwaysOnTop:                a.alwaysOnTop,
		Autostart:                  a.autostart,
		CryptoPanicToken:           a.cryptoPanicToken,
		DiscordWebhookEnabled:      a.discordWebhookEnabled,
		DiscordWebhookURL:          a.discordWebhookURL,
		TelegramIntegrationEnabled: a.telegramIntegrationEnabled,
		TelegramBotToken:           a.telegramBotToken,
		TelegramChatID:             a.telegramChatID,
		SlackWebhookEnabled:        a.slackWebhookEnabled,
		SlackWebhookURL:            a.slackWebhookURL,
		XAuthToken:                 a.xAuthToken,
		XCT0:                       a.xCt0,
		Sources:                    a.sources,
		NewsHistory:                history,
		HistoryClearedAt:           a.historyClearedAt,
		WindowWidth:                a.windowWidth,
		WindowHeight:               a.windowHeight,
		ShowChart:                  a.showChart,
		DeletedNewsIDs:             deletedList,
	}

	go a.storage.Save(settings)
}

func (a *App) isNightModeNow() bool {
	if !a.nightModeEnabled {
		return false
	}
	now := time.Now()
	currTotal := now.Hour()*60 + now.Minute()

	sParts := strings.Split(a.nightModeStart, ":")
	eParts := strings.Split(a.nightModeEnd, ":")
	if len(sParts) < 2 || len(eParts) < 2 {
		return false
	}
	sH, _ := strconv.Atoi(sParts[0])
	sM, _ := strconv.Atoi(sParts[1])
	eH, _ := strconv.Atoi(eParts[0])
	eM, _ := strconv.Atoi(eParts[1])

	startTotal := sH*60 + sM
	endTotal := eH*60 + eM

	if startTotal < endTotal {
		return currTotal >= startTotal && currTotal <= endTotal
	}
	return currTotal >= startTotal || currTotal <= endTotal
}

func (a *App) loadDataSync() {
	// 1. Fetch Binance Klines & Ticker
	var klines []PricePoint
	var lastPrice, changePct float64
	var isLive bool

	pts, err := a.binanceCli.GetKlines(a.currentCoinSymbol, "1h", 48)
	if err == nil && len(pts) > 0 {
		klines = pts
		isLive = true
		lp, cp, tErr := a.binanceCli.GetTicker24h(a.currentCoinSymbol)
		if tErr == nil {
			lastPrice = lp
			changePct = cp
		} else {
			lastPrice = pts[len(pts)-1].Price
		}
	} else {
		klines = a.generateFallbackPoints(a.currentCoinSymbol)
		if len(klines) > 0 {
			lastPrice = klines[len(klines)-1].Price
			start := klines[0].Price
			changePct = ((lastPrice - start) / start) * 100
		}
	}

	a.mu.Lock()
	a.pricePoints = klines
	a.currentPrice = lastPrice
	a.priceChangePercent = changePct
	a.isLiveMarket = isLive
	a.isOffline = !isLive && len(a.allNews) == 0
	a.mu.Unlock()

	// 2. Fetch Active Feeds in background without blocking startup
	go a.fetchFeedsDirect(false)
}

func (a *App) isXSource(s FeedSource) bool {
	if s.Type == FeedSourceTypeX {
		return true
	}
	return strings.HasPrefix(s.ID, "x_") || strings.Contains(s.URL, "x.com") || strings.Contains(s.URL, "twitter.com")
}

func (a *App) calculateNextXInterval() time.Duration {
	a.mu.Lock()
	isNight := a.isNightModeNow()
	baseSec := a.xCheckInterval
	if isNight {
		baseSec = a.xNightCheckInterval
	}
	a.mu.Unlock()

	if baseSec <= 0 {
		if isNight {
			baseSec = 600
		} else {
			baseSec = 300
		}
	}

	// ± 30s random jitter (-30 to +30)
	jitter := rand.Intn(61) - 30
	targetSec := baseSec + jitter
	if targetSec < 30 {
		targetSec = 30
	}
	return time.Duration(targetSec) * time.Second
}

func (a *App) shouldFetchXSource(sourceID string, force bool) bool {
	if force {
		return true
	}
	a.xFetchMu.Lock()
	defer a.xFetchMu.Unlock()

	last, exists := a.xLastFetchTimes[sourceID]
	if !exists || last.IsZero() {
		// First fetch: fetch now and set random interval for next time
		a.xLastFetchTimes[sourceID] = time.Now()
		a.xNextIntervals[sourceID] = a.calculateNextXInterval()
		return true
	}

	interval := a.xNextIntervals[sourceID]
	if interval <= 0 {
		interval = a.calculateNextXInterval()
		a.xNextIntervals[sourceID] = interval
	}

	if time.Since(last) >= interval {
		a.xLastFetchTimes[sourceID] = time.Now()
		a.xNextIntervals[sourceID] = a.calculateNextXInterval()
		return true
	}

	return false
}

func (a *App) fetchFeedsDirect(notifyOnNew bool) []CryptoNewsItem {
	if !a.isFetchingDirect.CompareAndSwap(false, true) {
		return nil
	}
	defer a.isFetchingDirect.Store(false)

	a.mu.Lock()
	sourcesToFetch := make([]FeedSource, len(a.sources))
	copy(sourcesToFetch, a.sources)
	token := a.cryptoPanicToken
	clearedAt := a.historyClearedAt
	a.mu.Unlock()

	var accumulated []CryptoNewsItem
	var modifiedSources []FeedSource
	var hasSourceModifications bool
	firstFetched := true

	for _, src := range sourcesToFetch {
		if !src.IsActive {
			modifiedSources = append(modifiedSources, src)
			continue
		}

		// Anti-Ban & Rate-Limit protection: Only poll X sources every 5-10 minutes randomly
		if a.isXSource(src) && !a.shouldFetchXSource(src.ID, false) {
			modifiedSources = append(modifiedSources, src)
			continue
		}

		// 1-second delay between querying each active source
		if !firstFetched {
			time.Sleep(1 * time.Second)
		}
		firstFetched = false

		items, err := a.feedCli.FetchSource(src, token)
		if err == nil {
			accumulated = append(accumulated, items...)
			if src.FailureCount > 0 || src.AutoDisabledAfterFailure {
				src.FailureCount = 0
				src.AutoDisabledAfterFailure = false
				hasSourceModifications = true
			}
			modifiedSources = append(modifiedSources, src)
		} else {
			// Don't auto-disable X sources quickly due to headless browser retries
			if !a.isXSource(src) {
				src.FailureCount++
				hasSourceModifications = true
				if src.FailureCount >= 2 {
					src.IsActive = false
					src.AutoDisabledAfterFailure = true
				}
			}
			modifiedSources = append(modifiedSources, src)
		}
	}

	a.mu.Lock()
	defer a.mu.Unlock()

	if hasSourceModifications {
		a.sources = modifiedSources
		a.saveSettingsLocked()
	}

	// Filter out items older than history clear timestamp, except for sources with no existing items in history
	var eligible []CryptoNewsItem
	for _, n := range accumulated {
		if a.deletedNewsIDs[n.ID] {
			continue
		}
		hasExisting := false
		for _, existing := range a.allNews {
			if strings.EqualFold(existing.Source, n.Source) {
				hasExisting = true
				break
			}
		}
		if !hasExisting || n.PublishedAtMillis >= clearedAt {
			if len(a.activeKeywords) > 0 {
				fullText := strings.ToLower(n.Title + " " + n.Description + " " + n.Tag)
				for _, kw := range a.activeKeywords {
					k := strings.TrimSpace(strings.ToLower(kw))
					if k != "" && strings.Contains(fullText, k) {
						a.favoriteIDs[n.ID] = true
						break
					}
				}
			}
			n.IsFavorite = a.favoriteIDs[n.ID]
			n.IsSeen = a.seenNewsIDs[n.ID]
			n.AssociatedPrice = a.findPriceForTime(a.pricePoints, n.PublishedAtMillis)
			n.FormattedTime = FormatTimeAgo(n.PublishedAtMillis, a.currentLanguage)
			eligible = append(eligible, n)
		}
	}

	// Identify newly arrived news
	var newlyArrived []CryptoNewsItem
	for _, n := range eligible {
		if !a.knownNewsIDs[n.ID] {
			newlyArrived = append(newlyArrived, n)
			a.knownNewsIDs[n.ID] = true
		}
	}

	if len(eligible) > 0 {
		a.allNews = a.mergeNews(a.allNews, eligible)
		a.saveSettingsLocked()
	} else if len(a.allNews) == 0 {
		a.allNews = a.getSampleNews(a.pricePoints)
	}

	if len(newlyArrived) > 0 && notifyOnNew {
		a.triggerAlarmLocked(newlyArrived[0].ID)
		wailsRuntime.EventsEmit(a.ctx, "new_news_alert", newlyArrived[0])

		if a.alarmEnabled && !a.isNightModeNow() {
			first := newlyArrived[0]
			title := fmt.Sprintf("📢 [%s] %s", first.Source, first.Title)
			body := first.Description
			if strings.TrimSpace(body) == "" {
				body = first.Title
			}
			go a.SendDesktopNotification(title, body)
		}
		a.dispatchIntegrationsLocked(newlyArrived)
	}

	return newlyArrived
}

func (a *App) dispatchIntegrationsLocked(items []CryptoNewsItem) {
	if len(items) == 0 {
		return
	}
	discordEnabled := a.discordWebhookEnabled
	discordURL := strings.TrimSpace(a.discordWebhookURL)
	telegramEnabled := a.telegramIntegrationEnabled
	telegramToken := strings.TrimSpace(a.telegramBotToken)
	telegramChatID := strings.TrimSpace(a.telegramChatID)
	slackEnabled := a.slackWebhookEnabled
	slackURL := strings.TrimSpace(a.slackWebhookURL)
	itemsCopy := make([]CryptoNewsItem, len(items))
	copy(itemsCopy, items)
	go func() {
		if discordEnabled && discordURL != "" {
			_ = SendDiscordWebhook(discordURL, itemsCopy)
		}
		if telegramEnabled && telegramToken != "" && telegramChatID != "" {
			_ = SendTelegramMessages(telegramToken, telegramChatID, itemsCopy)
		}
		if slackEnabled && slackURL != "" {
			_ = SendSlackWebhook(slackURL, itemsCopy)
		}
	}()
}

func (a *App) SetDiscordWebhookEnabled(enabled bool) FullAppState {
	a.mu.Lock()
	a.discordWebhookEnabled = enabled
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SaveDiscordWebhookURL(url string) (FullAppState, error) {
	cleanURL := strings.TrimSpace(url)
	if cleanURL != "" && !IsValidDiscordWebhookURL(cleanURL) {
		return a.GetState(), fmt.Errorf("Nieprawidłowy webhook Discord")
	}
	a.mu.Lock()
	a.discordWebhookURL = cleanURL
	a.discordWebhookEnabled = cleanURL != ""
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState(), nil
}

func (a *App) ClearDiscordWebhookURL() FullAppState {
	a.mu.Lock()
	a.discordWebhookURL = ""
	a.discordWebhookEnabled = false
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetTelegramIntegrationEnabled(enabled bool) FullAppState {
	a.mu.Lock()
	a.telegramIntegrationEnabled = enabled
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SaveTelegramIntegration(botToken string, chatID string) (FullAppState, error) {
	cleanToken := strings.TrimSpace(botToken)
	cleanChatID := strings.TrimSpace(chatID)
	if cleanToken != "" && !IsValidTelegramBotToken(cleanToken) {
		return a.GetState(), fmt.Errorf("Nieprawidłowy token bota Telegram")
	}
	if cleanToken != "" && cleanChatID == "" {
		return a.GetState(), fmt.Errorf("Podaj chat ID Telegram")
	}
	a.mu.Lock()
	a.telegramBotToken = cleanToken
	a.telegramChatID = cleanChatID
	a.telegramIntegrationEnabled = cleanToken != "" && cleanChatID != ""
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState(), nil
}

func (a *App) ClearTelegramIntegration() FullAppState {
	a.mu.Lock()
	a.telegramBotToken = ""
	a.telegramChatID = ""
	a.telegramIntegrationEnabled = false
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetSlackWebhookEnabled(enabled bool) FullAppState {
	a.mu.Lock()
	a.slackWebhookEnabled = enabled
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SaveSlackWebhookURL(url string) (FullAppState, error) {
	cleanURL := strings.TrimSpace(url)
	if cleanURL != "" && !IsValidSlackWebhookURL(cleanURL) {
		return a.GetState(), fmt.Errorf("Nieprawidłowy webhook Slack")
	}
	a.mu.Lock()
	a.slackWebhookURL = cleanURL
	a.slackWebhookEnabled = cleanURL != ""
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState(), nil
}

func (a *App) ClearSlackWebhookURL() FullAppState {
	a.mu.Lock()
	a.slackWebhookURL = ""
	a.slackWebhookEnabled = false
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SendNewsToIntegrations(newsID string) (FullAppState, error) {
	a.mu.Lock()
	var item CryptoNewsItem
	found := false
	for _, n := range a.allNews {
		if n.ID == newsID {
			item = n
			found = true
			break
		}
	}
	if !found {
		a.mu.Unlock()
		return a.GetState(), fmt.Errorf("Nie znaleziono wiadomości")
	}
	a.dispatchIntegrationsLocked([]CryptoNewsItem{item})
	a.mu.Unlock()
	return a.GetState(), nil
}

func (a *App) mergeNews(existing []CryptoNewsItem, incoming []CryptoNewsItem) []CryptoNewsItem {
	newsMap := make(map[string]CryptoNewsItem)
	for _, n := range existing {
		if !a.deletedNewsIDs[n.ID] {
			newsMap[n.ID] = n
		}
	}
	for _, n := range incoming {
		if !a.deletedNewsIDs[n.ID] {
			newsMap[n.ID] = n
		}
	}

	merged := make([]CryptoNewsItem, 0, len(newsMap))
	for _, n := range newsMap {
		n.IsFavorite = a.favoriteIDs[n.ID]
		n.IsSeen = a.seenNewsIDs[n.ID]
		merged = append(merged, n)
	}

	sort.Slice(merged, func(i, j int) bool {
		return merged[i].PublishedAtMillis > merged[j].PublishedAtMillis
	})

	if len(merged) > a.maxStoredNews {
		merged = merged[:a.maxStoredNews]
	}
	return merged
}

func (a *App) triggerAlarmLocked(newsID string) {
	if !a.alarmEnabled || a.isNightModeNow() {
		return
	}

	a.stopAlarmCycleLocked()

	a.alarmCycle = AlarmCycleState{
		IsActive:         true,
		VibrationCount:   1,
		MaxVibrations:    a.maxVibrations,
		SecondsRemaining: 60,
		Acknowledged:     false,
		LastNewsID:       newsID,
	}

	a.alarmTickerStop = make(chan struct{})
	go a.runAlarmCountdown(a.alarmTickerStop)
}

func (a *App) runAlarmCountdown(stopChan chan struct{}) {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-stopChan:
			return
		case <-ticker.C:
			a.mu.Lock()
			if !a.alarmCycle.IsActive || a.alarmCycle.Acknowledged || !a.alarmEnabled || a.isNightModeNow() {
				a.alarmCycle.IsActive = false
				a.mu.Unlock()
				wailsRuntime.EventsEmit(a.ctx, "alarm_cycle_update", a.alarmCycle)
				return
			}

			a.alarmCycle.SecondsRemaining--
			if a.alarmCycle.SecondsRemaining <= 0 {
				if a.alarmCycle.VibrationCount >= a.alarmCycle.MaxVibrations {
					a.alarmCycle.IsActive = false
					a.mu.Unlock()
					wailsRuntime.EventsEmit(a.ctx, "alarm_cycle_update", a.alarmCycle)
					return
				}
				a.alarmCycle.VibrationCount++
				a.alarmCycle.SecondsRemaining = 60
				// Trigger vibration sound/effect event in frontend
				wailsRuntime.EventsEmit(a.ctx, "play_vibration_sound", a.alarmCycle.VibrationCount)
			}
			cycleCopy := a.alarmCycle
			a.mu.Unlock()

			wailsRuntime.EventsEmit(a.ctx, "alarm_cycle_update", cycleCopy)
		}
	}
}

func (a *App) stopAlarmCycleLocked() {
	if a.alarmTickerStop != nil {
		close(a.alarmTickerStop)
		a.alarmTickerStop = nil
	}
	a.alarmCycle.IsActive = false
}

func (a *App) triggerPollWake() {
	if a.pollWakeChan != nil {
		select {
		case a.pollWakeChan <- struct{}{}:
		default:
		}
	}
}

func (a *App) getPollingIntervalSec() int {
	a.mu.Lock()
	defer a.mu.Unlock()
	sec := a.checkInterval
	if sec < 5 {
		sec = 60
	}
	if a.nightModeEnabled && a.isNightModeNow() {
		if a.nightCheckInterval >= 5 {
			sec = a.nightCheckInterval
		}
	}
	return sec
}

func (a *App) startPeriodicNewsPolling() {
	for {
		sec := a.getPollingIntervalSec()
		timer := time.NewTimer(time.Duration(sec) * time.Second)
		select {
		case <-timer.C:
		case <-a.pollWakeChan:
			if !timer.Stop() {
				select {
				case <-timer.C:
				default:
				}
			}
		}

		newly := a.fetchFeedsDirect(true)
		if len(newly) > 0 {
			a.refreshMarketDataOnly()
		}
		wailsRuntime.EventsEmit(a.ctx, "state_updated", a.GetState())
	}
}

func (a *App) startPeriodicMarketRefresh() {
	ticker := time.NewTicker(10 * time.Minute)
	for range ticker.C {
		a.refreshMarketDataOnly()
		wailsRuntime.EventsEmit(a.ctx, "state_updated", a.GetState())
	}
}

func (a *App) refreshMarketDataOnly() {
	a.mu.Lock()
	sym := a.currentCoinSymbol
	a.mu.Unlock()

	pts, err := a.binanceCli.GetKlines(sym, "1h", 48)
	if err == nil && len(pts) > 0 {
		lp, cp, tErr := a.binanceCli.GetTicker24h(sym)
		if tErr == nil {
			a.mu.Lock()
			a.pricePoints = pts
			a.currentPrice = lp
			a.priceChangePercent = cp
			a.isLiveMarket = true

			// Remap associated prices
			for i := range a.allNews {
				a.allNews[i].AssociatedPrice = a.findPriceForTime(a.pricePoints, a.allNews[i].PublishedAtMillis)
			}
			a.mu.Unlock()
		}
	}
}

func (a *App) fetchPairsAsync() {
	coins, err := a.binanceCli.GetExchangeInfo()
	if err == nil && len(coins) > 0 {
		a.mu.Lock()
		a.allAvailableCoins = coins
		a.mu.Unlock()
		wailsRuntime.EventsEmit(a.ctx, "state_updated", a.GetState())
	}
}

func (a *App) findPriceForTime(points []PricePoint, millis int64) float64 {
	if len(points) == 0 {
		return 0.20
	}
	var closest PricePoint
	var minDiff int64 = math.MaxInt64

	for _, pt := range points {
		diff := pt.Timestamp - millis
		if diff < 0 {
			diff = -diff
		}
		if diff < minDiff {
			minDiff = diff
			closest = pt
		}
	}
	if closest.Price > 0 {
		return closest.Price
	}
	return points[len(points)-1].Price
}

func (a *App) generateFallbackPoints(symbol string) []PricePoint {
	now := time.Now().UnixMilli()
	oneDayAgo := now - (24 * 60 * 60 * 1000)
	basePrice := 1.0
	switch {
	case strings.HasPrefix(symbol, "BTC"):
		basePrice = 64000.0
	case strings.HasPrefix(symbol, "ETH"):
		basePrice = 2600.0
	case strings.HasPrefix(symbol, "SOL"):
		basePrice = 145.0
	case strings.HasPrefix(symbol, "ADA"):
		basePrice = 0.20
	case strings.HasPrefix(symbol, "XRP"):
		basePrice = 0.58
	}

	var points []PricePoint
	for i := 0; i <= 48; i++ {
		t := oneDayAgo + int64(i*30*60*1000)
		trend := math.Sin(float64(i)/6.0)*(basePrice*0.03) + (float64(i) * (basePrice * 0.001))
		points = append(points, PricePoint{
			Timestamp: t,
			Price:     basePrice + trend,
		})
	}
	return points
}

func (a *App) getSampleNews(points []PricePoint) []CryptoNewsItem {
	now := time.Now().UnixMilli()
	price := 0.20
	if len(points) > 0 {
		price = points[len(points)-1].Price
	}
	return []CryptoNewsItem{
		{
			ID:                "offline-sample",
			Title:             "Brak dostępnych wiadomości ze źródeł online",
			Description:       "Sprawdź połączenie internetowe i status źródeł w zakładce Ustawienia.",
			Source:            "Offline Demo",
			URL:               "",
			PublishedAtMillis: now - 10*60*1000,
			FormattedTime:     "10 min temu",
			Tag:               "#Offline",
			ColorHex:          "#8B949E",
			AssociatedPrice:   price,
			IsFavorite:        false,
		},
	}
}

func (a *App) applyFilters(list []CryptoNewsItem, sourceFilters []string, keywords []string) []CryptoNewsItem {
	var result []CryptoNewsItem

	// Check if all/any source filter is "all"
	hasAllSources := len(sourceFilters) == 0
	if !hasAllSources {
		hasAllSources = true
		for _, f := range sourceFilters {
			cleanF := strings.TrimSpace(f)
			if cleanF != "" && !strings.EqualFold(cleanF, "Wszystkie") && !strings.EqualFold(cleanF, "All") && !strings.EqualFold(cleanF, "Alle") {
				hasAllSources = false
				break
			}
		}
	}

	for _, news := range list {
		matchesSource := false
		if hasAllSources {
			matchesSource = true
		} else {
			for _, sf := range sourceFilters {
				cleanFilter := strings.TrimSpace(sf)
				if cleanFilter == "" || strings.EqualFold(cleanFilter, "Wszystkie") || strings.EqualFold(cleanFilter, "All") || strings.EqualFold(cleanFilter, "Alle") {
					continue
				}
				if strings.Contains(strings.ToLower(cleanFilter), "makro") {
					if strings.Contains(strings.ToLower(news.Source), "makro") || strings.Contains(strings.ToLower(news.Tag), "makro") {
						matchesSource = true
						break
					}
				} else {
					if strings.Contains(strings.ToLower(news.Source), strings.ToLower(cleanFilter)) ||
						strings.Contains(strings.ToLower(cleanFilter), strings.ToLower(news.Source)) {
						matchesSource = true
						break
					}
				}
			}
		}

		matchesKeywords := true
		if len(keywords) > 0 {
			fullText := strings.ToLower(news.Title + " " + news.Description + " " + news.Tag)
			found := false
			for _, kw := range keywords {
				if strings.Contains(fullText, strings.ToLower(kw)) {
					found = true
					break
				}
			}
			matchesKeywords = found
		}

		if matchesSource && matchesKeywords {
			result = append(result, news)
		}
	}
	return result
}

// ---------------- EXPOSED FRONTEND METHODS ----------------

func (a *App) GetState() FullAppState {
	a.mu.Lock()
	defer a.mu.Unlock()

	if len(a.sources) == 0 {
		a.sources = GetDefaultSources()
		a.saveSettingsLocked()
	}
	for i := range a.sources {
		a.sources[i].Language = NormalizeSourceLanguage(a.sources[i].Language, a.sources[i].ID, a.sources[i].Name, a.sources[i].URL)
	}

	var observedCoins []CoinInfo
	var selectedCoin CoinInfo

	for _, c := range a.allAvailableCoins {
		if a.observedSymbols[c.Symbol] {
			observedCoins = append(observedCoins, c)
		}
		if c.Symbol == a.currentCoinSymbol {
			selectedCoin = c
		}
	}

	if selectedCoin.Symbol == "" {
		if len(observedCoins) > 0 {
			selectedCoin = observedCoins[0]
		} else if len(a.allAvailableCoins) > 0 {
			selectedCoin = a.allAvailableCoins[0]
		}
	}

	unreadNewsCount := 0
	for _, n := range a.allNews {
		if !n.IsSeen {
			unreadNewsCount++
		}
	}

	baseList := a.allNews
	if a.currentTab == TabFavorites {
		var favs []CryptoNewsItem
		for _, n := range a.allNews {
			if n.IsFavorite {
				favs = append(favs, n)
			}
		}
		baseList = favs
	} else if a.currentTab == TabNew {
		var unread []CryptoNewsItem
		for _, n := range a.allNews {
			if !n.IsSeen {
				unread = append(unread, n)
			}
		}
		baseList = unread
	}

	filteredNews := a.applyFilters(baseList, a.selectedSourceFilters, a.activeKeywords)

	selectedNewsID := a.selectedNewsID
	if selectedNewsID == "" && len(filteredNews) > 0 {
		selectedNewsID = filteredNews[0].ID
	}

	// Update relative formatted times
	for i := range filteredNews {
		filteredNews[i].FormattedTime = FormatTimeAgo(filteredNews[i].PublishedAtMillis, a.currentLanguage)
	}

	return FullAppState{
		PricePoints:                   a.pricePoints,
		NewsList:                      filteredNews,
		SourcesList:                   a.sources,
		SelectedCoin:                  selectedCoin,
		ObservedCoins:                 observedCoins,
		AllAvailableCoins:             a.allAvailableCoins,
		Keywords:                      a.activeKeywords,
		CurrentPrice:                  a.currentPrice,
		PriceChangePercent:            a.priceChangePercent,
		SelectedNewsID:                selectedNewsID,
		ActiveSourceFilter:            a.activeSourceFilter,
		SelectedSourceFilters:         a.selectedSourceFilters,
		CurrentTab:                    a.currentTab,
		SettingsSubTab:                a.settingsSubTab,
		IsOffline:                     a.isOffline,
		IsLiveMarket:                  a.isLiveMarket,
		AlarmEnabled:                  a.alarmEnabled,
		MaxVibrations:                 a.maxVibrations,
		NightModeEnabled:              a.nightModeEnabled,
		NightModeStart:                a.nightModeStart,
		NightModeEnd:                  a.nightModeEnd,
		IsNightTimeNow:                a.isNightModeNow(),
		CheckInterval:                 a.checkInterval,
		NightCheckInterval:            a.nightCheckInterval,
		XCheckInterval:                a.xCheckInterval,
		XNightCheckInterval:           a.xNightCheckInterval,
		CurrentLanguage:               a.currentLanguage,
		CryptoPanicTokenConfigured:    strings.TrimSpace(a.cryptoPanicToken) != "",
		DiscordWebhookEnabled:         a.discordWebhookEnabled,
		DiscordWebhookConfigured:      strings.TrimSpace(a.discordWebhookURL) != "",
		TelegramIntegrationEnabled:    a.telegramIntegrationEnabled,
		TelegramIntegrationConfigured: strings.TrimSpace(a.telegramBotToken) != "" && strings.TrimSpace(a.telegramChatID) != "",
		SlackWebhookEnabled:           a.slackWebhookEnabled,
		SlackWebhookConfigured:        strings.TrimSpace(a.slackWebhookURL) != "",
		AlarmCycle:                    a.alarmCycle,
		MaxStoredNews:                 a.maxStoredNews,
		TotalStoredNewsCount:          len(a.allNews),
		UnreadNewsCount:               unreadNewsCount,
		UseInternalBrowser:            a.useInternalBrowser,
		AlwaysOnTop:                   a.alwaysOnTop,
		Autostart:                     a.autostart,
		IsXLoggedIn:                   a.xAuthToken != "",
		ShowChart:                     a.showChart,
	}
}

func (a *App) SelectCoin(symbol string) FullAppState {
	a.mu.Lock()
	if a.currentCoinSymbol != symbol {
		a.currentCoinSymbol = symbol
		a.saveSettingsLocked()
		a.mu.Unlock()
		a.loadDataSync()
		return a.GetState()
	}
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) ToggleObservedCoin(symbol string) FullAppState {
	a.mu.Lock()
	if a.observedSymbols[symbol] {
		if len(a.observedSymbols) > 1 {
			delete(a.observedSymbols, symbol)
			if a.currentCoinSymbol == symbol {
				for s := range a.observedSymbols {
					a.currentCoinSymbol = s
					break
				}
			}
		}
	} else {
		a.observedSymbols[symbol] = true
	}
	a.saveSettingsLocked()
	curr := a.currentCoinSymbol
	a.mu.Unlock()

	if curr == symbol {
		a.loadDataSync()
	}
	return a.GetState()
}

func (a *App) FetchAvailablePairs() FullAppState {
	a.fetchPairsAsync()
	return a.GetState()
}

func (a *App) AddKeyword(keyword string) FullAppState {
	a.mu.Lock()
	trimmed := strings.TrimSpace(keyword)
	if trimmed != "" {
		exists := false
		for _, k := range a.activeKeywords {
			if strings.EqualFold(k, trimmed) {
				exists = true
				break
			}
		}
		if !exists {
			a.activeKeywords = append(a.activeKeywords, trimmed)
			// Auto-favorite matching existing news
			kLower := strings.ToLower(trimmed)
			for i := range a.allNews {
				fullText := strings.ToLower(a.allNews[i].Title + " " + a.allNews[i].Description + " " + a.allNews[i].Tag)
				if strings.Contains(fullText, kLower) {
					a.favoriteIDs[a.allNews[i].ID] = true
					a.allNews[i].IsFavorite = true
				}
			}
			a.saveSettingsLocked()
		}
	}
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) RemoveKeyword(keyword string) FullAppState {
	a.mu.Lock()
	var updated []string
	for _, k := range a.activeKeywords {
		if !strings.EqualFold(k, keyword) {
			updated = append(updated, k)
		}
	}
	a.activeKeywords = updated
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) ClearKeywords() FullAppState {
	a.mu.Lock()
	a.activeKeywords = []string{}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) ToggleFavorite(newsID string) FullAppState {
	a.mu.Lock()
	if a.favoriteIDs[newsID] {
		delete(a.favoriteIDs, newsID)
	} else {
		a.favoriteIDs[newsID] = true
	}
	for i := range a.allNews {
		if a.allNews[i].ID == newsID {
			a.allNews[i].IsFavorite = a.favoriteIDs[newsID]
		}
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SwitchTab(tab string) FullAppState {
	a.mu.Lock()
	a.currentTab = AppTab(tab)
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SwitchSettingsSubTab(subTab string) FullAppState {
	a.mu.Lock()
	a.settingsSubTab = SettingsSubTab(subTab)
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetSourceFilter(filter string) FullAppState {
	return a.ToggleSourceFilter(filter)
}

func (a *App) ToggleSourceFilter(filter string) FullAppState {
	a.mu.Lock()
	trimmed := strings.TrimSpace(filter)
	if trimmed == "" || strings.EqualFold(trimmed, "Wszystkie") || strings.EqualFold(trimmed, "All") || strings.EqualFold(trimmed, "Alle") {
		a.selectedSourceFilters = []string{"Wszystkie"}
		a.activeSourceFilter = "Wszystkie"
	} else {
		var newFilters []string
		for _, f := range a.selectedSourceFilters {
			if !strings.EqualFold(f, "Wszystkie") && !strings.EqualFold(f, "All") && !strings.EqualFold(f, "Alle") {
				newFilters = append(newFilters, f)
			}
		}
		found := false
		var updated []string
		for _, f := range newFilters {
			if strings.EqualFold(f, trimmed) {
				found = true
			} else {
				updated = append(updated, f)
			}
		}
		if !found {
			updated = append(updated, trimmed)
		}
		if len(updated) == 0 {
			updated = []string{"Wszystkie"}
		}
		a.selectedSourceFilters = updated
		if len(updated) == 1 {
			a.activeSourceFilter = updated[0]
		} else {
			a.activeSourceFilter = strings.Join(updated, ", ")
		}
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetSourceFilters(filters []string) FullAppState {
	a.mu.Lock()
	var cleaned []string
	for _, f := range filters {
		t := strings.TrimSpace(f)
		if t != "" && !strings.EqualFold(t, "Wszystkie") && !strings.EqualFold(t, "All") && !strings.EqualFold(t, "Alle") {
			cleaned = append(cleaned, t)
		}
	}
	if len(cleaned) == 0 {
		cleaned = []string{"Wszystkie"}
	}
	a.selectedSourceFilters = cleaned
	if len(cleaned) == 1 {
		a.activeSourceFilter = cleaned[0]
	} else {
		a.activeSourceFilter = strings.Join(cleaned, ", ")
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) ClearSourceFilters() FullAppState {
	return a.SetSourceFilters([]string{"Wszystkie"})
}

func (a *App) MarkNewsAsSeen(newsID string) FullAppState {
	a.mu.Lock()
	a.seenNewsIDs[newsID] = true
	for i := range a.allNews {
		if a.allNews[i].ID == newsID {
			a.allNews[i].IsSeen = true
		}
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) MarkAllNewsAsSeen() FullAppState {
	a.mu.Lock()
	for i := range a.allNews {
		a.allNews[i].IsSeen = true
		a.seenNewsIDs[a.allNews[i].ID] = true
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SelectNews(newsID string) FullAppState {
	a.mu.Lock()
	a.selectedNewsID = newsID
	if newsID != "" {
		a.seenNewsIDs[newsID] = true
		for i := range a.allNews {
			if a.allNews[i].ID == newsID {
				a.allNews[i].IsSeen = true
			}
		}
		a.saveSettingsLocked()
	}
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) ToggleSource(sourceID string, active bool) FullAppState {
	a.mu.Lock()
	for i := range a.sources {
		if a.sources[i].ID == sourceID {
			a.sources[i].IsActive = active
			a.sources[i].FailureCount = 0
			a.sources[i].AutoDisabledAfterFailure = false
		}
	}
	if active {
		a.xFetchMu.Lock()
		delete(a.xLastFetchTimes, sourceID)
		a.xFetchMu.Unlock()
	}
	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState()
}

func (a *App) SetSourceLanguage(sourceID string, language string) FullAppState {
	a.mu.Lock()
	for i := range a.sources {
		if a.sources[i].ID == sourceID {
			a.sources[i].Language = NormalizeSourceLanguage(language, "", "", "")
			break
		}
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) ToggleAllSources(active bool, sourceIDs []string) FullAppState {
	a.mu.Lock()
	idMap := make(map[string]bool)
	for _, id := range sourceIDs {
		idMap[id] = true
	}
	hasSpecificIDs := len(sourceIDs) > 0

	for i := range a.sources {
		if !hasSpecificIDs || idMap[a.sources[i].ID] {
			a.sources[i].IsActive = active
			if active {
				a.sources[i].FailureCount = 0
				a.sources[i].AutoDisabledAfterFailure = false
			}
		}
	}
	if active {
		a.xFetchMu.Lock()
		for _, s := range a.sources {
			if s.IsActive && a.isXSource(s) {
				delete(a.xLastFetchTimes, s.ID)
			}
		}
		a.xFetchMu.Unlock()
	}
	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState()
}

func (a *App) AddTelegramSource(handleOrUrl string, customName string, description string) FullAppState {
	cleanHandle := strings.TrimSpace(handleOrUrl)
	cleanHandle = strings.TrimPrefix(cleanHandle, "https://t.me/s/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "https://t.me/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "t.me/s/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "t.me/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "@")
	cleanHandle = strings.TrimSpace(cleanHandle)

	if cleanHandle == "" {
		return a.GetState()
	}

	sourceID := "tg_" + strings.ToLower(cleanHandle)
	a.mu.Lock()
	for _, s := range a.sources {
		if s.ID == sourceID {
			a.mu.Unlock()
			return a.GetState()
		}
	}

	displayName := strings.TrimSpace(customName)
	if displayName == "" {
		displayName = "@" + cleanHandle + " (TG)"
	}

	newSource := FeedSource{
		ID:          sourceID,
		Name:        displayName,
		URL:         "https://t.me/s/" + cleanHandle,
		ColorHex:    "#2AABEE",
		Type:        FeedSourceTypeTelegram,
		Description: strings.TrimSpace(description),
		IsActive:    true,
	}

	a.sources = append(a.sources, newSource)
	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState()
}

func (a *App) AddRssSource(urlInput string, customName string, description string) FullAppState {
	cleanURL := strings.TrimSpace(urlInput)
	if cleanURL == "" {
		return a.GetState()
	}
	if !strings.HasPrefix(cleanURL, "http://") && !strings.HasPrefix(cleanURL, "https://") {
		cleanURL = "https://" + cleanURL
	}

	sourceID := "rss_custom_" + Md5Hash(cleanURL)[:8]
	a.mu.Lock()
	for _, s := range a.sources {
		if s.ID == sourceID || strings.EqualFold(s.URL, cleanURL) {
			a.mu.Unlock()
			return a.GetState()
		}
	}

	displayName := strings.TrimSpace(customName)
	if displayName == "" {
		displayName = "RSS / Atom"
	}

	newSource := FeedSource{
		ID:          sourceID,
		Name:        displayName,
		URL:         cleanURL,
		ColorHex:    "#38BDF8",
		Type:        FeedSourceTypeRSS,
		Description: strings.TrimSpace(description),
		IsActive:    true,
	}

	a.sources = append(a.sources, newSource)
	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState()
}

func (a *App) AddXSource(handleOrUrl string, customName string, description string) FullAppState {
	cleanHandle := strings.TrimSpace(handleOrUrl)
	cleanHandle = strings.TrimPrefix(cleanHandle, "https://x.com/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "http://x.com/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "https://twitter.com/")
	cleanHandle = strings.TrimPrefix(handleOrUrl, "http://twitter.com/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "x.com/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "twitter.com/")
	cleanHandle = strings.TrimPrefix(cleanHandle, "@")
	cleanHandle = strings.Split(cleanHandle, "/")[0]
	cleanHandle = strings.Split(cleanHandle, "?")[0]
	cleanHandle = strings.TrimSpace(cleanHandle)

	if cleanHandle == "" {
		return a.GetState()
	}

	sourceID := "x_" + strings.ToLower(cleanHandle)
	a.mu.Lock()
	for _, s := range a.sources {
		if s.ID == sourceID {
			a.mu.Unlock()
			return a.GetState()
		}
	}

	displayName := strings.TrimSpace(customName)
	if displayName == "" {
		displayName = "@" + cleanHandle + " (X)"
	}

	newSource := FeedSource{
		ID:          sourceID,
		Name:        displayName,
		URL:         "https://x.com/" + cleanHandle,
		ColorHex:    "#1D9BF0",
		Type:        FeedSourceTypeX,
		Description: strings.TrimSpace(description),
		IsActive:    true,
		Language:    NormalizeSourceLanguage("", sourceID, displayName, "https://x.com/"+cleanHandle),
	}

	a.sources = append(a.sources, newSource)
	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState()
}

func (a *App) LoginX() (FullAppState, error) {
	sessionPath := a.storage.GetSessionPath()
	session, err := xscraper.LoginInteractive(sessionPath)
	if err != nil {
		return a.GetState(), err
	}

	a.mu.Lock()
	a.xAuthToken = session.AuthToken
	a.xCt0 = session.CT0
	a.feedCli.SetXSession(*session, sessionPath)
	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState(), nil
}

func (a *App) LogoutX() FullAppState {
	a.mu.Lock()
	a.xAuthToken = ""
	a.xCt0 = ""
	a.feedCli.SetXSession(xscraper.Session{}, "")
	sessionPath := a.storage.GetSessionPath()
	_ = os.Remove(sessionPath)
	a.saveSettingsLocked()
	a.mu.Unlock()

	return a.GetState()
}

func (a *App) SaveXSession(authToken, ct0 string) FullAppState {
	a.mu.Lock()
	a.xAuthToken = strings.TrimSpace(authToken)
	a.xCt0 = strings.TrimSpace(ct0)

	session := xscraper.Session{
		AuthToken: a.xAuthToken,
		CT0:       a.xCt0,
		UpdatedAt: time.Now(),
	}
	sessionPath := a.storage.GetSessionPath()
	a.feedCli.SetXSession(session, sessionPath)

	if scraper, err := xscraper.New(xscraper.WithSession(session)); err == nil {
		_ = scraper.SaveSessionToFile(sessionPath)
	}

	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState()
}

// GetXSessionQR zwraca obrazek PNG kodu QR z sesją X zakodowany w Base64 (data:image/png;base64,...)
func (a *App) GetXSessionQR() (string, error) {
	a.mu.Lock()
	defer a.mu.Unlock()

	authToken := a.xAuthToken
	ct0 := a.xCt0

	if authToken == "" || ct0 == "" {
		sessionPath := a.storage.GetSessionPath()
		if sess, err := xscraper.LoadSessionFromFile(sessionPath); err == nil && sess.AuthToken != "" {
			authToken = sess.AuthToken
			ct0 = sess.CT0
		}
	}

	if authToken == "" || ct0 == "" {
		return "", fmt.Errorf("brak aktywnej sesji X – najpierw zaloguj się do X")
	}

	session := xscraper.Session{
		AuthToken: authToken,
		CT0:       ct0,
	}

	png, err := session.GenerateQRCodePNG()
	if err != nil {
		return "", fmt.Errorf("błąd generowania kodu QR: %w", err)
	}

	return "data:image/png;base64," + base64.StdEncoding.EncodeToString(png), nil
}

func (a *App) RemoveSource(sourceID string) FullAppState {
	a.mu.Lock()
	var updated []FeedSource
	for _, s := range a.sources {
		if s.ID != sourceID {
			updated = append(updated, s)
		}
	}
	a.sources = updated
	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState()
}

func (a *App) SaveCryptoPanicToken(token string) FullAppState {
	a.mu.Lock()
	a.cryptoPanicToken = strings.TrimSpace(token)
	for i := range a.sources {
		if a.sources[i].ID == "cp_api" {
			a.sources[i].IsActive = a.cryptoPanicToken != ""
			a.sources[i].FailureCount = 0
			a.sources[i].AutoDisabledAfterFailure = false
		}
	}
	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.fetchFeedsDirect(false)
	return a.GetState()
}

func (a *App) SetAlarmEnabled(enabled bool) FullAppState {
	a.mu.Lock()
	a.alarmEnabled = enabled
	if !enabled {
		a.stopAlarmCycleLocked()
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetMaxVibrations(count int) FullAppState {
	a.mu.Lock()
	if count < 1 {
		count = 1
	}
	if count > 30 {
		count = 30
	}
	a.maxVibrations = count
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetNightModeEnabled(enabled bool) FullAppState {
	a.mu.Lock()
	a.nightModeEnabled = enabled
	if enabled && a.isNightModeNow() {
		a.stopAlarmCycleLocked()
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	a.triggerPollWake()
	return a.GetState()
}

func (a *App) SetNightHours(start string, end string) FullAppState {
	a.mu.Lock()
	a.nightModeStart = strings.TrimSpace(start)
	a.nightModeEnd = strings.TrimSpace(end)
	if a.isNightModeNow() {
		a.stopAlarmCycleLocked()
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	a.triggerPollWake()
	return a.GetState()
}

func (a *App) SetCheckInterval(sec int) FullAppState {
	a.mu.Lock()
	if sec >= 5 && sec <= 86400 {
		a.checkInterval = sec
		a.saveSettingsLocked()
	}
	a.mu.Unlock()
	a.triggerPollWake()
	return a.GetState()
}

func (a *App) SetNightCheckInterval(sec int) FullAppState {
	a.mu.Lock()
	if sec >= 5 && sec <= 86400 {
		a.nightCheckInterval = sec
		a.saveSettingsLocked()
	}
	a.mu.Unlock()
	a.triggerPollWake()
	return a.GetState()
}

func (a *App) SetXCheckInterval(sec int) FullAppState {
	a.mu.Lock()
	if sec >= 30 && sec <= 86400 {
		a.xCheckInterval = sec
		a.saveSettingsLocked()
	}
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetXNightCheckInterval(sec int) FullAppState {
	a.mu.Lock()
	if sec >= 30 && sec <= 86400 {
		a.xNightCheckInterval = sec
		a.saveSettingsLocked()
	}
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetLanguage(lang string) FullAppState {
	a.mu.Lock()
	a.currentLanguage = lang
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetUseInternalBrowser(enabled bool) FullAppState {
	a.mu.Lock()
	a.useInternalBrowser = enabled
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetMaxStoredNews(limit int) FullAppState {
	a.mu.Lock()
	if limit < 50 {
		limit = 50
	}
	if limit > 50000 {
		limit = 50000
	}
	a.maxStoredNews = limit
	if len(a.allNews) > limit {
		a.allNews = a.allNews[:limit]
	}
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) ClearNewsHistory() FullAppState {
	a.mu.Lock()
	a.allNews = []CryptoNewsItem{}
	a.knownNewsIDs = make(map[string]bool)
	a.historyClearedAt = time.Now().UnixMilli()
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetShowChart(enabled bool) FullAppState {
	a.mu.Lock()
	a.showChart = enabled
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) DeleteNews(newsIDs []string) FullAppState {
	a.mu.Lock()
	if a.deletedNewsIDs == nil {
		a.deletedNewsIDs = make(map[string]bool)
	}
	idSet := make(map[string]bool, len(newsIDs))
	for _, id := range newsIDs {
		idSet[id] = true
		a.deletedNewsIDs[id] = true
		delete(a.knownNewsIDs, id)
		delete(a.favoriteIDs, id)
		delete(a.seenNewsIDs, id)
	}
	remaining := make([]CryptoNewsItem, 0, len(a.allNews))
	for _, item := range a.allNews {
		if !idSet[item.ID] {
			remaining = append(remaining, item)
		}
	}
	a.allNews = remaining
	a.saveSettingsLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SetNewsFetchCutoffMillis(timestampMillis int64) FullAppState {
	a.mu.Lock()
	if timestampMillis < 0 {
		timestampMillis = 0
	}
	a.historyClearedAt = timestampMillis

	if timestampMillis > 0 {
		var filtered []CryptoNewsItem
		newKnown := make(map[string]bool)
		for _, n := range a.allNews {
			if n.PublishedAtMillis >= timestampMillis {
				filtered = append(filtered, n)
				newKnown[n.ID] = true
			}
		}
		a.allNews = filtered
		a.knownNewsIDs = newKnown
	}

	a.saveSettingsLocked()
	a.mu.Unlock()

	go a.loadDataSync()
	return a.GetState()
}

func (a *App) AcknowledgeAlarm() FullAppState {
	a.mu.Lock()
	a.alarmCycle.Acknowledged = true
	a.alarmCycle.IsActive = false
	a.stopAlarmCycleLocked()
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) RefreshData() FullAppState {
	go a.loadDataSync()
	return a.GetState()
}

func (a *App) ToggleAlwaysOnTop() FullAppState {
	a.mu.Lock()
	a.alwaysOnTop = !a.alwaysOnTop
	val := a.alwaysOnTop
	a.saveSettingsLocked()
	a.mu.Unlock()

	wailsRuntime.WindowSetAlwaysOnTop(a.ctx, val)
	return a.GetState()
}

func (a *App) OpenExternalUrl(targetURL string) {
	if !strings.HasPrefix(targetURL, "http://") && !strings.HasPrefix(targetURL, "https://") {
		targetURL = "https://" + strings.TrimPrefix(targetURL, "/")
	}
	// Try Wails BrowserOpenURL, pkg/browser and xdg-open command
	if a.ctx != nil {
		wailsRuntime.BrowserOpenURL(a.ctx, targetURL)
	}
	_ = browser.OpenURL(targetURL)
	_ = exec.Command("xdg-open", targetURL).Start()
}

func (a *App) SetAutostart(enabled bool) FullAppState {
	a.mu.Lock()
	a.autostart = enabled
	a.saveSettingsLocked()
	a.mu.Unlock()

	a.storage.SetAutostart(enabled)
	return a.GetState()
}

func (a *App) ToggleWindowVisibility() {
	a.mu.Lock()
	a.windowVisible = !a.windowVisible
	visible := a.windowVisible
	a.mu.Unlock()

	if visible {
		wailsRuntime.WindowShow(a.ctx)
	} else {
		wailsRuntime.WindowHide(a.ctx)
	}
}

func (a *App) ShowWindow() {
	a.mu.Lock()
	a.windowVisible = true
	a.mu.Unlock()
	wailsRuntime.WindowShow(a.ctx)
}

func (a *App) HideWindow() {
	a.mu.Lock()
	a.windowVisible = false
	a.mu.Unlock()
	wailsRuntime.WindowHide(a.ctx)
}

func (a *App) MinimizeWindow() {
	wailsRuntime.WindowMinimise(a.ctx)
}

func (a *App) CloseWindow() {
	wailsRuntime.Quit(a.ctx)
}

func (a *App) SetWindowSize(width, height int) {
	if height < 500 {
		height = 500
	}
	if height > 2500 {
		height = 2500
	}
	if width < 380 {
		width = 380
	}
	if width > 650 {
		width = 650
	}
	a.mu.Lock()
	a.windowWidth = width
	a.windowHeight = height
	a.mu.Unlock()
	wailsRuntime.WindowSetSize(a.ctx, width, height)
}

func (a *App) SaveWindowSize(width, height int) {
	a.SetWindowSize(width, height)
	a.mu.Lock()
	a.saveSettingsLocked()
	a.mu.Unlock()
}

func (a *App) GetWindowSize() (int, int) {
	w, h := wailsRuntime.WindowGetSize(a.ctx)
	return w, h
}

// ---------------- DATA IMPORT / EXPORT METHODS ----------------

func (a *App) ExportSettingsJSON() (string, error) {
	a.mu.Lock()
	defer a.mu.Unlock()

	favList := make([]string, 0, len(a.favoriteIDs))
	for id := range a.favoriteIDs {
		favList = append(favList, id)
	}

	seenList := make([]string, 0, len(a.seenNewsIDs))
	for id := range a.seenNewsIDs {
		seenList = append(seenList, id)
	}

	obsList := make([]string, 0, len(a.observedSymbols))
	for sym := range a.observedSymbols {
		obsList = append(obsList, sym)
	}

	sourcesCopy := make([]FeedSource, len(a.sources))
	copy(sourcesCopy, a.sources)

	keywordsCopy := make([]string, len(a.activeKeywords))
	copy(keywordsCopy, a.activeKeywords)

	sourceFiltersCopy := make([]string, len(a.selectedSourceFilters))
	copy(sourceFiltersCopy, a.selectedSourceFilters)

	settings := AppSettingsExport{
		Version:                    1,
		ExportedAt:                 time.Now().UnixMilli(),
		ObservedCoins:              obsList,
		CurrentCoin:                a.currentCoinSymbol,
		FilterKeywords:             keywordsCopy,
		AlarmEnabled:               a.alarmEnabled,
		MaxVibrations:              a.maxVibrations,
		NightModeEnabled:           a.nightModeEnabled,
		NightModeStart:             a.nightModeStart,
		NightModeEnd:               a.nightModeEnd,
		CheckInterval:              a.checkInterval,
		NightCheckInterval:         a.nightCheckInterval,
		XCheckInterval:             a.xCheckInterval,
		XNightCheckInterval:        a.xNightCheckInterval,
		AppLanguage:                a.currentLanguage,
		MaxStoredNews:              a.maxStoredNews,
		UseInternalBrowser:         a.useInternalBrowser,
		Sources:                    sourcesCopy,
		FavoriteNewsIDs:            favList,
		SeenNewsIDs:                seenList,
		SelectedSourceFilters:      sourceFiltersCopy,
		CryptoPanicToken:           a.cryptoPanicToken,
		DiscordWebhookEnabled:      a.discordWebhookEnabled,
		DiscordWebhookURL:          a.discordWebhookURL,
		TelegramIntegrationEnabled: a.telegramIntegrationEnabled,
		TelegramBotToken:           a.telegramBotToken,
		TelegramChatID:             a.telegramChatID,
		SlackWebhookEnabled:        a.slackWebhookEnabled,
		SlackWebhookURL:            a.slackWebhookURL,
	}

	return ExportSettingsToJSON(settings)
}

func (a *App) ImportSettingsJSON(jsonContent string) (FullAppState, error) {
	imported, err := ImportSettingsFromJSON(jsonContent)
	if err != nil {
		return a.GetState(), err
	}

	a.mu.Lock()
	if len(imported.ObservedCoins) > 0 {
		a.observedSymbols = make(map[string]bool)
		for _, sym := range imported.ObservedCoins {
			a.observedSymbols[sym] = true
		}
	}

	if imported.CurrentCoin != "" {
		a.currentCoinSymbol = imported.CurrentCoin
		if !a.observedSymbols[a.currentCoinSymbol] {
			a.observedSymbols[a.currentCoinSymbol] = true
		}
	}

	a.activeKeywords = imported.FilterKeywords
	a.alarmEnabled = imported.AlarmEnabled
	a.maxVibrations = imported.MaxVibrations
	a.nightModeEnabled = imported.NightModeEnabled
	if imported.NightModeStart != "" {
		a.nightModeStart = imported.NightModeStart
	}
	if imported.NightModeEnd != "" {
		a.nightModeEnd = imported.NightModeEnd
	}
	if imported.CheckInterval > 0 {
		a.checkInterval = imported.CheckInterval
	}
	if imported.NightCheckInterval > 0 {
		a.nightCheckInterval = imported.NightCheckInterval
	}
	if imported.XCheckInterval > 0 {
		a.xCheckInterval = imported.XCheckInterval
	}
	if imported.XNightCheckInterval > 0 {
		a.xNightCheckInterval = imported.XNightCheckInterval
	}
	if imported.AppLanguage != "" {
		a.currentLanguage = imported.AppLanguage
	}
	if imported.MaxStoredNews > 0 {
		a.maxStoredNews = imported.MaxStoredNews
	}
	a.useInternalBrowser = imported.UseInternalBrowser

	if len(imported.Sources) > 0 {
		a.sources = imported.Sources
		for i := range a.sources {
			a.sources[i].Language = NormalizeSourceLanguage(a.sources[i].Language, a.sources[i].ID, a.sources[i].Name, a.sources[i].URL)
		}
	}

	if len(imported.FavoriteNewsIDs) > 0 {
		a.favoriteIDs = make(map[string]bool)
		for _, id := range imported.FavoriteNewsIDs {
			a.favoriteIDs[id] = true
		}
		for i := range a.allNews {
			a.allNews[i].IsFavorite = a.favoriteIDs[a.allNews[i].ID]
		}
	}

	if len(imported.SeenNewsIDs) > 0 {
		a.seenNewsIDs = make(map[string]bool)
		for _, id := range imported.SeenNewsIDs {
			a.seenNewsIDs[id] = true
		}
		for i := range a.allNews {
			a.allNews[i].IsSeen = a.seenNewsIDs[a.allNews[i].ID]
		}
	}

	if len(imported.SelectedSourceFilters) > 0 {
		a.selectedSourceFilters = imported.SelectedSourceFilters
		if len(a.selectedSourceFilters) == 1 {
			a.activeSourceFilter = a.selectedSourceFilters[0]
		} else {
			a.activeSourceFilter = strings.Join(a.selectedSourceFilters, ", ")
		}
	}

	if imported.CryptoPanicToken != "" {
		a.cryptoPanicToken = imported.CryptoPanicToken
	}
	if imported.DiscordWebhookURL != "" {
		a.discordWebhookURL = strings.TrimSpace(imported.DiscordWebhookURL)
	}
	a.discordWebhookEnabled = imported.DiscordWebhookEnabled && strings.TrimSpace(a.discordWebhookURL) != ""
	if imported.TelegramBotToken != "" {
		a.telegramBotToken = strings.TrimSpace(imported.TelegramBotToken)
	}
	if imported.TelegramChatID != "" {
		a.telegramChatID = strings.TrimSpace(imported.TelegramChatID)
	}
	a.telegramIntegrationEnabled = imported.TelegramIntegrationEnabled && strings.TrimSpace(a.telegramBotToken) != "" && strings.TrimSpace(a.telegramChatID) != ""
	if imported.SlackWebhookURL != "" {
		a.slackWebhookURL = strings.TrimSpace(imported.SlackWebhookURL)
	}
	a.slackWebhookEnabled = imported.SlackWebhookEnabled && strings.TrimSpace(a.slackWebhookURL) != ""

	a.saveSettingsLocked()
	a.mu.Unlock()
	a.triggerPollWake()

	go a.loadDataSync()
	return a.GetState(), nil
}

func (a *App) ExportNewsCSV() (string, error) {
	a.mu.Lock()
	defer a.mu.Unlock()
	return ExportNewsToCSV(a.allNews)
}

func (a *App) ImportNewsCSV(csvContent string) (FullAppState, error) {
	imported, err := ImportNewsFromCSV(csvContent)
	if err != nil {
		return a.GetState(), err
	}
	if len(imported) == 0 {
		return a.GetState(), fmt.Errorf("Brak wiadomości w pliku CSV")
	}

	a.mu.Lock()
	for _, item := range imported {
		a.knownNewsIDs[item.ID] = true
	}
	a.allNews = a.mergeNews(a.allNews, imported)
	a.saveSettingsLocked()
	a.mu.Unlock()

	return a.GetState(), nil
}

func (a *App) ExportSettingsDialog() (string, error) {
	filePath, err := wailsRuntime.SaveFileDialog(a.ctx, wailsRuntime.SaveDialogOptions{
		DefaultFilename: fmt.Sprintf("crypto_settings_%s.json", time.Now().Format("20060102_1504")),
		Title:           "Eksportuj ustawienia (JSON)",
		Filters: []wailsRuntime.FileFilter{
			{DisplayName: "Pliki JSON (*.json)", Pattern: "*.json"},
		},
	})
	if err != nil || filePath == "" {
		return "", err
	}
	jsonStr, err := a.ExportSettingsJSON()
	if err != nil {
		return "", err
	}
	err = os.WriteFile(filePath, []byte(jsonStr), 0644)
	if err != nil {
		return "", err
	}
	return filePath, nil
}

func (a *App) ImportSettingsDialog() (FullAppState, error) {
	filePath, err := wailsRuntime.OpenFileDialog(a.ctx, wailsRuntime.OpenDialogOptions{
		Title: "Importuj ustawienia (JSON)",
		Filters: []wailsRuntime.FileFilter{
			{DisplayName: "Pliki JSON (*.json)", Pattern: "*.json"},
		},
	})
	if err != nil || filePath == "" {
		return a.GetState(), err
	}
	data, err := os.ReadFile(filePath)
	if err != nil {
		return a.GetState(), err
	}
	return a.ImportSettingsJSON(string(data))
}

func (a *App) ExportNewsCsvDialog() (string, error) {
	filePath, err := wailsRuntime.SaveFileDialog(a.ctx, wailsRuntime.SaveDialogOptions{
		DefaultFilename: fmt.Sprintf("crypto_news_%s.csv", time.Now().Format("20060102_1504")),
		Title:           "Eksportuj wiadomości (CSV)",
		Filters: []wailsRuntime.FileFilter{
			{DisplayName: "Pliki CSV (*.csv)", Pattern: "*.csv"},
		},
	})
	if err != nil || filePath == "" {
		return "", err
	}
	csvStr, err := a.ExportNewsCSV()
	if err != nil {
		return "", err
	}
	err = os.WriteFile(filePath, []byte(csvStr), 0644)
	if err != nil {
		return "", err
	}
	return filePath, nil
}

func (a *App) ImportNewsCsvDialog() (FullAppState, error) {
	filePath, err := wailsRuntime.OpenFileDialog(a.ctx, wailsRuntime.OpenDialogOptions{
		Title: "Importuj wiadomości (CSV)",
		Filters: []wailsRuntime.FileFilter{
			{DisplayName: "Pliki CSV (*.csv)", Pattern: "*.csv"},
		},
	})
	if err != nil || filePath == "" {
		return a.GetState(), err
	}
	data, err := os.ReadFile(filePath)
	if err != nil {
		return a.GetState(), err
	}
	return a.ImportNewsCSV(string(data))
}
