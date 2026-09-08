package main

import (
	"context"
	"fmt"
	"math"
	"os/exec"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/pkg/browser"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx           context.Context
	mu            sync.Mutex
	storage       *StorageManager
	feedCli       *FeedClient
	binanceCli    *BinanceClient

	// Internal state
	allNews           []CryptoNewsItem
	sources           []FeedSource
	cryptoPanicToken  string
	pricePoints       []PricePoint
	favoriteIDs       map[string]bool
	allAvailableCoins []CoinInfo
	observedSymbols   map[string]bool
	currentCoinSymbol string
	activeKeywords    []string

	alarmEnabled       bool
	maxVibrations      int
	nightModeEnabled   bool
	nightModeStart     string
	nightModeEnd       string
	currentLanguage    string
	maxStoredNews      int
	useInternalBrowser bool
	alwaysOnTop        bool
	autostart          bool
	windowVisible      bool

	currentTab         AppTab
	settingsSubTab     SettingsSubTab
	activeSourceFilter string
	selectedNewsID     string

	currentPrice       float64
	priceChangePercent float64
	isLiveMarket       bool
	isOffline          bool

	alarmCycle         AlarmCycleState
	alarmTickerStop    chan struct{}
	knownNewsIDs       map[string]bool
	historyClearedAt   int64
}

