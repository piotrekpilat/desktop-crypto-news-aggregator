// TRANSLATIONS DICTIONARY (PL / EN / DE)
const I18N = {
    pl: {
        alarm_title: "Alarm wibracyjny",
        alarm_active: "Aktywny (max %d powtórzeń)",
        alarm_disabled: "Wyłączony całkowicie",
        alarm_banner_title: "Nowa wiadomość oczekuje",
        alarm_banner_info: "Wibracja %d z %d (kolejna za %ds)",
        alarm_action_seen: "Widziałem",
        night_banner: "🌙 Obowiązuje Tryb Nocny (%s – %s)",
        night_muted: "Wibracje wyciszone",
        news_title: "WIADOMOŚCI (%d)",
        news_hint: "Dotknij newsa, by podświetlić kropkę",
        news_empty: "Brak wiadomości spełniających kryteria filtrów.",
        share_link: "Udostępnij link",
        open_link: "Otwórz link ↗",
        fav_title: "Ulubione Wiadomości (%d)",
        fav_empty_title: "Brak zapisanych wiadomości",
        fav_empty_desc: "Kliknij ikonkę gwiazdki na karcie newsa, aby dodać go tutaj.",
        settings_title: "Ustawienia Aplikacji",
        tab_pairs: "🪙 Pary",
        tab_sources: "📡 Źródła",
        tab_app_config: "⚙️ Aplikacja & Noc",
        pairs_header: "OBSERWOWANE PARY (%d / %d z Binance)",
        pairs_fetch_btn: "Pobierz pary 🔄",
        pairs_search_placeholder: "Szukaj pary (np. BTC, ADA, SOL, PEPE)...",
        sources_title: "GŁÓWNE ŹRÓDŁA NEWSÓW & RSS / ATOM",
        telegram_sources_title: "KANAŁY TELEGRAM (PUBLICZNE)",
        btn_add_tg: "+ Dodaj kanał",
        btn_add_rss: "+ Dodaj RSS / Atom",
        cp_token_title: "Token API CryptoPanic",
        cp_token_desc: "Token jest bezpiecznie zapisany. Zapis aktywuje źródło CryptoPanic.",
        cp_token_placeholder: "Wklej token API",
        cp_token_save: "Zapisz i aktywuj",
        cp_token_remove: "Usuń token",
        section_alarm: "ALARM WIBRACYJNY & CYKLE",
        alarm_row_title: "Alarm wibracyjny",
        alarm_row_desc: "Wibracje / dźwięk po odebraniu nowych newsów",
        alarm_repeats_title: "Ilość powtórzeń wibracji",
        alarm_repeats_desc: "Maksymalna liczba powtórzeń co 60s",
        section_night: "PORY NOCNE (CICHE GODZINY)",
        night_enable: "Włącz tryb nocny",
        night_enable_desc: "Całkowicie blokuje wibracje w nocy",
        night_start: "Godzina rozpoczęcia (Od)",
        night_end: "Godzina zakończenia (Do)",
        section_lang: "JĘZYK APLIKACJI",
        browser_title: "Używaj wewnętrznej przeglądarki",
        browser_desc: "Otwieraj linki wewnątrz aplikacji bez przełączania",
        autostart_title: "Autostart przy uruchomieniu systemu",
        autostart_desc: "Automatyczny start widgetu po zalogowaniu",
        section_history: "KASOWANIE I HISTORIA NEWSÓW",
        history_desc: "Newsy są zapisywane lokalnie (zapisano: %d / limit: %d).",
        history_max_title: "Maksymalna liczba newsów",
        history_max_desc: "Limit przechowywanych wiadomości w pamięci",
        history_clear_btn: "Wyczyść historię",
        history_clear_title: "Wyczyścić historię newsów?",
        history_clear_msg: "Ta operacja trwale usunie lokalnie zapisane newsy. Ulubione i ustawienia źródeł pozostaną bez zmian.",
        section_import_export: "IMPORT / EKSPORT DANYCH",
        import_export_desc: "Kopia zapasowa konfiguracji (JSON) oraz wiadomości (CSV).",
        btn_export_settings: "Eksportuj ustawienia",
        btn_export_settings_sub: "Plik .json z konfiguracją",
        btn_import_settings: "Importuj ustawienia",
        btn_import_settings_sub: "Wczytaj plik .json",
        btn_export_news: "Eksportuj wiadomości",
        btn_export_news_sub: "Plik .csv ze wszystkimi polami",
        btn_import_news: "Importuj wiadomości",
        btn_import_news_sub: "Wczytaj i dołącz z pliku .csv",
        status_binance_ok: "Połączono (%d par z API)",
        status_binance_off: "Tryb offline",
        status_backend_ok: "Źródła RSS: Aktywne & Live",
        filter_all: "Wszystkie",
        kw_none: "Brak filtrów słów kluczowych",
        kw_add_btn: "+ Słowo",
        kw_dialog_title: "Dodaj filtr słowa kluczowego",
        kw_dialog_placeholder: "np. hack, etf, upgrade, btc",
        btn_cancel: "Anuluj",
        btn_add: "Dodaj",
        btn_save: "Zapisz",
        btn_clear: "Wyczyść",
        nav_chart: "Wykres & News",
        nav_feed: "Tylko Feed",
        nav_fav: "Ulubione",
        nav_settings: "Ustawienia",
        macro_forecast: "Prognoza:",
        macro_previous: "Poprzedni:"
    },
    en: {
        alarm_title: "Vibration Alarm",
        alarm_active: "Active (max %d repeats)",
        alarm_disabled: "Disabled",
        alarm_banner_title: "New message waiting",
        alarm_banner_info: "Vibration %d of %d (next in %ds)",
        alarm_action_seen: "Seen",
        night_banner: "🌙 Night Mode Active (%s – %s)",
        night_muted: "Vibrations muted",
        news_title: "NEWS (%d)",
        news_hint: "Tap news to highlight dot",
        news_empty: "No news matching filter criteria.",
        share_link: "Share link",
        open_link: "Open link ↗",
        fav_title: "Favorite News (%d)",
        fav_empty_title: "No saved news",
        fav_empty_desc: "Click the star icon on any news card to add it here.",
        settings_title: "App Settings",
        tab_pairs: "🪙 Pairs",
        tab_sources: "📡 Sources",
        tab_app_config: "⚙️ App & Night",
        pairs_header: "OBSERVED PAIRS (%d / %d from Binance)",
        pairs_fetch_btn: "Fetch pairs 🔄",
        pairs_search_placeholder: "Search crypto pair (e.g. BTC, ADA, SOL)...",
        sources_title: "MAIN NEWS & RSS / ATOM SOURCES",
        telegram_sources_title: "TELEGRAM CHANNELS (PUBLIC)",
        btn_add_tg: "+ Add channel",
        btn_add_rss: "+ Add RSS / Atom",
        cp_token_title: "CryptoPanic API token",
        cp_token_desc: "Token is securely saved on this device. Saving activates CryptoPanic.",
        cp_token_placeholder: "Paste API token",
        cp_token_save: "Save & activate",
        cp_token_remove: "Remove token",
        section_alarm: "VIBRATION ALARM & CYCLES",
        alarm_row_title: "Vibration Alarm",
        alarm_row_desc: "Vibration / sound on new news arrival",
        alarm_repeats_title: "Vibration repetitions count",
        alarm_repeats_desc: "Max vibration count every 60s",
        section_night: "NIGHT MODE (SILENT HOURS)",
        night_enable: "Enable night mode",
        night_enable_desc: "Completely mutes vibrations at night",
        night_start: "Start time (From)",
        night_end: "End time (To)",
        section_lang: "LANGUAGE",
        browser_title: "Use internal browser",
        browser_desc: "Open news links inside app without switching",
        autostart_title: "Launch at system startup",
        autostart_desc: "Automatically start widget when you log in",
        section_history: "NEWS RETENTION & HISTORY",
        history_desc: "News are saved locally (stored: %d / limit: %d).",
        history_max_title: "Max stored news limit",
        history_max_desc: "Maximum number of news kept in local memory",
        history_clear_btn: "Clear history",
        history_clear_title: "Clear news history?",
        history_clear_msg: "This permanently removes locally saved news. Favorites and source settings will remain.",
        section_import_export: "IMPORT & EXPORT DATA",
        import_export_desc: "Backup configuration (JSON) and news history (CSV).",
        btn_export_settings: "Export settings",
        btn_export_settings_sub: "Configuration .json file",
        btn_import_settings: "Import settings",
        btn_import_settings_sub: "Load .json file",
        btn_export_news: "Export news",
        btn_export_news_sub: "Complete .csv file with all fields",
        btn_import_news: "Import news",
        btn_import_news_sub: "Load and append from .csv file",
        status_binance_ok: "Connected (%d pairs from API)",
        status_binance_off: "Offline mode",
        status_backend_ok: "Direct Feeds: Active & Live",
        filter_all: "All",
        kw_none: "No keyword filters",
        kw_add_btn: "+ Keyword",
        kw_dialog_title: "Add Keyword Filter",
        kw_dialog_placeholder: "e.g. hack, etf, upgrade, btc",
        btn_cancel: "Cancel",
        btn_add: "Add",
        btn_save: "Save",
        btn_clear: "Clear",
        nav_chart: "Chart & News",
        nav_feed: "Feed Only",
        nav_fav: "Favorites",
        nav_settings: "Settings",
        macro_forecast: "Forecast:",
        macro_previous: "Previous:"
    },
    de: {
        alarm_title: "Vibrationsalarm",
        alarm_active: "Aktiv (max. %d Wiederholungen)",
        alarm_disabled: "Deaktiviert",
        alarm_banner_title: "Neue Nachricht wartet",
        alarm_banner_info: "Vibration %d von %d (nächste in %ds)",
        alarm_action_seen: "Gesehen",
        night_banner: "🌙 Nachtmodus Aktiv (%s – %s)",
        night_muted: "Vibrationen stummgeschaltet",
        news_title: "NACHRICHTEN (%d)",
        news_hint: "Tippen Sie auf News, um Punkt hervorzuheben",
        news_empty: "Keine Nachrichten entsprechen den Filterkriterien.",
        share_link: "Link teilen",
        open_link: "Link öffnen ↗",
        fav_title: "Favoriten (%d)",
        fav_empty_title: "Keine gespeicherten Nachrichten",
        fav_empty_desc: "Klicken Sie auf den Stern bei einer Nachricht, um sie hier zu speichern.",
        settings_title: "Einstellungen",
        tab_pairs: "🪙 Paare",
        tab_sources: "📡 Quellen",
        tab_app_config: "⚙️ App & Nacht",
        pairs_header: "BEOBACHTETE PAARE (%d / %d von Binance)",
        pairs_fetch_btn: "Paare laden 🔄",
        pairs_search_placeholder: "Kryptopaar suchen (z.B. BTC, ADA, SOL)...",
        sources_title: "HAUPTNACHRICHTEN & RSS / ATOM-QUELLEN",
        telegram_sources_title: "TELEGRAM-KANÄLE (ÖFFENTLICH)",
        btn_add_tg: "+ Kanal hinzufügen",
        btn_add_rss: "+ RSS / Atom hinzufügen",
        cp_token_title: "CryptoPanic API Token",
        cp_token_desc: "Token wird sicher gespeichert. Speichern aktiviert CryptoPanic.",
        cp_token_placeholder: "API-Token einfügen",
        cp_token_save: "Speichern & Aktivieren",
        cp_token_remove: "Token entfernen",
        section_alarm: "VIBRATIONSALARM & ZYKLEN",
        alarm_row_title: "Vibrationsalarm",
        alarm_row_desc: "Vibration / Ton beim Empfang neuer Nachrichten",
        alarm_repeats_title: "Anzahl Wiederholungen",
        alarm_repeats_desc: "Maximale Wiederholungen alle 60 Sek.",
        section_night: "NACHTMODUS (RUHEZEIT)",
        night_enable: "Nachtmodus aktivieren",
        night_enable_desc: "Deaktiviert Vibrationen nachts komplett",
        night_start: "Startzeit (Von)",
        night_end: "Endzeit (Bis)",
        section_lang: "SPRACHE",
        browser_title: "Internen Browser nutzen",
        browser_desc: "Links direkt in der App ohne App-Wechsel öffnen",
        autostart_title: "Mit dem System starten (Autostart)",
        autostart_desc: "Widget beim Anmelden automatisch starten",
        section_history: "NACHRICHTEN-VERLAUF & LIMIT",
        history_desc: "Nachrichten lokal gespeichert (gespeichert: %d / Limit: %d).",
        history_max_title: "Max. gespeicherte Nachrichten",
        history_max_desc: "Maximales Limit für den lokalen Speicher",
        history_clear_btn: "Verlauf löschen",
        history_clear_title: "Verlauf wirklich löschen?",
        history_clear_msg: "Dies löscht gespeicherte Nachrichten dauerhaft. Favoriten bleiben erhalten.",
        section_import_export: "DATEN IMPORTIEREN & EXPORTIEREN",
        import_export_desc: "Sicherungskopie der Einstellungen (JSON) und Nachrichten (CSV).",
        btn_export_settings: "Einstellungen exportieren",
        btn_export_settings_sub: "Konfigurationsdatei (.json)",
        btn_import_settings: "Einstellungen importieren",
        btn_import_settings_sub: ".json-Datei laden",
        btn_export_news: "Nachrichten exportieren",
        btn_export_news_sub: "Vollständige .csv-Datei mit allen Feldern",
        btn_import_news: "Nachrichten importieren",
        btn_import_news_sub: "Aus .csv laden und anhängen",
        status_binance_ok: "Verbunden (%d Paare von API)",
        status_binance_off: "Offline-Modus",
        status_backend_ok: "RSS-Feeds: Aktiv & Live",
        filter_all: "Alle",
        kw_none: "Keine Keyword-Filter",
        kw_add_btn: "+ Keyword",
        kw_dialog_title: "Keyword-Filter hinzufügen",
        kw_dialog_placeholder: "z.B. hack, etf, upgrade, btc",
        btn_cancel: "Abbrechen",
        btn_add: "Hinzufügen",
        btn_save: "Speichern",
        btn_clear: "Löschen",
        nav_chart: "Chart & News",
        nav_feed: "Nur Feed",
        nav_fav: "Favoriten",
        nav_settings: "Einstellungen",
        macro_forecast: "Prognose:",
        macro_previous: "Vorherig:"
    }
};

