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
        new_title: "Nowe Wiadomości (%d)",
        new_empty_title: "Wszystko przeczytane!",
        new_empty_desc: "Brak nowych nieprzeczytanych wiadomości.",
        btn_mark_all_seen: "✓ Oznacz jako przeczytane",
        badge_new: "NOWE",
        sources_filter_title: "Filtruj źródła wiadomości",
        sources_filter_search_placeholder: "Szukaj źródła...",
        sources_filter_select_all: "Zaznacz wszystkie",
        sources_filter_clear: "Wyczyść",
        sources_filter_apply: "Zastosuj",
        sources_filter_btn_all: "Źródła: Wszystkie",
        sources_filter_btn_selected: "Źródła: Wybrane (%d)",
        sources_filter_clear_all: "Wyczyść filtry",
        settings_title: "Ustawienia Aplikacji",
        tab_pairs: "🪙 Pary",
        tab_sources: "📡 Źródła",
        tab_app_config: "⚙️ Aplikacja & Noc",
        pairs_header: "OBSERWOWANE PARY (%d / %d z Binance)",
        pairs_fetch_btn: "Pobierz pary 🔄",
        pairs_search_placeholder: "Szukaj pary (np. BTC, ADA, SOL, PEPE)...",
        sources_title: "GŁÓWNE ŹRÓDŁA NEWSÓW & RSS / ATOM",
        telegram_sources_title: "KANAŁY TELEGRAM (PUBLICZNE)",
        x_sources_title: "PROFILE X / TWITTER",
        btn_add_x: "+ Dodaj profil X",
        btn_add_tg: "+ Dodaj kanał",
        btn_add_rss: "+ Dodaj RSS / Atom",
        section_x: "KONTO X (TWITTER) & SESJA",
        x_status_title: "Status konta X",
        x_status_desc: "Wymagane do scrapowania profili (np. @saylor, @elonmusk)",
        x_connected: "🟢 Zalogowano",
        x_disconnected: "⚪ Niepołączono",
        btn_login_x: "🌐 Zaloguj do X",
        btn_logging_in_x: "⏳ Otwieranie przeglądarki...",
        btn_logout_x: "Wyloguj",
        modal_x_title: "Dodaj profil X (Twitter)",
        modal_x_hint: "np. @saylor, @elonmusk lub https://x.com/saylor",
        input_x_placeholder: "@saylor / URL profilu",
        input_x_name_placeholder: "Nazwa wyświetlana (opcjonalna)",
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
        nav_chart: "Wykres",
        nav_feed: "Feed",
        nav_new: "Nowe",
        nav_fav: "Ulubione",
        nav_settings: "Ustawienia",
        macro_forecast: "Prognoza:",
        macro_previous: "Poprzedni:",
        news_search_placeholder: "Szukaj w wiadomościach (treść, tytuł, źródło)...",
        new_news_search_placeholder: "Szukaj w nowych wiadomościach...",
        fav_news_search_placeholder: "Szukaj w ulubionych...",
        sources_search_manage_placeholder: "Szukaj źródła (np. telegram, coindesk, btc)...",
        sources_search_empty: "Nie znaleziono źródeł pasujących do zapytania."
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
        new_title: "New Messages (%d)",
        new_empty_title: "All caught up!",
        new_empty_desc: "No new unread news items.",
        btn_mark_all_seen: "✓ Mark all as read",
        badge_new: "NEW",
        sources_filter_title: "Filter News Sources",
        sources_filter_search_placeholder: "Search source...",
        sources_filter_select_all: "Select all",
        sources_filter_clear: "Clear",
        sources_filter_apply: "Apply",
        sources_filter_btn_all: "Sources: All",
        sources_filter_btn_selected: "Sources: Selected (%d)",
        sources_filter_clear_all: "Clear filters",
        settings_title: "App Settings",
        tab_pairs: "🪙 Pairs",
        tab_sources: "📡 Sources",
        tab_app_config: "⚙️ App & Night",
        pairs_header: "OBSERVED PAIRS (%d / %d from Binance)",
        pairs_fetch_btn: "Fetch pairs 🔄",
        pairs_search_placeholder: "Search crypto pair (e.g. BTC, ADA, SOL)...",
        sources_title: "MAIN NEWS & RSS / ATOM SOURCES",
        telegram_sources_title: "TELEGRAM CHANNELS (PUBLIC)",
        x_sources_title: "X / TWITTER PROFILES",
        btn_add_x: "+ Add X profile",
        btn_add_tg: "+ Add channel",
        btn_add_rss: "+ Add RSS / Atom",
        section_x: "X (TWITTER) ACCOUNT & SESSION",
        x_status_title: "X account status",
        x_status_desc: "Required to scrape profiles (e.g. @saylor, @elonmusk)",
        x_connected: "🟢 Connected",
        x_disconnected: "⚪ Disconnected",
        btn_login_x: "🌐 Log in to X",
        btn_logging_in_x: "⏳ Opening browser...",
        btn_logout_x: "Log out",
        modal_x_title: "Add X (Twitter) Profile",
        modal_x_hint: "e.g. @saylor, @elonmusk or https://x.com/saylor",
        input_x_placeholder: "@saylor / Profile URL",
        input_x_name_placeholder: "Display name (optional)",
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
        nav_chart: "Chart",
        nav_feed: "Feed",
        nav_new: "New",
        nav_fav: "Favorites",
        nav_settings: "Settings",
        macro_forecast: "Forecast:",
        macro_previous: "Previous:",
        news_search_placeholder: "Search news (content, title, source)...",
        new_news_search_placeholder: "Search in new messages...",
        fav_news_search_placeholder: "Search in favorites...",
        sources_search_manage_placeholder: "Search sources (e.g. telegram, coindesk, btc)...",
        sources_search_empty: "No sources found matching query."
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
        new_title: "Neue Nachrichten (%d)",
        new_empty_title: "Alles gelesen!",
        new_empty_desc: "Keine neuen ungelesenen Nachrichten.",
        btn_mark_all_seen: "✓ Alle als gelesen markieren",
        badge_new: "NEU",
        sources_filter_title: "Nachrichtenquellen filtern",
        sources_filter_search_placeholder: "Quelle suchen...",
        sources_filter_select_all: "Alle auswählen",
        sources_filter_clear: "Leeren",
        sources_filter_apply: "Anwenden",
        sources_filter_btn_all: "Quellen: Alle",
        sources_filter_btn_selected: "Quellen: Ausgewählt (%d)",
        sources_filter_clear_all: "Filter zurücksetzen",
        settings_title: "Einstellungen",
        tab_pairs: "🪙 Paare",
        tab_sources: "📡 Quellen",
        tab_app_config: "⚙️ App & Nacht",
        pairs_header: "BEOBACHTETE PAARE (%d / %d von Binance)",
        pairs_fetch_btn: "Paare laden 🔄",
        pairs_search_placeholder: "Kryptopaar suchen (z.B. BTC, ADA, SOL)...",
        sources_title: "HAUPTNACHRICHTEN & RSS / ATOM-QUELLEN",
        telegram_sources_title: "TELEGRAM-KANÄLE (ÖFFENTLICH)",
        x_sources_title: "X / TWITTER PROFILE",
        btn_add_x: "+ X-Profil hinzufügen",
        btn_add_tg: "+ Kanal hinzufügen",
        btn_add_rss: "+ RSS / Atom hinzufügen",
        section_x: "X (TWITTER) KONTO & SITZUNG",
        x_status_title: "X-Kontostatus",
        x_status_desc: "Erforderlich zum Scrapen von Profilen (z.B. @saylor, @elonmusk)",
        x_connected: "🟢 Verbunden",
        x_disconnected: "⚪ Nicht verbunden",
        btn_login_x: "🌐 Bei X anmelden",
        btn_logging_in_x: "⏳ Browser wird geöffnet...",
        btn_logout_x: "Abmelden",
        modal_x_title: "X-Profil hinzufügen",
        modal_x_hint: "z.B. @saylor, @elonmusk oder https://x.com/saylor",
        input_x_placeholder: "@saylor / Profil-URL",
        input_x_name_placeholder: "Anzeigename (optional)",
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
        nav_chart: "Wykres",
        nav_feed: "Feed",
        nav_new: "Neu",
        nav_fav: "Favoriten",
        nav_settings: "Einstellungen",
        macro_forecast: "Prognose:",
        macro_previous: "Vorherig:",
        news_search_placeholder: "Nachrichten durchsuchen (Inhalt, Titel, Quelle)...",
        new_news_search_placeholder: "Neue Nachrichten durchsuchen...",
        fav_news_search_placeholder: "Favoriten durchsuchen...",
        sources_search_manage_placeholder: "Quellen suchen (z.B. telegram, coindesk, btc)...",
        sources_search_empty: "Keine Quellen gefunden, die der Suche entsprechen."
    }
};