func NewApp() *App {
	storage := NewStorageManager()
	return &App{
		storage:            storage,
		feedCli:            NewFeedClient(),
		binanceCli:         NewBinanceClient(),
		favoriteIDs:        make(map[string]bool),
		observedSymbols:    make(map[string]bool),
		knownNewsIDs:       make(map[string]bool),
		currentCoinSymbol:  "ADAUSDT",
		activeSourceFilter: "Wszystkie",
		currentTab:         TabChartAndFeed,
		settingsSubTab:     SubTabPairs,
		allAvailableCoins:  DefaultInitialCoins,
		maxVibrations:      10,
		nightModeStart:     "22:00",
		nightModeEnd:       "07:00",
		currentLanguage:    "pl",
		maxStoredNews:      3650,
		useInternalBrowser: false,
		windowVisible:      true,
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
	a.currentLanguage = s.AppLanguage
	a.maxStoredNews = s.MaxStoredNews
	a.useInternalBrowser = s.UseInternalBrowser
	a.alwaysOnTop = s.AlwaysOnTop
	a.autostart = s.Autostart
	a.cryptoPanicToken = s.CryptoPanicToken
	a.sources = s.Sources
	a.historyClearedAt = s.HistoryClearedAt

	// Load news history
	a.knownNewsIDs = make(map[string]bool)
	for _, n := range s.NewsHistory {
		n.IsFavorite = a.favoriteIDs[n.ID]
		a.allNews = append(a.allNews, n)
		a.knownNewsIDs[n.ID] = true
	}

	if a.alwaysOnTop {
		wailsRuntime.WindowSetAlwaysOnTop(a.ctx, true)
	}
}

func (a *App) saveSettingsLocked() {
	favList := make([]string, 0, len(a.favoriteIDs))
	for id := range a.favoriteIDs {
		favList = append(favList, id)
	}

	obsList := make([]string, 0, len(a.observedSymbols))
	for sym := range a.observedSymbols {
		obsList = append(obsList, sym)
	}

	history := a.allNews
	if len(history) > a.maxStoredNews {
		history = history[:a.maxStoredNews]
	}

	settings := &SavedSettings{
		FavoriteNewsIDs:    favList,
		ObservedCoins:      obsList,
		CurrentCoin:        a.currentCoinSymbol,
		FilterKeywords:     a.activeKeywords,
		AlarmEnabled:       a.alarmEnabled,
		MaxVibrations:      a.maxVibrations,
		NightModeEnabled:   a.nightModeEnabled,
		NightModeStart:     a.nightModeStart,
		NightModeEnd:       a.nightModeEnd,
		AppLanguage:        a.currentLanguage,
		MaxStoredNews:      a.maxStoredNews,
		UseInternalBrowser: a.useInternalBrowser,
		AlwaysOnTop:        a.alwaysOnTop,
		Autostart:          a.autostart,
		CryptoPanicToken:   a.cryptoPanicToken,
		Sources:            a.sources,
		NewsHistory:        history,
		HistoryClearedAt:   a.historyClearedAt,
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

	// 2. Fetch Active Feeds
	a.fetchFeedsDirect(false)
}

func (a *App) fetchFeedsDirect(notifyOnNew bool) []CryptoNewsItem {
	a.mu.Lock()
	sourcesToFetch := make([]FeedSource, len(a.sources))
	copy(sourcesToFetch, a.sources)
	token := a.cryptoPanicToken
	clearedAt := a.historyClearedAt
	a.mu.Unlock()

	var wg sync.WaitGroup
	var fetchedLock sync.Mutex
	var accumulated []CryptoNewsItem
	var modifiedSources []FeedSource
	var hasSourceModifications bool

	for _, src := range sourcesToFetch {
		if !src.IsActive {
			modifiedSources = append(modifiedSources, src)
			continue
		}

		wg.Add(1)
		go func(s FeedSource) {
			defer wg.Done()
			items, err := a.feedCli.FetchSource(s, token)
			fetchedLock.Lock()
			defer fetchedLock.Unlock()

			if err == nil {
				accumulated = append(accumulated, items...)
				if s.FailureCount > 0 || s.AutoDisabledAfterFailure {
					s.FailureCount = 0
					s.AutoDisabledAfterFailure = false
					hasSourceModifications = true
				}
				modifiedSources = append(modifiedSources, s)
			} else {
				s.FailureCount++
				hasSourceModifications = true
				if s.FailureCount >= 2 {
					s.IsActive = false
					s.AutoDisabledAfterFailure = true
				}
				modifiedSources = append(modifiedSources, s)
			}
		}(src)
	}

	wg.Wait()

	a.mu.Lock()
	defer a.mu.Unlock()

	if hasSourceModifications {
		a.sources = modifiedSources
		a.saveSettingsLocked()
	}

	// Filter out items older than history clear timestamp
	var eligible []CryptoNewsItem
	for _, n := range accumulated {
		if n.PublishedAtMillis > clearedAt {
			n.IsFavorite = a.favoriteIDs[n.ID]
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
	}

	return newlyArrived
}

func (a *App) mergeNews(existing []CryptoNewsItem, incoming []CryptoNewsItem) []CryptoNewsItem {
	newsMap := make(map[string]CryptoNewsItem)
	for _, n := range existing {
		newsMap[n.ID] = n
	}
	for _, n := range incoming {
		newsMap[n.ID] = n
	}

	merged := make([]CryptoNewsItem, 0, len(newsMap))
	for _, n := range newsMap {
		n.IsFavorite = a.favoriteIDs[n.ID]
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

func (a *App) startPeriodicNewsPolling() {
	ticker := time.NewTicker(45 * time.Second)
	for range ticker.C {
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

func (a *App) applyFilters(list []CryptoNewsItem, sourceFilter string, keywords []string) []CryptoNewsItem {
	var result []CryptoNewsItem
	for _, news := range list {
		matchesSource := true
		if sourceFilter != "Wszystkie" && sourceFilter != "All" && sourceFilter != "Alle" {
			if strings.Contains(strings.ToLower(sourceFilter), "makro") {
				matchesSource = strings.Contains(strings.ToLower(news.Source), "makro") || strings.Contains(strings.ToLower(news.Tag), "makro")
			} else {
				matchesSource = strings.Contains(strings.ToLower(news.Source), strings.ToLower(sourceFilter)) ||
					strings.Contains(strings.ToLower(sourceFilter), strings.ToLower(news.Source))
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

	baseList := a.allNews
	if a.currentTab == TabFavorites {
		var favs []CryptoNewsItem
		for _, n := range a.allNews {
			if n.IsFavorite {
				favs = append(favs, n)
			}
		}
		baseList = favs
	}

	filteredNews := a.applyFilters(baseList, a.activeSourceFilter, a.activeKeywords)

	selectedNewsID := a.selectedNewsID
	if selectedNewsID == "" && len(filteredNews) > 0 {
		selectedNewsID = filteredNews[0].ID
	}

	// Update relative formatted times
	for i := range filteredNews {
		filteredNews[i].FormattedTime = FormatTimeAgo(filteredNews[i].PublishedAtMillis, a.currentLanguage)
	}

	return FullAppState{
		PricePoints:                a.pricePoints,
		NewsList:                   filteredNews,
		SourcesList:                a.sources,
		SelectedCoin:               selectedCoin,
		ObservedCoins:              observedCoins,
		AllAvailableCoins:          a.allAvailableCoins,
		Keywords:                   a.activeKeywords,
		CurrentPrice:               a.currentPrice,
		PriceChangePercent:         a.priceChangePercent,
		SelectedNewsID:             selectedNewsID,
		ActiveSourceFilter:         a.activeSourceFilter,
		CurrentTab:                 a.currentTab,
		SettingsSubTab:             a.settingsSubTab,
		IsOffline:                  a.isOffline,
		IsLiveMarket:               a.isLiveMarket,
		AlarmEnabled:               a.alarmEnabled,
		MaxVibrations:              a.maxVibrations,
		NightModeEnabled:           a.nightModeEnabled,
		NightModeStart:             a.nightModeStart,
		NightModeEnd:               a.nightModeEnd,
		IsNightTimeNow:             a.isNightModeNow(),
		CurrentLanguage:            a.currentLanguage,
		CryptoPanicTokenConfigured: strings.TrimSpace(a.cryptoPanicToken) != "",
		AlarmCycle:                 a.alarmCycle,
		MaxStoredNews:              a.maxStoredNews,
		TotalStoredNewsCount:       len(a.allNews),
		UseInternalBrowser:         a.useInternalBrowser,
		AlwaysOnTop:                a.alwaysOnTop,
		Autostart:                  a.autostart,
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
	a.mu.Lock()
	a.activeSourceFilter = filter
	a.mu.Unlock()
	return a.GetState()
}

func (a *App) SelectNews(newsID string) FullAppState {
	a.mu.Lock()
	a.selectedNewsID = newsID
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