let currentAppState = null;
let animationFrameId = null;
let chartAnimationStartTime = performance.now();
let pairSearchQuery = "";

// Web Audio API Alarm Sound
function playAlarmSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
    } catch(e) {}
}

// Translation Helper
function t(key, ...args) {
    const lang = (currentAppState && currentAppState.currentLanguage) || 'pl';
    const dict = I18N[lang] || I18N.pl;
    let str = dict[key] || I18N.pl[key] || key;
    args.forEach(arg => {
        str = str.replace(/%[ds]/, arg);
    });
    return str;
}

// =========================================================================
// RENDER FULL APPLICATION STATE
// =========================================================================
function renderState(state) {
    if (!state) return;
    currentAppState = state;

    // 1. Desktop Window Controls & Always On Top
    const btnPin = document.getElementById('btnAlwaysOnTop');
    if (state.alwaysOnTop) {
        btnPin.classList.add('pinned');
    } else {
        btnPin.classList.remove('pinned');
    }

    // 2. Global Alarm Toggle Bar
    const chkAlarm = document.getElementById('chkAlarmToggle');
    chkAlarm.checked = state.alarmEnabled;
    document.getElementById('txtAlarmTitle').innerText = t('alarm_title');
    const txtAlarmStatus = document.getElementById('txtAlarmStatus');
    const iconBox = document.getElementById('alarmIconBox');
    if (state.alarmEnabled) {
        txtAlarmStatus.innerText = t('alarm_active', state.maxVibrations);
        txtAlarmStatus.classList.remove('disabled');
        iconBox.classList.remove('disabled');
    } else {
        txtAlarmStatus.innerText = t('alarm_disabled');
        txtAlarmStatus.classList.add('disabled');
        iconBox.classList.add('disabled');
    }

    // 3. Night Mode Banner
    const nightBar = document.getElementById('nightModeBar');
    if (state.nightModeEnabled && state.isNightTimeNow) {
        nightBar.style.display = 'flex';
        document.getElementById('txtNightModeBanner').innerText = t('night_banner', state.nightModeStart, state.nightModeEnd);
        document.getElementById('txtNightModeMuted').innerText = t('night_muted');
    } else {
        nightBar.style.display = 'none';
    }

    // 4. Active Alarm Banner
    const activeBanner = document.getElementById('activeAlarmBanner');
    document.getElementById('btnAcknowledgeAlarm').innerText = t('alarm_action_seen');
    if (state.alarmCycle && state.alarmCycle.isActive && !state.alarmCycle.acknowledged && state.alarmEnabled && !state.isNightTimeNow) {
        activeBanner.style.display = 'flex';
        document.getElementById('txtAlarmBannerTitle').innerText = t('alarm_banner_title');
        document.getElementById('txtAlarmBannerInfo').innerText = t('alarm_banner_info', state.alarmCycle.vibrationCount, state.alarmCycle.maxVibrations, state.alarmCycle.secondsRemaining);
    } else {
        activeBanner.style.display = 'none';
    }

    // 5. Coin Header & Dropdown
    if (state.selectedCoin) {
        document.getElementById('currentCoinBadge').style.background = state.selectedCoin.colorHex;
        document.getElementById('currentCoinBadge').innerText = state.selectedCoin.iconSymbol;
        document.getElementById('currentCoinPair').innerText = `${state.selectedCoin.baseAsset} / ${state.selectedCoin.quoteAsset}`;
    }

    const priceVal = state.currentPrice;
    document.getElementById('currentPriceVal').innerText = priceVal < 1.0 ? `$${priceVal.toFixed(4)}` : `$${priceVal.toFixed(2)}`;
    const changePct = state.priceChangePercent;
    const isPos = changePct >= 0;
    const changeColor = isPos ? '#00FF88' : '#FF3366';
    document.getElementById('currentPriceVal').style.color = changeColor;
    document.getElementById('currentPriceChange').style.color = changeColor;
    document.getElementById('priceChangeText').innerText = `${isPos ? '+' : ''}${changePct.toFixed(2)}% 24h`;
    document.getElementById('liveMarketDot').style.display = state.isLiveMarket ? 'inline-block' : 'none';

    renderCoinDropdown(state.observedCoins || []);

    // 6. Keywords Bar
    renderKeywords(state.keywords || []);

    // 7. Sources Filter Chips
    renderSourceChips(state.sourcesList || [], state.activeSourceFilter);

    // 8. News Header & List
    const newsList = state.newsList || [];
    document.getElementById('txtNewsCount').innerText = t('news_title', newsList.length);
    document.getElementById('txtNewsHint').innerText = t('news_hint');
    renderNewsCards(newsList, state.selectedNewsID, document.getElementById('newsCardsList'));

    // 9. Favorites Tab
    document.getElementById('txtFavCount').innerText = t('fav_title', newsList.length);
    if (state.currentTab === 'FAVORITES') {
        renderNewsCards(newsList, state.selectedNewsID, document.getElementById('favCardsList'), true);
    }

    // 10. Settings Tab
    renderSettingsView(state);

    // 11. Navigation Bar Active Tab
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-tab') === state.currentTab) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    document.getElementById('lblNavChart').innerText = t('nav_chart');
    document.getElementById('lblNavFeed').innerText = t('nav_feed');
    document.getElementById('lblNavFav').innerText = t('nav_fav');
    document.getElementById('lblNavSettings').innerText = t('nav_settings');

    // Switch visible view tab
    const viewFeed = document.getElementById('viewFeed');
    const chartSection = document.getElementById('chartSection');
    const viewFavorites = document.getElementById('viewFavorites');
    const viewSettings = document.getElementById('viewSettings');

    viewFeed.style.display = 'none';
    viewFavorites.style.display = 'none';
    viewSettings.style.display = 'none';

    if (state.currentTab === 'CHART_AND_FEED') {
        viewFeed.style.display = 'flex';
        chartSection.style.display = 'block';
    } else if (state.currentTab === 'FEED_ONLY') {
        viewFeed.style.display = 'flex';
        chartSection.style.display = 'none';
    } else if (state.currentTab === 'FAVORITES') {
        viewFavorites.style.display = 'flex';
    } else if (state.currentTab === 'SETTINGS') {
        viewSettings.style.display = 'flex';
    }

    // Request chart redraw
    if (state.currentTab === 'CHART_AND_FEED') {
        requestAnimationFrame(renderChart);
    }
}

