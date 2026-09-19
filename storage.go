package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sync"
)

type SavedSettings struct {
	FavoriteNewsIDs       []string         `json:"favoriteNewsIds"`
	SeenNewsIDs           []string         `json:"seenNewsIds"`
	SelectedSourceFilters []string         `json:"selectedSourceFilters"`
	ObservedCoins         []string         `json:"observedCoins"`
	CurrentCoin           string           `json:"currentCoin"`
	FilterKeywords        []string         `json:"filterKeywords"`
	AlarmEnabled          bool             `json:"alarmEnabled"`
	MaxVibrations         int              `json:"maxVibrations"`
	NightModeEnabled      bool             `json:"nightModeEnabled"`
	NightModeStart        string           `json:"nightModeStart"`
	NightModeEnd          string           `json:"nightModeEnd"`
	CheckInterval         int              `json:"checkInterval"`
	NightCheckInterval    int              `json:"nightCheckInterval"`
	XCheckInterval        int              `json:"xCheckInterval"`
	XNightCheckInterval   int              `json:"xNightCheckInterval"`
	AppLanguage           string           `json:"appLanguage"`
	MaxStoredNews         int              `json:"maxStoredNews"`
	UseInternalBrowser    bool             `json:"useInternalBrowser"`
	AlwaysOnTop           bool             `json:"alwaysOnTop"`
	Autostart             bool             `json:"autostart"`
	CryptoPanicToken      string           `json:"cryptoPanicToken"`
	XAuthToken            string           `json:"xAuthToken,omitempty"`
	XCT0                  string           `json:"xCt0,omitempty"`
	Sources               []FeedSource     `json:"sources"`
	NewsHistory           []CryptoNewsItem `json:"newsHistory"`
	HistoryClearedAt      int64            `json:"historyClearedAt"`
	WindowWidth           int              `json:"windowWidth,omitempty"`
	WindowHeight          int              `json:"windowHeight,omitempty"`
	ShowChart             bool             `json:"showChart"`
	DeletedNewsIDs        []string         `json:"deletedNewsIds,omitempty"`
}

type StorageManager struct {
	mu           sync.Mutex
	filePath     string
	autostartDir string
}

func (sm *StorageManager) GetSessionPath() string {
	// First check if session.json exists in working directory
	if _, err := os.Stat("session.json"); err == nil {
		return "session.json"
	}
	if sm.filePath != "" && filepath.Dir(sm.filePath) != "." {
		return filepath.Join(filepath.Dir(sm.filePath), "session.json")
	}
	return "session.json"
}

func NewStorageManager() *StorageManager {
	configDir, err := os.UserConfigDir()
	var path string
	var autostartDir string
	if err == nil && configDir != "" {
		appDir := filepath.Join(configDir, "crypto-aggregator-widget")
		os.MkdirAll(appDir, 0755)
		path = filepath.Join(appDir, "settings.json")
		autostartDir = filepath.Join(configDir, "autostart")
		os.MkdirAll(autostartDir, 0755)
	} else {
		path = "widget_settings.json"
	}
	return &StorageManager{
		filePath:     path,
		autostartDir: autostartDir,
	}
}