let currentAppState = null;
let animationFrameId = null;
let chartAnimationStartTime = performance.now();
let pairSearchQuery = "";
let tempSelectedSourceFilters = [];
let sourceFilterSearchQuery = "";
let newsSearchQuery = "";
let newNewsSearchQuery = "";
let favNewsSearchQuery = "";
let sourceManageSearchQuery = "";

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

    // 7. Select2 Sources Filter Bar
    renderSelect2SourceFilterBar(state.sourcesList || [], state.selectedSourceFilters || ['Wszystkie']);

    // 8. Unread Badge Counter in Bottom Nav
    const navNewBadge = document.getElementById('navNewBadge');
    if (navNewBadge) {
        if (state.unreadNewsCount > 0) {
            navNewBadge.style.display = 'inline-block';
            navNewBadge.innerText = state.unreadNewsCount > 99 ? '99+' : String(state.unreadNewsCount);
        } else {
            navNewBadge.style.display = 'none';
        }
    }

    // 9. Navigation Bar Active Tab & Labels
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-tab') === state.currentTab) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    document.getElementById('lblNavChart').innerText = t('nav_chart');
    document.getElementById('lblNavFeed').innerText = t('nav_feed');
    document.getElementById('lblNavNew').innerText = t('nav_new');
    document.getElementById('lblNavFav').innerText = t('nav_fav');
    document.getElementById('lblNavSettings').innerText = t('nav_settings');

    // 10. Switch visible view tab & Render News Cards
    const viewFeed = document.getElementById('viewFeed');
    const chartSection = document.getElementById('chartSection');
    const viewNew = document.getElementById('viewNew');
    const viewFavorites = document.getElementById('viewFavorites');
    const viewSettings = document.getElementById('viewSettings');

    viewFeed.style.display = 'none';
    if (viewNew) viewNew.style.display = 'none';
    viewFavorites.style.display = 'none';
    viewSettings.style.display = 'none';

    const baseNewsList = state.newsList || [];

    if (state.currentTab === 'CHART_AND_FEED' || state.currentTab === 'FEED_ONLY') {
        viewFeed.style.display = 'flex';
        chartSection.style.display = state.currentTab === 'CHART_AND_FEED' ? 'block' : 'none';

        const q = newsSearchQuery.toLowerCase().trim();
        const filtered = baseNewsList.filter(n => {
            if (!q) return true;
            return (n.title && n.title.toLowerCase().includes(q)) ||
                   (n.description && n.description.toLowerCase().includes(q)) ||
                   (n.source && n.source.toLowerCase().includes(q)) ||
                   (n.tag && n.tag.toLowerCase().includes(q));
        });

        document.getElementById('txtNewsCount').innerText = t('news_title', filtered.length);
        document.getElementById('txtNewsHint').innerText = t('news_hint');
        const inputNews = document.getElementById('inputNewsSearch');
        if (inputNews) inputNews.placeholder = t('news_search_placeholder');
        renderNewsCards(filtered, state.selectedNewsID, document.getElementById('newsCardsList'));
    } else if (state.currentTab === 'NEW') {
        if (viewNew) {
            viewNew.style.display = 'flex';
            const q = newNewsSearchQuery.toLowerCase().trim();
            const filtered = baseNewsList.filter(n => {
                if (!q) return true;
                return (n.title && n.title.toLowerCase().includes(q)) ||
                       (n.description && n.description.toLowerCase().includes(q)) ||
                       (n.source && n.source.toLowerCase().includes(q)) ||
                       (n.tag && n.tag.toLowerCase().includes(q));
            });

            document.getElementById('txtNewNewsCount').innerText = t('new_title', filtered.length);
            document.getElementById('btnMarkAllSeen').innerText = t('btn_mark_all_seen');
            const inputNew = document.getElementById('inputNewNewsSearch');
            if (inputNew) inputNew.placeholder = t('new_news_search_placeholder');
            renderNewsCards(filtered, state.selectedNewsID, document.getElementById('newCardsList'), false, true);
        }
    } else if (state.currentTab === 'FAVORITES') {
        viewFavorites.style.display = 'flex';
        const q = favNewsSearchQuery.toLowerCase().trim();
        const filtered = baseNewsList.filter(n => {
            if (!q) return true;
            return (n.title && n.title.toLowerCase().includes(q)) ||
                   (n.description && n.description.toLowerCase().includes(q)) ||
                   (n.source && n.source.toLowerCase().includes(q)) ||
                   (n.tag && n.tag.toLowerCase().includes(q));
        });

        document.getElementById('txtFavCount').innerText = t('fav_title', filtered.length);
        const inputFav = document.getElementById('inputFavNewsSearch');
        if (inputFav) inputFav.placeholder = t('fav_news_search_placeholder');
        renderNewsCards(filtered, state.selectedNewsID, document.getElementById('favCardsList'), true, false);
    } else if (state.currentTab === 'SETTINGS') {
        viewSettings.style.display = 'flex';
        renderSettingsView(state);
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

// Render Select2 Sources Filter Bar
function renderSelect2SourceFilterBar(sourcesList, selectedFilters) {
    const btnLabel = document.getElementById('lblSourcesFilterButton');
    const chipsContainer = document.getElementById('activeSourceChips');
    if (!btnLabel || !chipsContainer) return;

    const hasAll = !selectedFilters || selectedFilters.length === 0 ||
        selectedFilters.some(f => f === 'Wszystkie' || f === 'All' || f === 'Alle');

    if (hasAll) {
        btnLabel.innerText = t('sources_filter_btn_all');
    } else {
        btnLabel.innerText = t('sources_filter_btn_selected', selectedFilters.length);
    }

    chipsContainer.innerHTML = '';
    if (!hasAll && selectedFilters.length > 0) {
        selectedFilters.forEach(filterName => {
            const sourceObj = sourcesList.find(s => s.name === filterName);
            const color = sourceObj ? sourceObj.colorHex : '#00E5FF';
            const chip = document.createElement('div');
            chip.className = 'active-source-chip';
            chip.innerHTML = `
                <span class="active-source-chip-dot" style="background: ${color};"></span>
                <span>${escapeHtml(filterName)}</span>
                <span class="active-source-chip-remove" title="Usuń filtr">✕</span>
            `;
            chip.querySelector('.active-source-chip-remove').onclick = (e) => {
                e.stopPropagation();
                window.go.main.App.ToggleSourceFilter(filterName).then(renderState);
            };
            chipsContainer.appendChild(chip);
        });

        if (selectedFilters.length > 1) {
            const clearAllBtn = document.createElement('button');
            clearAllBtn.className = 'btn-clear-all-source-filters';
            clearAllBtn.innerText = t('sources_filter_clear_all');
            clearAllBtn.onclick = (e) => {
                e.stopPropagation();
                window.go.main.App.ClearSourceFilters().then(renderState);
            };
            chipsContainer.appendChild(clearAllBtn);
        }
    }
}

// Select2 Multi-Select Sources Dialog Logic
function openSelect2SourcesModal() {
    const modal = document.getElementById('modalSelect2Sources');
    if (!modal || !currentAppState) return;

    document.getElementById('txtSelect2ModalTitle').innerText = t('sources_filter_title');
    document.getElementById('btnSelectAllSources').innerText = t('sources_filter_select_all');
    document.getElementById('btnClearSelectedSources').innerText = t('sources_filter_clear');
    document.getElementById('btnCancelSelect2Sources').innerText = t('btn_cancel');
    document.getElementById('btnApplySelect2Sources').innerText = t('sources_filter_apply');
    document.getElementById('inputSourceFilterSearch').placeholder = t('sources_filter_search_placeholder');

    tempSelectedSourceFilters = [...(currentAppState.selectedSourceFilters || ['Wszystkie'])];
    sourceFilterSearchQuery = '';
    document.getElementById('inputSourceFilterSearch').value = '';
    document.getElementById('btnClearSourceFilterSearch').style.display = 'none';

    renderSelect2SourcesList();
    modal.style.display = 'flex';
}

function renderSelect2SourcesList() {
    const container = document.getElementById('select2SourcesListContainer');
    if (!container || !currentAppState) return;
    container.innerHTML = '';

    const sources = currentAppState.sourcesList || [];
    const query = sourceFilterSearchQuery.toLowerCase().trim();
    const isAllSelected = tempSelectedSourceFilters.some(f => f === 'Wszystkie' || f === 'All' || f === 'Alle');

    const sorted = [...sources].sort((a, b) => a.name.localeCompare(b.name));
    const filtered = sorted.filter(s => {
        if (!query) return true;
        return s.name.toLowerCase().includes(query) || s.url.toLowerCase().includes(query);
    });

    filtered.forEach(src => {
        const isChecked = isAllSelected || tempSelectedSourceFilters.includes(src.name);
        const item = document.createElement('div');
        item.className = `select2-source-item ${isChecked ? 'selected' : ''}`;
        item.innerHTML = `
            <div class="select2-source-left">
                <span class="select2-source-color-dot" style="background: ${src.colorHex};"></span>
                <div class="select2-source-info">
                    <div class="select2-source-name">${escapeHtml(src.name)}</div>
                    <div class="select2-source-url">${escapeHtml(src.url)}</div>
                </div>
            </div>
            <input type="checkbox" class="custom-checkbox" ${isChecked ? 'checked' : ''}>
        `;

        const toggleItem = () => {
            if (isAllSelected) {
                tempSelectedSourceFilters = sources.filter(s => s.name !== src.name).map(s => s.name);
            } else if (tempSelectedSourceFilters.includes(src.name)) {
                tempSelectedSourceFilters = tempSelectedSourceFilters.filter(f => f !== src.name);
                if (tempSelectedSourceFilters.length === 0) {
                    tempSelectedSourceFilters = ['Wszystkie'];
                }
            } else {
                tempSelectedSourceFilters = tempSelectedSourceFilters.filter(f => f !== 'Wszystkie' && f !== 'All' && f !== 'Alle');
                tempSelectedSourceFilters.push(src.name);
            }
            renderSelect2SourcesList();
        };

        item.onclick = toggleItem;
        item.querySelector('input').onclick = (e) => {
            e.stopPropagation();
            toggleItem();
        };

        container.appendChild(item);
    });
}

// Render News Cards
function renderNewsCards(newsList, selectedNewsId, container, isFavoritesTab = false, isNewTab = false) {
    container.innerHTML = '';

    if (!newsList || newsList.length === 0) {
        const emptyBox = document.createElement('div');
        emptyBox.className = 'empty-state-box';
        if (isNewTab) {
            emptyBox.innerHTML = `
                <div class="empty-icon">🎉</div>
                <div class="empty-title">${t('new_empty_title')}</div>
                <div class="empty-sub">${t('new_empty_desc')}</div>
            `;
        } else if (isFavoritesTab) {
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
        const isUnread = !news.isSeen;
        card.className = `news-card ${isSelected ? 'selected' : ''} ${isUnread ? 'is-unread' : ''}`;
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
                    ${isUnread ? `<span class="card-unread-badge">${t('badge_new')}</span>` : ''}
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
                window.go.main.App.MarkNewsAsSeen(news.id).then(renderState);
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
    const txtXSources = document.getElementById('txtXSourcesTitle');
    if (txtXSources) txtXSources.innerText = t('x_sources_title');
    const btnAddX = document.getElementById('btnAddXSource');
    if (btnAddX) btnAddX.innerText = t('btn_add_x');
    document.getElementById('btnAddTelegramSource').innerText = t('btn_add_tg');
    document.getElementById('btnAddRssSource').innerText = t('btn_add_rss');
    const inputManage = document.getElementById('inputSourceManageSearch');
    if (inputManage) inputManage.placeholder = t('sources_search_manage_placeholder');

    // X session banner in Sources tab
    const bannerTxt = document.getElementById('xSessionBannerTxt');
    const bannerLoginBtn = document.getElementById('btnBannerLoginX');
    const bannerLogoutBtn = document.getElementById('btnBannerLogoutX');
    if (bannerTxt && bannerLoginBtn && bannerLogoutBtn) {
        if (state.isXLoggedIn) {
            bannerTxt.innerHTML = `<span style="color: #00FF88; font-weight: bold;">🟢 Zalogowano do X (Twitter)</span> — tweety są aktywnie pobierane`;
            bannerLoginBtn.style.display = 'none';
            bannerLogoutBtn.style.display = 'inline-block';
        } else {
            bannerTxt.innerHTML = `<span style="color: #F59E0B; font-weight: bold;">⚠️ Wymagane logowanie do X</span> — zaloguj się, aby odblokować tweety`;
            bannerLoginBtn.style.display = 'inline-block';
            bannerLogoutBtn.style.display = 'none';
        }
    }

    const xContainer = document.getElementById('xSourcesManageList');
    const tgContainer = document.getElementById('telegramSourcesManageList');
    const genContainer = document.getElementById('sourcesManageList');
    if (xContainer) xContainer.innerHTML = '';
    tgContainer.innerHTML = '';
    genContainer.innerHTML = '';

    const q = sourceManageSearchQuery.toLowerCase().trim();
    const allSources = (state.sourcesList || []).filter(s => {
        if (!q) return true;
        return (s.name && s.name.toLowerCase().includes(q)) ||
               (s.url && s.url.toLowerCase().includes(q)) ||
               (s.id && s.id.toLowerCase().includes(q));
    });

    const isX = s => s.id.startsWith('x_') || s.url.includes('x.com') || s.url.includes('twitter.com');
    const isTg = s => (s.id.startsWith('tg_') || s.url.includes('t.me/')) && !isX(s);

    const xSources = allSources.filter(isX).sort((a, b) => a.name.localeCompare(b.name));
    const tgSources = allSources.filter(isTg).sort((a, b) => a.name.localeCompare(b.name));
    const genSources = allSources.filter(s => !isX(s) && !isTg(s)).sort((a, b) => a.name.localeCompare(b.name));

    const defaultIds = [
        'x_saylor', 'x_elonmusk', 'x_vitalik',
        'llama_hacks', 'macro_cal', 'tg_unfolded', 'tg_wu', 'tg_binance',
        'tg_whale', 'tg_watcherguru', 'tg_peckshield', 'theblock_rss',
        'blockworks_rss', 'btc_mag_rss', 'bankless_rss', 'cd_rss', 'ct_rss',
        'cp_api', 'cs_rss', 'dc_rss', 'beincrypto_pl', 'bithub_pl', 'cryps_pl',
        'iog_news', 'dailycoin_rss', 'rd_rss', 'ut_rss'
    ];

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

    if (xSources.length === 0 && tgSources.length === 0 && genSources.length === 0 && q) {
        const empty = document.createElement('div');
        empty.className = 'empty-state-box';
        empty.style.padding = '20px 10px';
        empty.innerHTML = `
            <div class="empty-icon">🔍</div>
            <div class="empty-title">${t('sources_search_empty')}</div>
        `;
        genContainer.appendChild(empty);
    } else {
        if (xContainer) {
            xSources.forEach(src => xContainer.appendChild(createSourceCard(src, false)));
        }
        tgSources.forEach(src => tgContainer.appendChild(createSourceCard(src, true)));
        genSources.forEach(src => genContainer.appendChild(createSourceCard(src, false)));
    }
}

// 3. App & Night Subtab
function renderAppConfigSubtab(state) {
    // X Session Status Card
    const txtCardX = document.getElementById('txtCardXHeader');
    if (txtCardX) txtCardX.innerText = t('section_x');
    const txtRowX = document.getElementById('txtRowXStatus');
    if (txtRowX) txtRowX.innerText = t('x_status_title');
    const txtRowXDesc = document.getElementById('txtRowXDesc');
    if (txtRowXDesc) txtRowXDesc.innerText = t('x_status_desc');

    const badgeX = document.getElementById('badgeXStatus');
    const btnLoginX = document.getElementById('btnLoginX');
    const btnLogoutX = document.getElementById('btnLogoutX');

    if (badgeX && btnLoginX && btnLogoutX) {
        if (state.isXLoggedIn) {
            badgeX.innerText = t('x_connected');
            badgeX.style.background = 'rgba(0, 255, 136, 0.15)';
            badgeX.style.color = '#00FF88';
            btnLoginX.style.display = 'none';
            btnLogoutX.style.display = 'inline-block';
            btnLogoutX.innerText = t('btn_logout_x');
        } else {
            badgeX.innerText = t('x_disconnected');
            badgeX.style.background = 'rgba(255, 255, 255, 0.06)';
            badgeX.style.color = '#888';
            btnLoginX.style.display = 'inline-block';
            btnLoginX.innerText = t('btn_login_x');
            btnLoginX.disabled = false;
            btnLogoutX.style.display = 'none';
        }
    }
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

    // Select2 Sources Filter Modal
    const btnOpenSources = document.getElementById('btnOpenSourcesFilter');
    if (btnOpenSources) {
        btnOpenSources.onclick = () => openSelect2SourcesModal();
    }
    const btnSelectAll = document.getElementById('btnSelectAllSources');
    if (btnSelectAll) {
        btnSelectAll.onclick = () => {
            tempSelectedSourceFilters = ['Wszystkie'];
            renderSelect2SourcesList();
        };
    }
    const btnClearSel = document.getElementById('btnClearSelectedSources');
    if (btnClearSel) {
        btnClearSel.onclick = () => {
            tempSelectedSourceFilters = [];
            renderSelect2SourcesList();
        };
    }
    const btnCancelSel2 = document.getElementById('btnCancelSelect2Sources');
    if (btnCancelSel2) {
        btnCancelSel2.onclick = () => {
            document.getElementById('modalSelect2Sources').style.display = 'none';
        };
    }
    const btnApplySel2 = document.getElementById('btnApplySelect2Sources');
    if (btnApplySel2) {
        btnApplySel2.onclick = () => {
            if (!tempSelectedSourceFilters || tempSelectedSourceFilters.length === 0) {
                tempSelectedSourceFilters = ['Wszystkie'];
            }
            window.go.main.App.SetSourceFilters(tempSelectedSourceFilters).then(renderState);
            document.getElementById('modalSelect2Sources').style.display = 'none';
        };
    }

    const sourceSearchInput = document.getElementById('inputSourceFilterSearch');
    const sourceSearchClear = document.getElementById('btnClearSourceFilterSearch');
    if (sourceSearchInput && sourceSearchClear) {
        sourceSearchInput.oninput = (e) => {
            sourceFilterSearchQuery = e.target.value;
            sourceSearchClear.style.display = sourceFilterSearchQuery ? 'block' : 'none';
            renderSelect2SourcesList();
        };
        sourceSearchClear.onclick = () => {
            sourceFilterSearchQuery = '';
            sourceSearchInput.value = '';
            sourceSearchClear.style.display = 'none';
            renderSelect2SourcesList();
        };
    }

    // Mark All As Seen (New tab)
    const btnMarkAllSeen = document.getElementById('btnMarkAllSeen');
    if (btnMarkAllSeen) {
        btnMarkAllSeen.onclick = () => {
            window.go.main.App.MarkAllNewsAsSeen().then(renderState);
        };
    }

    // News Feed Search
    const inputNewsSearch = document.getElementById('inputNewsSearch');
    const btnClearNewsSearch = document.getElementById('btnClearNewsSearch');
    if (inputNewsSearch && btnClearNewsSearch) {
        inputNewsSearch.oninput = (e) => {
            newsSearchQuery = e.target.value;
            btnClearNewsSearch.style.display = newsSearchQuery ? 'block' : 'none';
            if (currentAppState) renderState(currentAppState);
        };
        btnClearNewsSearch.onclick = () => {
            newsSearchQuery = '';
            inputNewsSearch.value = '';
            btnClearNewsSearch.style.display = 'none';
            if (currentAppState) renderState(currentAppState);
        };
    }

    // New News Search
    const inputNewNewsSearch = document.getElementById('inputNewNewsSearch');
    const btnClearNewNewsSearch = document.getElementById('btnClearNewNewsSearch');
    if (inputNewNewsSearch && btnClearNewNewsSearch) {
        inputNewNewsSearch.oninput = (e) => {
            newNewsSearchQuery = e.target.value;
            btnClearNewNewsSearch.style.display = newNewsSearchQuery ? 'block' : 'none';
            if (currentAppState) renderState(currentAppState);
        };
        btnClearNewNewsSearch.onclick = () => {
            newNewsSearchQuery = '';
            inputNewNewsSearch.value = '';
            btnClearNewNewsSearch.style.display = 'none';
            if (currentAppState) renderState(currentAppState);
        };
    }

    // Favorites News Search
    const inputFavNewsSearch = document.getElementById('inputFavNewsSearch');
    const btnClearFavNewsSearch = document.getElementById('btnClearFavNewsSearch');
    if (inputFavNewsSearch && btnClearFavNewsSearch) {
        inputFavNewsSearch.oninput = (e) => {
            favNewsSearchQuery = e.target.value;
            btnClearFavNewsSearch.style.display = favNewsSearchQuery ? 'block' : 'none';
            if (currentAppState) renderState(currentAppState);
        };
        btnClearFavNewsSearch.onclick = () => {
            favNewsSearchQuery = '';
            inputFavNewsSearch.value = '';
            btnClearFavNewsSearch.style.display = 'none';
            if (currentAppState) renderState(currentAppState);
        };
    }

    // Settings Sources Search
    const inputSourceManageSearch = document.getElementById('inputSourceManageSearch');
    const btnClearSourceManageSearch = document.getElementById('btnClearSourceManageSearch');
    if (inputSourceManageSearch && btnClearSourceManageSearch) {
        inputSourceManageSearch.oninput = (e) => {
            sourceManageSearchQuery = e.target.value;
            btnClearSourceManageSearch.style.display = sourceManageSearchQuery ? 'block' : 'none';
            if (currentAppState) renderSourcesSubtab(currentAppState);
        };
        btnClearSourceManageSearch.onclick = () => {
            sourceManageSearchQuery = '';
            inputSourceManageSearch.value = '';
            btnClearSourceManageSearch.style.display = 'none';
            if (currentAppState) renderSourcesSubtab(currentAppState);
        };
    }

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

    // X Login & Logout
    const handleLoginXClick = () => {
        if (btnLoginX) {
            btnLoginX.disabled = true;
            btnLoginX.innerText = t('btn_logging_in_x');
        }
        window.go.main.App.LoginX().then(renderState).catch(err => {
            alert('Błąd logowania X: ' + err);
            if (currentAppState) renderState(currentAppState);
        });
    };

    if (btnLoginX) btnLoginX.onclick = handleLoginXClick;
    const btnQuickLoginX = document.getElementById('btnQuickLoginX');
    if (btnQuickLoginX) btnQuickLoginX.onclick = handleLoginXClick;
    const btnBannerLoginX = document.getElementById('btnBannerLoginX');
    if (btnBannerLoginX) btnBannerLoginX.onclick = handleLoginXClick;

    const handleLogoutXClick = () => {
        window.go.main.App.LogoutX().then(renderState);
    };

    const btnLogoutX = document.getElementById('btnLogoutX');
    if (btnLogoutX) btnLogoutX.onclick = handleLogoutXClick;
    const btnBannerLogoutX = document.getElementById('btnBannerLogoutX');
    if (btnBannerLogoutX) btnBannerLogoutX.onclick = handleLogoutXClick;

    // Add X Source Modal
    const btnAddXSource = document.getElementById('btnAddXSource');
    const modalAddX = document.getElementById('modalAddX');
    const inputXHandle = document.getElementById('inputXHandle');
    const inputXName = document.getElementById('inputXName');
    const btnCancelX = document.getElementById('btnCancelX');
    const btnConfirmX = document.getElementById('btnConfirmX');

    if (btnAddXSource && modalAddX) {
        btnAddXSource.onclick = () => {
            modalAddX.style.display = 'flex';
            inputXHandle.value = '';
            inputXName.value = '';
            inputXHandle.focus();
        };
        btnCancelX.onclick = () => {
            modalAddX.style.display = 'none';
        };
        btnConfirmX.onclick = () => {
            const handle = inputXHandle.value.trim();
            const name = inputXName.value.trim();
            if (handle) {
                window.go.main.App.AddXSource(handle, name).then(renderState);
            }
            modalAddX.style.display = 'none';
        };
    }

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