// Render Coin Dropdown Menu
function renderCoinDropdown(observedCoins) {
    const menu = document.getElementById('coinDropdownMenu');
    menu.innerHTML = '';
    observedCoins.forEach(coin => {
        const item = document.createElement('div');
        item.className = 'coin-dropdown-item';
        item.innerHTML = `
            <div class="coin-badge" style="background: ${coin.colorHex}; font-size: 10px; width: 18px; height: 18px;">${coin.iconSymbol}</div>
            <div class="dropdown-item-info">
                <div class="item-symbol">${coin.baseAsset} / ${coin.quoteAsset}</div>
                <div class="item-name">${coin.name}</div>
            </div>
        `;
        item.onclick = (e) => {
            e.stopPropagation();
            menu.classList.remove('open');
            window.go.main.App.SelectCoin(coin.symbol).then(renderState);
        };
        menu.appendChild(item);
    });
}

// Render Keywords Bar
function renderKeywords(keywords) {
    const list = document.getElementById('keywordsList');
    list.innerHTML = '';
    document.getElementById('btnAddKeyword').innerText = t('kw_add_btn');

    if (!keywords || keywords.length === 0) {
        const span = document.createElement('span');
        span.className = 'keyword-empty-hint';
        span.innerText = t('kw_none');
        list.appendChild(span);
        return;
    }

    keywords.forEach(kw => {
        const pill = document.createElement('div');
        pill.className = 'keyword-pill';
        pill.innerHTML = `
            <span>${escapeHtml(kw)}</span>
            <span class="btn-remove-kw">✕</span>
        `;
        pill.querySelector('.btn-remove-kw').onclick = () => {
            window.go.main.App.RemoveKeyword(kw).then(renderState);
        };
        list.appendChild(pill);
    });
}