func (sm *StorageManager) Load() *SavedSettings {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	data, err := os.ReadFile(sm.filePath)
	if err != nil {
		s := sm.defaultSettings()
		s.Autostart = sm.checkAutostartFile()
		return s
	}

	var settings SavedSettings
	if err := json.Unmarshal(data, &settings); err != nil {
		s := sm.defaultSettings()
		s.Autostart = sm.checkAutostartFile()
		return s
	}

	if len(settings.ObservedCoins) == 0 {
		settings.ObservedCoins = []string{"ADAUSDT", "BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT"}
	}
	if settings.CurrentCoin == "" {
		settings.CurrentCoin = "ADAUSDT"
	}
	if settings.AppLanguage == "" {
		settings.AppLanguage = "pl"
	}
	if settings.MaxVibrations <= 0 {
		settings.MaxVibrations = 10
	}
	if settings.NightModeStart == "" {
		settings.NightModeStart = "22:00"
	}
	if settings.NightModeEnd == "" {
		settings.NightModeEnd = "07:00"
	}
	if settings.CheckInterval <= 0 {
		settings.CheckInterval = 60
	}
	if settings.NightCheckInterval <= 0 {
		settings.NightCheckInterval = 900
	}
	if settings.XCheckInterval <= 0 {
		settings.XCheckInterval = 300
	}
	if settings.XNightCheckInterval <= 0 {
		settings.XNightCheckInterval = 600
	}
	if settings.MaxStoredNews <= 0 {
		settings.MaxStoredNews = 3650
	}
	if len(settings.Sources) == 0 {
		settings.Sources = GetDefaultSources()
	} else {
		defSources := GetDefaultSources()
		existingMap := make(map[string]bool)
		defMap := make(map[string]FeedSource)
		for _, defS := range defSources {
			defMap[defS.ID] = defS
		}
		for i := range settings.Sources {
			existingMap[settings.Sources[i].ID] = true
			if defS, ok := defMap[settings.Sources[i].ID]; ok {
				if settings.Sources[i].Type == "" {
					settings.Sources[i].Type = defS.Type
				}
				if settings.Sources[i].Description == "" && defS.Description != "" {
					settings.Sources[i].Description = defS.Description
				}
				if settings.Sources[i].ID == "binance_announcements" && !settings.Sources[i].IsActive {
					settings.Sources[i].IsActive = true
				}
			} else if settings.Sources[i].Type == "" {
				settings.Sources[i].Type = GuessFeedSourceType(settings.Sources[i].URL, settings.Sources[i].ID)
			}
		}
		for _, defS := range defSources {
			if !existingMap[defS.ID] {
				settings.Sources = append(settings.Sources, defS)
			}
		}
	}

	settings.Autostart = sm.checkAutostartFile()

	return &settings
}

func (sm *StorageManager) Save(settings *SavedSettings) error {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	data, err := json.MarshalIndent(settings, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(sm.filePath, data, 0644)
}

func (sm *StorageManager) checkAutostartFile() bool {
	if sm.autostartDir == "" {
		return false
	}
	desktopFile := filepath.Join(sm.autostartDir, "crypto-news-widget.desktop")
	_, err := os.Stat(desktopFile)
	return err == nil
}

func (sm *StorageManager) SetAutostart(enabled bool) error {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	if sm.autostartDir == "" {
		return fmt.Errorf("Brak katalogu autostart")
	}

	desktopFile := filepath.Join(sm.autostartDir, "crypto-news-widget.desktop")
	if !enabled {
		if err := os.Remove(desktopFile); err != nil && !os.IsNotExist(err) {
			return err
		}
		return nil
	}

	execPath, err := os.Executable()
	if err != nil {
		execPath = "/home/ppilat/priv/aggregator/desktop-widget/build/bin/desktop-widget"
	}

	content := fmt.Sprintf(`[Desktop Entry]
Type=Application
Exec=%s
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name=Crypto News Widget
Comment=Crypto News & Market Desktop Widget
`, execPath)

	return os.WriteFile(desktopFile, []byte(content), 0644)
}

func (sm *StorageManager) defaultSettings() *SavedSettings {
	return &SavedSettings{
		FavoriteNewsIDs:       []string{},
		SeenNewsIDs:           []string{},
		SelectedSourceFilters: []string{"Wszystkie"},
		ObservedCoins:         []string{"ADAUSDT", "BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT"},
		CurrentCoin:           "ADAUSDT",
		FilterKeywords:        []string{},
		AlarmEnabled:          true,
		MaxVibrations:         10,
		NightModeEnabled:      true,
		NightModeStart:        "22:00",
		NightModeEnd:          "07:00",
		CheckInterval:         60,
		NightCheckInterval:    900,
		XCheckInterval:        300,
		XNightCheckInterval:   600,
		AppLanguage:           "pl",
		MaxStoredNews:         3650,
		UseInternalBrowser:    false,
		AlwaysOnTop:           false,
		Autostart:             false,
		CryptoPanicToken:      "",
		Sources:               GetDefaultSources(),
		NewsHistory:           []CryptoNewsItem{},
		HistoryClearedAt:      0,
	}
}