// Render Source Chips Bar
function renderSourceChips(sources, activeFilter) {
    const bar = document.getElementById('sourcesChipsBar');
    bar.innerHTML = '';

    const allChip = document.createElement('div');
    allChip.className = `source-chip ${activeFilter === 'Wszystkie' || activeFilter === 'All' || activeFilter === 'Alle' ? 'active' : ''}`;
    allChip.innerText = t('filter_all');
    allChip.onclick = () => {
        window.go.main.App.SetSourceFilter('Wszystkie').then(renderState);
    };
    bar.appendChild(allChip);

    const sorted = [...sources].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(src => {
        const chip = document.createElement('div');
        const isSel = activeFilter === src.name;
        chip.className = `source-chip ${isSel ? 'active' : ''}`;
        chip.innerHTML = `
            ${!src.isActive ? '<span class="chip-dot" style="background: #6B7280;"></span>' : ''}
            <span>${escapeHtml(src.name)}</span>
        `;
        chip.onclick = () => {
            window.go.main.App.SetSourceFilter(src.name).then(renderState);
        };
        bar.appendChild(chip);
    });
}

// Render News Cards
function renderNewsCards(newsList, selectedNewsId, container, isFavoritesTab = false) {
    container.innerHTML = '';

    if (!newsList || newsList.length === 0) {
        const emptyBox = document.createElement('div');
        emptyBox.className = 'empty-state-box';
        if (isFavoritesTab) {
            emptyBox.innerHTML = `
                <div class="empty-icon">⭐</div>
                <div class="empty-title">${t('fav_empty_title')}</div>
                <div class="empty-sub">${t('fav_empty_desc')}</div>
            `;
        } else {
            emptyBox.innerHTML = `
                <div class="empty-title" style="color: #8B949E; font-size: 13px;">${t('news_empty')}</div>
            `;
        }
        container.appendChild(emptyBox);
        return;
    }

    newsList.forEach(news => {
        const card = document.createElement('div');
        const isSelected = news.id === selectedNewsId;
        card.className = `news-card ${isSelected ? 'selected' : ''}`;
        card.id = `news-card-${news.id}`;

        let macroHtml = '';
        if (news.description && news.description.startsWith('PROGNOZA:')) {
            const parts = news.description.split('|').map(s => s.trim());
            const fcast = (parts[0] || '').replace('PROGNOZA:', '').trim() || '-';
            const prev = (parts[1] || '').replace('POPRZEDNI:', '').trim() || '-';
            macroHtml = `
                <div class="macro-box">
                    <div class="macro-item">
                        <span class="label">${t('macro_forecast')}</span>
                        <span class="val-cyan">${escapeHtml(fcast)}</span>
                    </div>
                    <div class="macro-divider"></div>
                    <div class="macro-item">
                        <span class="label">${t('macro_previous')}</span>
                        <span class="val-gray">${escapeHtml(prev)}</span>
                    </div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="card-top-row">
                <div class="card-source-badge" style="color: ${news.colorHex};">
                    <span class="card-source-dot" style="background: ${news.colorHex};"></span>
                    <span>${escapeHtml(news.source)}</span>
                </div>
                <div class="card-meta-right">
                    <span class="card-time">${escapeHtml(news.formattedTime)}</span>
                    <button class="btn-fav-star ${news.isFavorite ? 'active' : ''}" title="Ulubione">
                        ${news.isFavorite ? '★' : '☆'}
                    </button>
                </div>
            </div>
            <div class="card-title">${escapeHtml(news.title)}</div>
            ${macroHtml}
            <div class="card-bottom-row">
                <div class="card-tag">${escapeHtml(news.tag)}</div>
                ${news.url ? `
                    <div class="card-links-row">
                        <span class="link-btn-share">${t('share_link')}</span>
                        <span class="link-btn-open">${t('open_link')}</span>
                    </div>
                ` : ''}
            </div>
        `;

        card.onclick = () => {
            window.go.main.App.SelectNews(news.id).then(renderState);
        };

        const favBtn = card.querySelector('.btn-fav-star');
        favBtn.onclick = (e) => {
            e.stopPropagation();
            window.go.main.App.ToggleFavorite(news.id).then(renderState);
        };

        const shareBtn = card.querySelector('.link-btn-share');
        if (shareBtn) {
            shareBtn.onclick = (e) => {
                e.stopPropagation();
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(news.url);
                    shareBtn.innerText = 'Skopiowano!';
                    setTimeout(() => { shareBtn.innerText = t('share_link'); }, 1500);
                }
            };
        }

        const openBtn = card.querySelector('.link-btn-open');
        if (openBtn) {
            openBtn.onclick = (e) => {
                e.stopPropagation();
                openNewsUrl(news.url, news.title);
            };
        }

        container.appendChild(card);
    });
}

// Open URL handler (Always External Browser on Desktop)
function openNewsUrl(url, title) {
    if (!url) return;
    if (window.go && window.go.main && window.go.main.App && window.go.main.App.OpenExternalUrl) {
        window.go.main.App.OpenExternalUrl(url);
    } else {
        window.open(url, '_blank');
    }
}

// =========================================================================
// 📈 CLEAN INTERACTIVE CANVAS CHART
// =========================================================================
function renderChart() {
    const canvas = document.getElementById('priceChartCanvas');
    if (!canvas || !currentAppState || !currentAppState.pricePoints || currentAppState.pricePoints.length === 0) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const points = currentAppState.pricePoints;
    const newsList = currentAppState.newsList || [];
    const selectedNewsId = currentAppState.selectedNewsID;

    let minPrice = Infinity, maxPrice = -Infinity;
    let minTime = Infinity, maxTime = -Infinity;

    points.forEach(pt => {
        if (pt.price < minPrice) minPrice = pt.price;
        if (pt.price > maxPrice) maxPrice = pt.price;
        if (pt.timestamp < minTime) minTime = pt.timestamp;
        if (pt.timestamp > maxTime) maxTime = pt.timestamp;
    });

    const timeRange = maxTime > minTime ? maxTime - minTime : 1;
    const priceRange = maxPrice > minPrice ? maxPrice - minPrice : 1;

    // Map functions
    function getX(time) {
        return ((time - minTime) / timeRange) * width;
    }
    function getY(price) {
        return height - (((price - minPrice) / priceRange) * (height - 30)) - 15;
    }

    // 1. Draw Area Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(0, 229, 255, 0.25)');
    grad.addColorStop(1, 'rgba(0, 229, 255, 0.0)');

    ctx.beginPath();
    points.forEach((pt, idx) => {
        const x = getX(pt.timestamp);
        const y = getY(pt.price);
        if (idx === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // 2. Draw Price Line
    ctx.beginPath();
    points.forEach((pt, idx) => {
        const x = getX(pt.timestamp);
        const y = getY(pt.price);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#00E5FF';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 3. Draw Dots for News Items
    const now = performance.now();
    const elapsed = (now - chartAnimationStartTime) % 1300;
    const pulseFraction = elapsed / 1300;
    const pulseRadius = 6 + (18 - 6) * pulseFraction;
    const pulseAlpha = 0.85 * (1 - pulseFraction);

    newsList.forEach(news => {
        const x = getX(news.publishedAtMillis);
        const y = getY(news.associatedPrice || minPrice);
        const isSelected = news.id === selectedNewsId;
        const color = news.colorHex || '#00E5FF';

        if (isSelected) {
            // Outer pulsing ripple
            ctx.beginPath();
            ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.globalAlpha = pulseAlpha;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.globalAlpha = 1.0;

            // Middle solid circle
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            // Inner dark center
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#0B0E14';
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(x, y, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#0B0E14';
            ctx.fill();
        }
    });

    if (currentAppState.currentTab === 'CHART_AND_FEED') {
        animationFrameId = requestAnimationFrame(renderChart);
    }
}

// Chart Click detection
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('priceChartCanvas');
    if (canvas) {
        canvas.addEventListener('click', (e) => {
            if (!currentAppState || !currentAppState.newsList || currentAppState.newsList.length === 0) return;
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const points = currentAppState.pricePoints;
            let minPrice = Infinity, maxPrice = -Infinity;
            let minTime = Infinity, maxTime = -Infinity;
            points.forEach(pt => {
                if (pt.price < minPrice) minPrice = pt.price;
                if (pt.price > maxPrice) maxPrice = pt.price;
                if (pt.timestamp < minTime) minTime = pt.timestamp;
                if (pt.timestamp > maxTime) maxTime = pt.timestamp;
            });
            const timeRange = maxTime > minTime ? maxTime - minTime : 1;
            const priceRange = maxPrice > minPrice ? maxPrice - minPrice : 1;

            const width = rect.width;
            const height = rect.height;

            let closestNews = null;
            let minDistance = 40; // 40px radius

            currentAppState.newsList.forEach(news => {
                const x = ((news.publishedAtMillis - minTime) / timeRange) * width;
                const y = height - (((news.associatedPrice - minPrice) / priceRange) * (height - 30)) - 15;
                const dist = Math.hypot(x - clickX, y - clickY);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestNews = news;
                }
            });

            if (closestNews) {
                window.go.main.App.SelectNews(closestNews.id).then(renderState);
                const el = document.getElementById(`news-card-${closestNews.id}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});

// =========================================================================
// ⚙️ RENDER SETTINGS VIEW & SUBTABS
// =========================================================================
function renderSettingsView(state) {
    document.getElementById('txtSettingsTitle').innerText = t('settings_title');
    document.getElementById('tabNavPairs').innerText = t('tab_pairs');
    document.getElementById('tabNavSources').innerText = t('tab_sources');
    document.getElementById('tabNavAppConfig').innerText = t('tab_app_config');

    // Subtabs switcher
    document.querySelectorAll('.subtab-item').forEach(item => {
        if (item.getAttribute('data-subtab') === state.settingsSubTab) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const subPairs = document.getElementById('subtabContentPairs');
    const subSources = document.getElementById('subtabContentSources');
    const subApp = document.getElementById('subtabContentAppConfig');

    subPairs.style.display = 'none';
    subSources.style.display = 'none';
    subApp.style.display = 'none';

    if (state.settingsSubTab === 'PAIRS') {
        subPairs.style.display = 'flex';
        renderPairsSubtab(state);
    } else if (state.settingsSubTab === 'SOURCES') {
        subSources.style.display = 'flex';
        renderSourcesSubtab(state);
    } else if (state.settingsSubTab === 'APP_CONFIG') {
        subApp.style.display = 'flex';
        renderAppConfigSubtab(state);
    }
}

// 1. Pairs Subtab
function renderPairsSubtab(state) {
    const obsCount = (state.observedCoins || []).length;
    const allCount = (state.allAvailableCoins || []).length;
    document.getElementById('txtObservedPairsHeader').innerText = t('pairs_header', obsCount, allCount);
    document.getElementById('btnFetchPairs').innerText = t('pairs_fetch_btn');
    document.getElementById('inputPairSearch').placeholder = t('pairs_search_placeholder');

    const container = document.getElementById('pairsListContainer');
    container.innerHTML = '';

    const query = pairSearchQuery.toLowerCase().trim();
    const filtered = (state.allAvailableCoins || []).filter(c => {
        if (!query) return true;
        return c.symbol.toLowerCase().includes(query) ||
               c.baseAsset.toLowerCase().includes(query) ||
               c.name.toLowerCase().includes(query);
    });

    filtered.slice(0, 60).forEach(coin => {
        const isObserved = (state.observedCoins || []).some(o => o.symbol === coin.symbol);
        const row = document.createElement('div');
        row.className = 'pair-manage-row';
        row.innerHTML = `
            <div class="pair-info-group">
                <div class="coin-badge" style="background: ${coin.colorHex}; font-size: 11px; width: 22px; height: 22px;">${coin.iconSymbol}</div>
                <div>
                    <div class="pair-sym-text">${coin.baseAsset} / ${coin.quoteAsset}</div>
                    <div class="pair-name-text">${escapeHtml(coin.name)}</div>
                </div>
            </div>
            <input type="checkbox" class="custom-checkbox" ${isObserved ? 'checked' : ''}>
        `;
        row.onclick = () => {
            window.go.main.App.ToggleObservedCoin(coin.symbol).then(renderState);
        };
        row.querySelector('input').onclick = (e) => {
            e.stopPropagation();
            window.go.main.App.ToggleObservedCoin(coin.symbol).then(renderState);
        };
        container.appendChild(row);
    });
}

// 2. Sources Subtab
function renderSourcesSubtab(state) {
    document.getElementById('txtSourcesTitle').innerText = t('sources_title');
    document.getElementById('txtTelegramSourcesTitle').innerText = t('telegram_sources_title');
    document.getElementById('btnAddTelegramSource').innerText = t('btn_add_tg');
    document.getElementById('btnAddRssSource').innerText = t('btn_add_rss');

    const tgContainer = document.getElementById('telegramSourcesManageList');
    const genContainer = document.getElementById('sourcesManageList');
    tgContainer.innerHTML = '';
    genContainer.innerHTML = '';

    const allSources = state.sourcesList || [];
    const tgSources = allSources.filter(s => s.id.startsWith('tg_') || s.url.includes('t.me/')).sort((a, b) => a.name.localeCompare(b.name));
    const genSources = allSources.filter(s => !s.id.startsWith('tg_') && !s.url.includes('t.me/')).sort((a, b) => a.name.localeCompare(b.name));

    const defaultIds = ['llama_hacks', 'tg_binance', 'tg_whale', 'tg_unfolded', 'tg_wu', 'cd_rss', 'ct_rss', 'cp_api', 'cs_rss', 'dc_rss', 'iog_news', 'rd_rss', 'ut_rss', 'macro_cal'];

    function createSourceCard(src, isTg) {
        const card = document.createElement('div');
        card.className = 'source-card';
        const isCustom = !defaultIds.includes(src.id);

        let cpTokenHtml = '';
        if (src.id === 'cp_api' && src.isActive) {
            cpTokenHtml = `
                <div class="cryptopanic-token-area">
                    <div class="setting-label">${t('cp_token_title')}</div>
                    <div class="setting-desc">${t('cp_token_desc')}</div>
                    <div class="token-input-row">
                        <input type="password" class="token-input" id="inputCpToken" placeholder="${t('cp_token_placeholder')}" value="${state.cryptoPanicTokenConfigured ? '••••••••' : ''}">
                        <button class="btn-token-save" id="btnSaveCpToken">${t('cp_token_save')}</button>
                        ${state.cryptoPanicTokenConfigured ? `<button class="btn-token-remove" id="btnRemoveCpToken">${t('cp_token_remove')}</button>` : ''}
                    </div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="source-card-main">
                <div>
                    <div class="source-card-name">
                        ${escapeHtml(src.name)}
                        ${isCustom ? '<span class="custom-source-badge">CUSTOM</span>' : ''}
                    </div>
                    <div class="source-card-url">${escapeHtml(src.url)}</div>
                </div>
                <div style="display: flex; align-items: center;">
                    ${isCustom ? `<button class="btn-source-delete" title="Usuń źródło">🗑️</button>` : ''}
                    <label class="switch">
                        <input type="checkbox" class="chk-source" ${src.isActive ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            ${cpTokenHtml}
        `;

        card.querySelector('.chk-source').onchange = (e) => {
            window.go.main.App.ToggleSource(src.id, e.target.checked).then(renderState);
        };

        if (isCustom) {
            const delBtn = card.querySelector('.btn-source-delete');
            if (delBtn) {
                delBtn.onclick = (e) => {
                    e.stopPropagation();
                    window.go.main.App.RemoveSource(src.id).then(renderState);
                };
            }
        }

        if (src.id === 'cp_api' && src.isActive) {
            const saveBtn = card.querySelector('#btnSaveCpToken');
            if (saveBtn) {
                saveBtn.onclick = () => {
                    const token = card.querySelector('#inputCpToken').value;
                    if (token && token !== '••••••••') {
                        window.go.main.App.SaveCryptoPanicToken(token).then(renderState);
                    }
                };
            }
            const remBtn = card.querySelector('#btnRemoveCpToken');
            if (remBtn) {
                remBtn.onclick = () => {
                    window.go.main.App.SaveCryptoPanicToken('').then(renderState);
                };
            }
        }

        return card;
    }

    tgSources.forEach(src => tgContainer.appendChild(createSourceCard(src, true)));
    genSources.forEach(src => genContainer.appendChild(createSourceCard(src, false)));
}

// 3. App & Night Subtab
function renderAppConfigSubtab(state) {
    document.getElementById('txtCardAlarmHeader').innerText = t('section_alarm');
    document.getElementById('txtRowAlarmToggle').innerText = t('alarm_row_title');
    document.getElementById('txtRowAlarmDesc').innerText = t('alarm_row_desc');
    document.getElementById('chkSettingsAlarm').checked = state.alarmEnabled;

    document.getElementById('txtRowAlarmRepeats').innerText = t('alarm_repeats_title');
    document.getElementById('txtRowAlarmRepeatsDesc').innerText = t('alarm_repeats_desc');
    document.getElementById('valMaxVibrations').innerText = state.maxVibrations;

    document.getElementById('txtCardNightHeader').innerText = t('section_night');
    document.getElementById('txtRowNightToggle').innerText = t('night_enable');
    document.getElementById('txtRowNightDesc').innerText = t('night_enable_desc');
    document.getElementById('chkSettingsNight').checked = state.nightModeEnabled;

    document.getElementById('txtRowNightStart').innerText = t('night_start');
    document.getElementById('valNightStart').innerText = state.nightModeStart;

    document.getElementById('txtRowNightEnd').innerText = t('night_end');
    document.getElementById('valNightEnd').innerText = state.nightModeEnd;

    document.getElementById('txtCardLangHeader').innerText = t('section_lang');
    document.querySelectorAll('.lang-pill').forEach(pill => {
        if (pill.getAttribute('data-lang') === state.currentLanguage) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    document.getElementById('txtRowAutostart').innerText = t('autostart_title');
    document.getElementById('txtRowAutostartDesc').innerText = t('autostart_desc');
    document.getElementById('chkSettingsAutostart').checked = state.autostart;

    document.getElementById('txtCardHistoryHeader').innerText = t('section_history');
    document.getElementById('txtHistoryDesc').innerText = t('history_desc', state.totalStoredNewsCount, state.maxStoredNews);
    document.getElementById('txtRowMaxNews').innerText = t('history_max_title');
    document.getElementById('txtRowMaxNewsDesc').innerText = t('history_max_desc');
    document.getElementById('valMaxStoredNews').innerText = state.maxStoredNews;
    document.getElementById('btnClearHistory').innerText = t('history_clear_btn');

    document.getElementById('txtCardImportExportHeader').innerText = t('section_import_export');
    document.getElementById('txtImportExportDesc').innerText = t('import_export_desc');
    document.getElementById('lblExportSettings').innerText = t('btn_export_settings');
    document.getElementById('lblExportSettingsSub').innerText = t('btn_export_settings_sub');
    document.getElementById('lblImportSettings').innerText = t('btn_import_settings');
    document.getElementById('lblImportSettingsSub').innerText = t('btn_import_settings_sub');
    document.getElementById('lblExportNews').innerText = t('btn_export_news');
    document.getElementById('lblExportNewsSub').innerText = t('btn_export_news_sub');
    document.getElementById('lblImportNews').innerText = t('btn_import_news');
    document.getElementById('lblImportNewsSub').innerText = t('btn_import_news_sub');

    document.querySelectorAll('.preset-pill').forEach(pill => {
        if (parseInt(pill.getAttribute('data-limit'), 10) === state.maxStoredNews) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    const statBin = document.getElementById('txtStatusBinance');
    if (state.isLiveMarket) {
        statBin.innerText = t('status_binance_ok', (state.allAvailableCoins || []).length);
        statBin.className = 'status-indicator-txt online';
    } else {
        statBin.innerText = t('status_binance_off');
        statBin.className = 'status-indicator-txt offline';
    }

    const statFeed = document.getElementById('txtStatusFeeds');
    statFeed.innerText = t('status_backend_ok');
}

// =========================================================================
// 🚀 EVENT LISTENERS SETUP
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Window Controls
    document.getElementById('btnMinimize').onclick = () => window.go.main.App.MinimizeWindow();
    document.getElementById('btnClose').onclick = () => window.go.main.App.CloseWindow();
    document.getElementById('btnAlwaysOnTop').onclick = () => window.go.main.App.ToggleAlwaysOnTop().then(renderState);

    // 2. Global Alarm Toggle
    document.getElementById('chkAlarmToggle').onchange = (e) => {
        window.go.main.App.SetAlarmEnabled(e.target.checked).then(renderState);
    };
    document.getElementById('btnAcknowledgeAlarm').onclick = () => {
        window.go.main.App.AcknowledgeAlarm().then(renderState);
    };

    // 3. Coin Dropdown Toggle
    document.getElementById('btnCoinDropdown').onclick = (e) => {
        e.stopPropagation();
        document.getElementById('coinDropdownMenu').classList.toggle('open');
    };
    document.addEventListener('click', () => {
        document.getElementById('coinDropdownMenu').classList.remove('open');
    });

    // 4. Refresh Button
    document.getElementById('btnRefreshData').onclick = () => {
        window.go.main.App.RefreshData().then(renderState);
    };
    document.getElementById('btnRefreshStatus').onclick = () => {
        window.go.main.App.RefreshData().then(renderState);
    };

    // 5. Navigation Bar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.onclick = () => {
            const tab = item.getAttribute('data-tab');
            window.go.main.App.SwitchTab(tab).then(renderState);
        };
    });

    // 6. Settings Subtabs
    document.querySelectorAll('.subtab-item').forEach(item => {
        item.onclick = () => {
            const sub = item.getAttribute('data-subtab');
            window.go.main.App.SwitchSettingsSubTab(sub).then(renderState);
        };
    });

    // 7. Pairs Search
    const searchInput = document.getElementById('inputPairSearch');
    const clearBtn = document.getElementById('btnClearPairSearch');
    searchInput.oninput = (e) => {
        pairSearchQuery = e.target.value;
        clearBtn.style.display = pairSearchQuery ? 'block' : 'none';
        if (currentAppState) renderPairsSubtab(currentAppState);
    };
    clearBtn.onclick = () => {
        pairSearchQuery = '';
        searchInput.value = '';
        clearBtn.style.display = 'none';
        if (currentAppState) renderPairsSubtab(currentAppState);
    };
    document.getElementById('btnFetchPairs').onclick = () => {
        window.go.main.App.FetchAvailablePairs().then(renderState);
    };

    // 8. Settings App Controls
    document.getElementById('chkSettingsAlarm').onchange = (e) => {
        window.go.main.App.SetAlarmEnabled(e.target.checked).then(renderState);
    };
    document.getElementById('btnVibrationsMinus').onclick = () => {
        if (currentAppState && currentAppState.maxVibrations > 1) {
            window.go.main.App.SetMaxVibrations(currentAppState.maxVibrations - 1).then(renderState);
        }
    };
    document.getElementById('btnVibrationsPlus').onclick = () => {
        if (currentAppState && currentAppState.maxVibrations < 30) {
            window.go.main.App.SetMaxVibrations(currentAppState.maxVibrations + 1).then(renderState);
        }
    };
    document.getElementById('chkSettingsNight').onchange = (e) => {
        window.go.main.App.SetNightModeEnabled(e.target.checked).then(renderState);
    };
    document.getElementById('chkSettingsAutostart').onchange = (e) => {
        window.go.main.App.SetAutostart(e.target.checked).then(renderState);
    };

    // Language pills
    document.querySelectorAll('.lang-pill').forEach(pill => {
        pill.onclick = () => {
            const lang = pill.getAttribute('data-lang');
            window.go.main.App.SetLanguage(lang).then(renderState);
        };
    });

    // Limit presets
    document.querySelectorAll('.preset-pill').forEach(pill => {
        pill.onclick = () => {
            const limit = parseInt(pill.getAttribute('data-limit'), 10);
            window.go.main.App.SetMaxStoredNews(limit).then(renderState);
        };
    });

    // Import / Export Handlers
    document.getElementById('btnExportSettings').onclick = () => {
        if (window.go && window.go.main && window.go.main.App && window.go.main.App.ExportSettingsDialog) {
            window.go.main.App.ExportSettingsDialog().catch(err => console.error("Export settings error:", err));
        }
    };
    document.getElementById('btnImportSettings').onclick = () => {
        if (window.go && window.go.main && window.go.main.App && window.go.main.App.ImportSettingsDialog) {
            window.go.main.App.ImportSettingsDialog().then(st => {
                if (st) renderState(st);
            }).catch(err => console.error("Import settings error:", err));
        }
    };
    document.getElementById('btnExportNews').onclick = () => {
        if (window.go && window.go.main && window.go.main.App && window.go.main.App.ExportNewsCsvDialog) {
            window.go.main.App.ExportNewsCsvDialog().catch(err => console.error("Export news error:", err));
        }
    };
    document.getElementById('btnImportNews').onclick = () => {
        if (window.go && window.go.main && window.go.main.App && window.go.main.App.ImportNewsCsvDialog) {
            window.go.main.App.ImportNewsCsvDialog().then(st => {
                if (st) renderState(st);
            }).catch(err => console.error("Import news error:", err));
        }
    };

    // 9. Modals Open / Close
    // Add Keyword
    document.getElementById('btnAddKeyword').onclick = () => {
        document.getElementById('modalAddKeyword').style.display = 'flex';
        document.getElementById('inputKeywordText').value = '';
        document.getElementById('inputKeywordText').focus();
    };
    document.getElementById('btnCancelKeyword').onclick = () => {
        document.getElementById('modalAddKeyword').style.display = 'none';
    };
    document.getElementById('btnConfirmKeyword').onclick = () => {
        const val = document.getElementById('inputKeywordText').value.trim();
        if (val) {
            window.go.main.App.AddKeyword(val).then(renderState);
        }
        document.getElementById('modalAddKeyword').style.display = 'none';
    };

    // Night Start
    document.getElementById('rowEditNightStart').onclick = () => {
        document.getElementById('modalEditNightStart').style.display = 'flex';
        document.getElementById('inputNightStartTime').value = currentAppState ? currentAppState.nightModeStart : '22:00';
    };
    document.getElementById('btnCancelNightStart').onclick = () => {
        document.getElementById('modalEditNightStart').style.display = 'none';
    };
    document.getElementById('btnConfirmNightStart').onclick = () => {
        const val = document.getElementById('inputNightStartTime').value.trim();
        if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val)) {
            window.go.main.App.SetNightHours(val, currentAppState.nightModeEnd).then(renderState);
        }
        document.getElementById('modalEditNightStart').style.display = 'none';
    };

    // Night End
    document.getElementById('rowEditNightEnd').onclick = () => {
        document.getElementById('modalEditNightEnd').style.display = 'flex';
        document.getElementById('inputNightEndTime').value = currentAppState ? currentAppState.nightModeEnd : '07:00';
    };
    document.getElementById('btnCancelNightEnd').onclick = () => {
        document.getElementById('modalEditNightEnd').style.display = 'none';
    };
    document.getElementById('btnConfirmNightEnd').onclick = () => {
        const val = document.getElementById('inputNightEndTime').value.trim();
        if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val)) {
            window.go.main.App.SetNightHours(currentAppState.nightModeStart, val).then(renderState);
        }
        document.getElementById('modalEditNightEnd').style.display = 'none';
    };

    // Max News Limit
    document.getElementById('rowEditMaxNews').onclick = () => {
        document.getElementById('modalEditMaxNews').style.display = 'flex';
        document.getElementById('inputMaxNewsVal').value = currentAppState ? currentAppState.maxStoredNews : 3650;
    };
    document.getElementById('btnCancelMaxNews').onclick = () => {
        document.getElementById('modalEditMaxNews').style.display = 'none';
    };
    document.getElementById('btnConfirmMaxNews').onclick = () => {
        const val = parseInt(document.getElementById('inputMaxNewsVal').value, 10);
        if (val && val >= 50 && val <= 50000) {
            window.go.main.App.SetMaxStoredNews(val).then(renderState);
        }
        document.getElementById('modalEditMaxNews').style.display = 'none';
    };

    // Clear History
    document.getElementById('btnClearHistory').onclick = () => {
        document.getElementById('modalClearHistory').style.display = 'flex';
    };
    document.getElementById('btnCancelClearHistory').onclick = () => {
        document.getElementById('modalClearHistory').style.display = 'none';
    };
    document.getElementById('btnConfirmClearHistory').onclick = () => {
        window.go.main.App.ClearNewsHistory().then(renderState);
        document.getElementById('modalClearHistory').style.display = 'none';
    };

    // Add Telegram Source
    document.getElementById('btnAddTelegramSource').onclick = () => {
        document.getElementById('modalAddTelegram').style.display = 'flex';
        document.getElementById('inputTelegramHandle').value = '';
        document.getElementById('inputTelegramName').value = '';
    };
    document.getElementById('btnCancelTelegram').onclick = () => {
        document.getElementById('modalAddTelegram').style.display = 'none';
    };
    document.getElementById('btnConfirmTelegram').onclick = () => {
        const handle = document.getElementById('inputTelegramHandle').value.trim();
        const name = document.getElementById('inputTelegramName').value.trim();
        if (handle) {
            window.go.main.App.AddTelegramSource(handle, name).then(renderState);
        }
        document.getElementById('modalAddTelegram').style.display = 'none';
    };

    // Add RSS / Atom Source
    document.getElementById('btnAddRssSource').onclick = () => {
        document.getElementById('modalAddRss').style.display = 'flex';
        document.getElementById('inputRssUrl').value = '';
        document.getElementById('inputRssName').value = '';
    };
    document.getElementById('btnCancelRss').onclick = () => {
        document.getElementById('modalAddRss').style.display = 'none';
    };
    document.getElementById('btnConfirmRss').onclick = () => {
        const url = document.getElementById('inputRssUrl').value.trim();
        const name = document.getElementById('inputRssName').value.trim();
        if (url) {
            window.go.main.App.AddRssSource(url, name).then(renderState);
        }
        document.getElementById('modalAddRss').style.display = 'none';
    };

    // In-app browser close / refresh / external
    document.getElementById('btnBrowserClose').onclick = () => {
        document.getElementById('inAppBrowserModal').style.display = 'none';
        document.getElementById('browserIframe').src = 'about:blank';
    };
    document.getElementById('btnBrowserRefresh').onclick = () => {
        const iframe = document.getElementById('browserIframe');
        iframe.src = iframe.src;
    };
    document.getElementById('btnBrowserExternal').onclick = () => {
        const url = document.getElementById('browserUrl').innerText;
        window.go.main.App.OpenExternalUrl(url);
    };

    // 10. Listen to Wails runtime events
    if (window.runtime) {
        window.runtime.EventsOn('state_updated', (st) => renderState(st));
        window.runtime.EventsOn('alarm_cycle_update', (cycle) => {
            if (currentAppState) {
                currentAppState.alarmCycle = cycle;
                renderState(currentAppState);
            }
        });
        window.runtime.EventsOn('play_vibration_sound', () => playAlarmSound());
        window.runtime.EventsOn('new_news_alert', () => playAlarmSound());
    }

    // Initial State Fetch
    if (window.go && window.go.main && window.go.main.App) {
        window.go.main.App.GetState().then(renderState);
    }
});

function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
