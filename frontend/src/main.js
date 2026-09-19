// TRANSLATIONS DICTIONARY (PL / EN / DE)
const I18N = {
    pl: {
        alarm_title: "Alarm wibracyjny",
        alarm_active: "Aktywny (max %d powtórzeń)",
        alarm_disabled: "Wyłączony całkowicie",
        alarm_banner_title: "Nowa wiadomość oczekuje",
        alarm_banner_info: "Wibracja %d z %d (kolejna za %ds)",
        alarm_action_seen: "Widziałem",
        slide_down_alarm_on: "Alarm: WŁ",
        slide_down_alarm_off: "Alarm: WYŁ",
        slide_down_filters_active: "%d aktywne",
        slide_down_filters_all: "Wszystkie",
        slide_down_collapse: "Zwiń",
        slide_down_expand: "Filtry i Alarm",
        night_banner: "🌙 Obowiązuje Tryb Nocny (%s – %s)",
        night_muted: "Wibracje wyciszone",
        news_title: "WIADOMOŚCI (%d)",
        news_hint: "Dotknij newsa, by podświetlić kropkę",
        news_empty: "Brak wiadomości spełniających kryteria filtrów.",
        share_link: "Udostępnij link",
        open_link: "Otwórz link ↗",
        copy_action: "Kopiuj",
        copy_news: "Kopiuj wiadomość do schowka",
        copied_status: "Skopiowano!",
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
        date_filter_label: "Data:",
        date_filter_today: "Dziś",
        date_filter_7d: "7 dni",
        date_filter_month: "Ten miesiąc",
        date_filter_custom: "Zakres ▾",
        date_filter_all: "Wszystkie",
        date_filter_from: "Od:",
        date_filter_to: "Do:",
        date_filter_clear_hint: "Wyczyść filtr daty",
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
        sources_manage_select_all: "Zaznacz wszystkie",
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
        section_intervals: "CZĘSTOTLIWOŚĆ SPRAWDZANIA WIADOMOŚCI",
        interval_day_title: "Interwał w dzień (Standardowy)",
        interval_day_desc: "Częstotliwość sprawdzania nowych wiadomości",
        interval_night_title: "Interwał w nocy (Tryb nocny)",
        interval_night_desc: "Częstotliwość w cichych godzinach nocnych",
        interval_x_day_title: "Interwał X w dzień (±30s)",
        interval_x_day_desc: "Częstotliwość profili X w dzień (losowo ±30s)",
        interval_x_night_title: "Interwał X w nocy (±30s)",
        interval_x_night_desc: "Częstotliwość profili X w trybie nocnym (losowo ±30s)",
        modal_interval_day_title: "Interwał sprawdzania w dzień (sekundy)",
        modal_interval_day_hint: "Wpisz liczbę sekund (np. 60 dla 1 minuty)",
        modal_interval_night_title: "Interwał w trybie nocnym (sekundy)",
        modal_interval_night_hint: "Wpisz liczbę sekund (np. 900 dla 15 minut)",
        modal_interval_x_day_title: "Interwał X w dzień (±30s losowo)",
        modal_interval_x_day_hint: "Wpisz liczbę sekund (np. 300 dla 5 minut). Losowe ±30s chroni konto.",
        modal_interval_x_night_title: "Interwał X w nocy (±30s losowo)",
        modal_interval_x_night_hint: "Wpisz liczbę sekund (np. 600 dla 10 minut). Losowe ±30s chroni konto.",
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
        history_clear_msg: "Ta operacja trwale usunie lokalnie zapisane newsy oraz ustawi datę pobierania na bieżącą chwilę. Ulubione i ustawienia źródeł pozostaną bez zmian.",
        history_cutoff_title: "Pobieraj wiadomości od",
        history_cutoff_desc: "Ignoruje wiadomości starsze niż wybrana data (Wyczyść ustawia na teraz)",
        history_cutoff_no_limit: "Brak limitu (wszystkie)",
        modal_cutoff_title: "Data początkowa wiadomości",
        modal_cutoff_hint: "Wybierz szybki preset lub ustaw własną datę i godzinę:",
        cutoff_preset_now: "Od teraz",
        cutoff_preset_today: "Dziś (00:00)",
        cutoff_preset_24h: "Ostatnie 24h",
        cutoff_preset_3d: "Ostatnie 3 dni",
        cutoff_preset_7d: "Ostatnie 7 dni",
        cutoff_preset_this_month: "Ten miesiąc",
        cutoff_preset_last_month: "Poprzedni miesiąc",
        cutoff_preset_this_year: "Ten rok",
        cutoff_preset_all: "Wszystkie (brak limitu)",
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
        nav_manage: "Zarządzaj",
        manage_title: "Zarządzaj wiadomościami",
        manage_selected_count: "Wybrano: %d z %d",
        manage_selected_short: "Wybrano: %d",
        manage_select_all: "Zaznacz wszystkie",
        manage_uncheck_all: "Odznacz wszystko",
        manage_btn_delete: "Usuń (%d)",
        manage_delete_confirm: "Czy na pewno chcesz usunąć %d wybranych wiadomości z lokalnej historii?",
        manage_empty: "Brak wiadomości w historii do zarządzania.",
        manage_filter_placeholder: "Filtruj do usunięcia...",
        slide_down_show_chart_title: "Pokaż wykres",
        slide_down_show_chart_desc_on: "Widoczny na ekranie głównym",
        slide_down_show_chart_desc_off: "Ukryty (tylko strumień)",
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
        slide_down_alarm_on: "Alarm: ON",
        slide_down_alarm_off: "Alarm: OFF",
        slide_down_filters_active: "%d active",
        slide_down_filters_all: "All filters",
        slide_down_collapse: "Collapse",
        slide_down_expand: "Filters & Alarm",
        night_banner: "🌙 Night Mode Active (%s – %s)",
        night_muted: "Vibrations muted",
        news_title: "NEWS (%d)",
        news_hint: "Tap news to highlight dot",
        news_empty: "No news matching filter criteria.",
        share_link: "Share link",
        open_link: "Open link ↗",
        copy_action: "Copy",
        copy_news: "Copy news to clipboard",
        copied_status: "Copied!",
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
        date_filter_label: "Date:",
        date_filter_today: "Today",
        date_filter_7d: "7 days",
        date_filter_month: "This month",
        date_filter_custom: "Range ▾",
        date_filter_all: "All",
        date_filter_from: "From:",
        date_filter_to: "To:",
        date_filter_clear_hint: "Clear date filter",
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
        sources_manage_select_all: "Select all",
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
        section_intervals: "NEWS CHECK FREQUENCY",
        interval_day_title: "Day Interval (Standard)",
        interval_day_desc: "Frequency of checking for new messages",
        interval_night_title: "Night Interval (Night mode)",
        interval_night_desc: "Frequency during quiet night hours",
        interval_x_day_title: "X Day Interval (±30s)",
        interval_x_day_desc: "Check frequency for X profiles during day (±30s anti-bot)",
        interval_x_night_title: "X Night Interval (±30s)",
        interval_x_night_desc: "Check frequency for X profiles during night (±30s anti-bot)",
        modal_interval_day_title: "Day Check Interval (seconds)",
        modal_interval_day_hint: "Enter number of seconds (e.g. 60 for 1 minute)",
        modal_interval_night_title: "Night Check Interval (seconds)",
        modal_interval_night_hint: "Enter number of seconds (e.g. 900 for 15 minutes)",
        modal_interval_x_day_title: "X Day Check Interval (seconds)",
        modal_interval_x_day_hint: "Enter seconds (e.g. 300 for 5 minutes). Random ±30s avoids rate limits.",
        modal_interval_x_night_title: "X Night Check Interval (seconds)",
        modal_interval_x_night_hint: "Enter seconds (e.g. 600 for 10 minutes). Random ±30s avoids rate limits.",
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
        history_clear_msg: "This permanently removes locally saved news and sets the fetch start date to right now. Favorites and source settings will remain.",
        history_cutoff_title: "Fetch news from",
        history_cutoff_desc: "Ignores news older than selected date (Clear sets to now)",
        history_cutoff_no_limit: "No limit (all)",
        modal_cutoff_title: "News fetch start date",
        modal_cutoff_hint: "Choose a quick preset or specify date and time:",
        cutoff_preset_now: "From now",
        cutoff_preset_today: "Today (00:00)",
        cutoff_preset_24h: "Last 24h",
        cutoff_preset_3d: "Last 3 days",
        cutoff_preset_7d: "Last 7 days",
        cutoff_preset_this_month: "This month",
        cutoff_preset_last_month: "Last month",
        cutoff_preset_this_year: "This year",
        cutoff_preset_all: "All (no limit)",
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
        nav_manage: "Manage",
        manage_title: "Manage News",
        manage_selected_count: "Selected: %d of %d",
        manage_selected_short: "Selected: %d",
        manage_select_all: "Select all",
        manage_uncheck_all: "Uncheck all",
        manage_btn_delete: "Delete (%d)",
        manage_delete_confirm: "Are you sure you want to delete %d selected news from local history?",
        manage_empty: "No news in history to manage.",
        manage_filter_placeholder: "Filter to delete...",
        slide_down_show_chart_title: "Show chart",
        slide_down_show_chart_desc_on: "Visible on main screen",
        slide_down_show_chart_desc_off: "Hidden (feed only)",
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
        slide_down_alarm_on: "Alarm: AN",
        slide_down_alarm_off: "Alarm: AUS",
        slide_down_filters_active: "%d aktiv",
        slide_down_filters_all: "Alle",
        slide_down_collapse: "Einklappen",
        slide_down_expand: "Filter & Alarm",
        night_banner: "🌙 Nachtmodus Aktiv (%s – %s)",
        night_muted: "Vibrationen stummgeschaltet",
        news_title: "NACHRICHTEN (%d)",
        news_hint: "Tippen Sie auf News, um Punkt hervorzuheben",
        news_empty: "Keine Nachrichten entsprechen den Filterkriterien.",
        share_link: "Link teilen",
        open_link: "Link öffnen ↗",
        copy_action: "Kopieren",
        copy_news: "News in die Zwischenablage kopieren",
        copied_status: "Kopiert!",
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
        date_filter_label: "Datum:",
        date_filter_today: "Heute",
        date_filter_7d: "7 Tage",
        date_filter_month: "Dieser Monat",
        date_filter_custom: "Bereich ▾",
        date_filter_all: "Alle",
        date_filter_from: "Von:",
        date_filter_to: "Bis:",
        date_filter_clear_hint: "Datumsfilter leeren",
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
        sources_manage_select_all: "Alle auswählen",
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
        section_intervals: "NACHRICHTEN-ABRUFINTERVALL",
        interval_day_title: "Tagesintervall (Standard)",
        interval_day_desc: "Häufigkeit der Nachrichtenabfrage am Tag",
        interval_night_title: "Nachtintervall (Nachtmodus)",
        interval_night_desc: "Häufigkeit während der Nachtruhe",
        interval_x_day_title: "X-Tagesintervall (±30s)",
        interval_x_day_desc: "Abrufhäufigkeit für X-Profile am Tag (±30s Anti-Bot)",
        interval_x_night_title: "X-Nachtintervall (±30s)",
        interval_x_night_desc: "Abrufhäufigkeit für X-Profile bei Nacht (±30s Anti-Bot)",
        modal_interval_day_title: "Tages-Abrufintervall (Sekunden)",
        modal_interval_day_hint: "Sekundenanzahl eingeben (z. B. 60 für 1 Minute)",
        modal_interval_night_title: "Nacht-Abrufintervall (Sekunden)",
        modal_interval_night_hint: "Sekundenanzahl eingeben (z. B. 900 für 15 Minuten)",
        modal_interval_x_day_title: "X-Tagesabrufintervall (Sekunden)",
        modal_interval_x_day_hint: "Sekundenanzahl eingeben (z. B. 300 für 5 Min.). Zufall ±30s schützt vor Sperren.",
        modal_interval_x_night_title: "X-Nachtabrufintervall (Sekunden)",
        modal_interval_x_night_hint: "Sekundenanzahl eingeben (z. B. 600 für 10 Min.). Zufall ±30s schützt vor Sperren.",
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
        history_clear_msg: "Dadurch werden gespeicherte Nachrichten gelöscht und das Abrufdatum auf jetzt gesetzt. Favoriten bleiben erhalten.",
        history_cutoff_title: "Nachrichten abrufen ab",
        history_cutoff_desc: "Ignoriert Nachrichten vor diesem Datum (Löschen setzt auf jetzt)",
        history_cutoff_no_limit: "Kein Limit (alle)",
        modal_cutoff_title: "Startdatum für Nachrichtenabruf",
        modal_cutoff_hint: "Wählen Sie ein Preset oder legen Sie Datum und Uhrzeit fest:",
        cutoff_preset_now: "Ab jetzt",
        cutoff_preset_today: "Heute (00:00)",
        cutoff_preset_24h: "Letzte 24h",
        cutoff_preset_3d: "Letzte 3 Tage",
        cutoff_preset_7d: "Letzte 7 Tage",
        cutoff_preset_this_month: "Diesen Monat",
        cutoff_preset_last_month: "Letzten Monat",
        cutoff_preset_this_year: "Dieses Jahr",
        cutoff_preset_all: "Alle (kein Limit)",
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
        nav_chart: "Chart",
        nav_feed: "Feed",
        nav_manage: "Verwalten",
        manage_title: "Nachrichten verwalten",
        manage_selected_count: "Ausgewählt: %d von %d",
        manage_selected_short: "Ausgewählt: %d",
        manage_select_all: "Alle auswählen",
        manage_uncheck_all: "Alle abwählen",
        manage_btn_delete: "Löschen (%d)",
        manage_delete_confirm: "Möchten Sie wirklich %d ausgewählte Nachrichten aus dem lokalen Verlauf löschen?",
        manage_empty: "Keine Nachrichten zum Verwalten im Verlauf.",
        manage_filter_placeholder: "Zum Löschen filtern...",
        slide_down_show_chart_title: "Chart anzeigen",
        slide_down_show_chart_desc_on: "Auf Hauptbildschirm sichtbar",
        slide_down_show_chart_desc_off: "Ausgeblendet (nur Feed)",
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
let manageSearchQuery = "";
let selectedManageNewsIds = new Set();
let sourceManageSearchQuery = "";

// Date Range Filter State (Default: "today", "all" at the end)
let dateFilterPreset = "today";
let dateFilterFrom = "";
let dateFilterTo = "";

function formatDateIso(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function initDefaultDateFilter() {
    const now = new Date();
    dateFilterPreset = "today";
    dateFilterFrom = formatDateIso(now);
    dateFilterTo = formatDateIso(now);
}

function setDatePreset(preset) {
    dateFilterPreset = preset;
    const now = new Date();
    if (preset === 'today') {
        dateFilterFrom = formatDateIso(now);
        dateFilterTo = formatDateIso(now);
    } else if (preset === '7d') {
        const past7 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        dateFilterFrom = formatDateIso(past7);
        dateFilterTo = formatDateIso(now);
    } else if (preset === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        dateFilterFrom = formatDateIso(startOfMonth);
        dateFilterTo = formatDateIso(now);
    } else if (preset === 'all') {
        dateFilterFrom = "";
        dateFilterTo = "";
    }
    updateDateFilterInputs();
    if (currentAppState) renderState(currentAppState);
}

function toggleCustomDateBox() {
    const box = document.getElementById('dateCustomInputsBox');
    const chip = document.getElementById('chipDateCustom');
    if (!box) return;
    const isHidden = box.style.display === 'none';
    box.style.display = isHidden ? 'flex' : 'none';
    if (chip) chip.classList.toggle('active', isHidden || dateFilterPreset === 'custom');
}

function onDateInputChange() {
    const inputFrom = document.getElementById('inputDateFrom');
    const inputTo = document.getElementById('inputDateTo');
    dateFilterFrom = inputFrom ? inputFrom.value : "";
    dateFilterTo = inputTo ? inputTo.value : "";
    dateFilterPreset = "custom";
    if (currentAppState) renderState(currentAppState);
}

function isWithinDateRange(publishedAtMillis, fromStr, toStr) {
    if (!publishedAtMillis) return true;
    if (fromStr) {
        const parts = fromStr.split('-').map(Number);
        if (parts.length === 3 && !isNaN(parts[0])) {
            const fromMillis = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0).getTime();
            if (publishedAtMillis < fromMillis) return false;
        }
    }
    if (toStr) {
        const parts = toStr.split('-').map(Number);
        if (parts.length === 3 && !isNaN(parts[0])) {
            const toMillis = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59, 999).getTime();
            if (publishedAtMillis > toMillis) return false;
        }
    }
    return true;
}

function updateDateFilterInputs() {
    const inputFrom = document.getElementById('inputDateFrom');
    const inputTo = document.getElementById('inputDateTo');
    if (inputFrom && document.activeElement !== inputFrom) inputFrom.value = dateFilterFrom;
    if (inputTo && document.activeElement !== inputTo) inputTo.value = dateFilterTo;
}

function updateDateFilterUI() {
    const lblDate = document.getElementById('lblDateFilter');
    const chipToday = document.getElementById('chipDateToday');
    const chip7d = document.getElementById('chipDate7d');
    const chipMonth = document.getElementById('chipDateMonth');
    const chipCustom = document.getElementById('chipDateCustom');
    const chipAll = document.getElementById('chipDateAll');
    const lblFrom = document.getElementById('lblDateFrom');
    const lblTo = document.getElementById('lblDateTo');
    const btnClear = document.getElementById('btnClearDateFilter');

    if (lblDate) lblDate.innerText = '📅 ' + t('date_filter_label');
    if (chipToday) {
        chipToday.innerText = t('date_filter_today');
        chipToday.classList.toggle('active', dateFilterPreset === 'today');
    }
    if (chip7d) {
        chip7d.innerText = t('date_filter_7d');
        chip7d.classList.toggle('active', dateFilterPreset === '7d');
    }
    if (chipMonth) {
        chipMonth.innerText = t('date_filter_month');
        chipMonth.classList.toggle('active', dateFilterPreset === 'month');
    }
    if (chipCustom) {
        chipCustom.innerText = t('date_filter_custom');
        const box = document.getElementById('dateCustomInputsBox');
        const isBoxOpen = box && box.style.display !== 'none';
        chipCustom.classList.toggle('active', dateFilterPreset === 'custom' || isBoxOpen);
    }
    if (chipAll) {
        chipAll.innerText = t('date_filter_all');
        chipAll.classList.toggle('active', dateFilterPreset === 'all');
    }
    if (lblFrom) lblFrom.innerText = t('date_filter_from');
    if (lblTo) lblTo.innerText = t('date_filter_to');
    if (btnClear) btnClear.title = t('date_filter_clear_hint');

    updateDateFilterInputs();
}

initDefaultDateFilter();

function formatIntervalText(sec) {
    if (!sec || sec < 60) return `${sec || 60} s`;
    const min = Math.round(sec / 60);
    if (sec % 60 === 0) {
        return `${sec} s (${min} min)`;
    }
    return `${sec} s (~${min} min)`;
}

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
// 🎛️ SLIDE-DOWN FILTER & ALARM BAR LOGIC
// =========================================================================
let isSlideDownOpen = false;

function toggleSlideDown(open) {
    const panel = document.getElementById('slideDownPanel');
    const container = document.getElementById('slideDownContainer');
    const toggleTxt = document.getElementById('txtSlideDownToggle');
    if (!panel || !container) return;

    if (open !== undefined) {
        isSlideDownOpen = Boolean(open);
    } else {
        isSlideDownOpen = !isSlideDownOpen;
    }

    if (isSlideDownOpen) {
        panel.style.display = 'block';
        container.classList.add('open');
        if (toggleTxt) toggleTxt.innerText = t('slide_down_collapse');
    } else {
        panel.style.display = 'none';
        container.classList.remove('open');
        if (toggleTxt) toggleTxt.innerText = t('slide_down_expand');
    }
}

function updateSlideDownTriggerUI(state) {
    if (!state) return;
    const pillAlarm = document.getElementById('pillAlarmStatus');
    const txtAlarm = document.getElementById('txtSlideDownAlarm');
    const pillFilters = document.getElementById('pillFiltersStatus');
    const txtFilters = document.getElementById('txtSlideDownFilters');
    const txtDate = document.getElementById('txtSlideDownDate');
    const txtSearch = document.getElementById('txtSlideDownSearch');
    const triggerBar = document.getElementById('slideDownTriggerBar');
    const toggleTxt = document.getElementById('txtSlideDownToggle');
    const collapseTxt = document.getElementById('txtCollapseSlideDown');

    if (toggleTxt) toggleTxt.innerText = isSlideDownOpen ? t('slide_down_collapse') : t('slide_down_expand');
    if (collapseTxt) collapseTxt.innerText = t('slide_down_collapse');

    // 1. Alarm status pill
    if (pillAlarm && txtAlarm) {
        if (state.alarmEnabled) {
            pillAlarm.classList.add('active');
            txtAlarm.innerText = t('slide_down_alarm_on');
        } else {
            pillAlarm.classList.remove('active');
            txtAlarm.innerText = t('slide_down_alarm_off');
        }
    }

    // 2. Active filters count
    const selFilters = state.selectedSourceFilters || [];
    const hasSpecificSources = selFilters.length > 0 && !selFilters.some(f => f === 'Wszystkie' || f === 'All' || f === 'Alle');
    const sourcesCount = hasSpecificSources ? selFilters.length : 0;
    const keywordsCount = (state.keywords || []).length;
    const searchCount = (newsSearchQuery && newsSearchQuery.trim().length > 0) ? 1 : 0;
    const dateCount = (dateFilterPreset !== 'today') ? 1 : 0;
    const totalActive = sourcesCount + keywordsCount + searchCount + dateCount;

    if (pillFilters && txtFilters && triggerBar) {
        if (totalActive > 0) {
            pillFilters.classList.add('active');
            txtFilters.innerText = t('slide_down_filters_active', totalActive);
            triggerBar.classList.add('has-active-filters');
        } else {
            pillFilters.classList.remove('active');
            txtFilters.innerText = t('slide_down_filters_all');
            triggerBar.classList.remove('has-active-filters');
        }
    }

    // 3. Date label
    if (txtDate) {
        txtDate.innerText = '• ' + t('date_filter_' + dateFilterPreset);
    }

    // 4. Search label
    if (txtSearch) {
        if (newsSearchQuery && newsSearchQuery.trim().length > 0) {
            txtSearch.style.display = 'inline';
            txtSearch.innerText = '• "' + newsSearchQuery.trim() + '"';
            txtSearch.classList.add('highlight');
        } else {
            txtSearch.style.display = 'none';
            txtSearch.innerText = '';
            txtSearch.classList.remove('highlight');
        }
    }
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

    // 2b. Global Chart Toggle Bar
    const chkChart = document.getElementById('chkChartToggle');
    if (chkChart) {
        chkChart.checked = state.showChart !== false;
        const txtChartTitle = document.getElementById('txtChartTitle');
        if (txtChartTitle) txtChartTitle.innerText = t('slide_down_show_chart_title');
        const txtChartStatus = document.getElementById('txtChartStatus');
        if (txtChartStatus) {
            txtChartStatus.innerText = state.showChart !== false ? t('slide_down_show_chart_desc_on') : t('slide_down_show_chart_desc_off');
        }
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

    // 7b. Update Slide-down Bar Trigger UI
    updateSlideDownTriggerUI(state);

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
    const lblNavManage = document.getElementById('lblNavManage');
    if (lblNavManage) lblNavManage.innerText = t('nav_manage');
    const lblNavFeed = document.getElementById('lblNavFeed');
    if (lblNavFeed) lblNavFeed.innerText = t('nav_feed');
    document.getElementById('lblNavNew').innerText = t('nav_new');
    document.getElementById('lblNavFav').innerText = t('nav_fav');
    document.getElementById('lblNavSettings').innerText = t('nav_settings');

    // 10. Switch visible view tab & Render News Cards
    const viewFeed = document.getElementById('viewFeed');
    const chartSection = document.getElementById('chartSection');
    const viewManage = document.getElementById('viewManage');
    const viewNew = document.getElementById('viewNew');
    const viewFavorites = document.getElementById('viewFavorites');
    const viewSettings = document.getElementById('viewSettings');

    viewFeed.style.display = 'none';
    if (viewManage) viewManage.style.display = 'none';
    if (viewNew) viewNew.style.display = 'none';
    viewFavorites.style.display = 'none';
    viewSettings.style.display = 'none';

    const baseNewsList = state.newsList || [];

    if (state.currentTab === 'CHART_AND_FEED' || state.currentTab === 'FEED_ONLY') {
        viewFeed.style.display = 'flex';
        chartSection.style.display = state.showChart !== false ? 'block' : 'none';

        const q = newsSearchQuery.toLowerCase().trim();
        const filtered = baseNewsList.filter(n => {
            if (q) {
                const matchesQ = (n.title && n.title.toLowerCase().includes(q)) ||
                                 (n.description && n.description.toLowerCase().includes(q)) ||
                                 (n.source && n.source.toLowerCase().includes(q)) ||
                                 (n.tag && n.tag.toLowerCase().includes(q));
                if (!matchesQ) return false;
            }
            if (!isWithinDateRange(n.publishedAtMillis, dateFilterFrom, dateFilterTo)) {
                return false;
            }
            return true;
        });

        document.getElementById('txtNewsCount').innerText = t('news_title', filtered.length);
        document.getElementById('txtNewsHint').innerText = t('news_hint');
        const inputNews = document.getElementById('inputNewsSearch');
        if (inputNews) inputNews.placeholder = t('news_search_placeholder');
        renderNewsCards(filtered, state.selectedNewsID, document.getElementById('newsCardsList'));
        updateDateFilterUI();
    } else if (state.currentTab === 'MANAGE') {
        if (viewManage) {
            viewManage.style.display = 'flex';
            renderManageView(baseNewsList);
        }
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
    const chipsBar = document.getElementById('activeSourceChipsBar');
    if (!btnLabel || !chipsContainer) return;

    const hasAll = !selectedFilters || selectedFilters.length === 0 ||
        selectedFilters.some(f => f === 'Wszystkie' || f === 'All' || f === 'Alle');

    if (hasAll) {
        btnLabel.innerText = t('sources_filter_btn_all');
        if (chipsBar) chipsBar.style.display = 'none';
    } else {
        btnLabel.innerText = t('sources_filter_btn_selected', selectedFilters.length);
        if (chipsBar) chipsBar.style.display = 'flex';
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
        return s.name.toLowerCase().includes(query) || 
               (s.description && s.description.toLowerCase().includes(query)) ||
               s.url.toLowerCase().includes(query);
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
                    ${src.description ? `<div class="select2-source-desc">${escapeHtml(src.description)}</div>` : ''}
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

// Format News for Clipboard (Provider Y-m-d:\nSummary\n\nLink)
function formatNewsForClipboard(news) {
    let dateStr = '';
    const ts = (news && news.publishedAtMillis && news.publishedAtMillis > 0) ? news.publishedAtMillis : Date.now();
    const d = new Date(ts);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dateStr = `${y}-${m}-${day}`;

    let message = (news && news.title ? news.title : '').trim();
    if (news && news.description && news.description.startsWith('PROGNOZA:')) {
        message += `\n${news.description.trim()}`;
    }

    let text = `${(news && news.source) || ''} ${dateStr}:\n${message}`;
    if (news && news.url && news.url.trim()) {
        text += `\n\n${news.url.trim()}`;
    }
    return text;
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
                <div class="card-links-row">
                    <span class="link-btn-copy" title="${t('copy_news')}">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px; margin-right: 3px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>${t('copy_action')}</span>
                    </span>
                    ${news.url ? `
                        <span class="link-btn-share">${t('share_link')}</span>
                        <span class="link-btn-open">${t('open_link')}</span>
                    ` : ''}
                </div>
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

        const copyBtn = card.querySelector('.link-btn-copy');
        if (copyBtn) {
            copyBtn.onclick = (e) => {
                e.stopPropagation();
                const copyText = formatNewsForClipboard(news);
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(copyText);
                } else {
                    const textArea = document.createElement("textarea");
                    textArea.value = copyText;
                    textArea.style.position = "fixed";
                    textArea.style.opacity = "0";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    try { document.execCommand('copy'); } catch (_) {}
                    document.body.removeChild(textArea);
                }
                const label = copyBtn.querySelector('span');
                if (label) {
                    label.innerText = t('copied_status');
                    setTimeout(() => { label.innerText = t('copy_action'); }, 1500);
                }
            };
        }

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

function renderManageView(newsList) {
    const txtManageTitle = document.getElementById('txtManageTitle');
    if (txtManageTitle) txtManageTitle.innerText = t('manage_title');
    const lblManageSelectAll = document.getElementById('lblManageSelectAll');
    if (lblManageSelectAll) lblManageSelectAll.innerText = t('manage_select_all');
    const btnManageDeselect = document.getElementById('btnManageDeselect');
    if (btnManageDeselect) btnManageDeselect.innerText = t('manage_uncheck_all');
    const inputManageSearch = document.getElementById('inputManageSearch');
    if (inputManageSearch) inputManageSearch.placeholder = t('manage_filter_placeholder');

    const q = manageSearchQuery.toLowerCase().trim();
    const filtered = (newsList || []).filter(n => {
        if (!q) return true;
        return (n.title && n.title.toLowerCase().includes(q)) ||
               (n.description && n.description.toLowerCase().includes(q)) ||
               (n.source && n.source.toLowerCase().includes(q)) ||
               (n.tag && n.tag.toLowerCase().includes(q));
    });

    const txtManageSelectedCount = document.getElementById('txtManageSelectedCount');
    if (txtManageSelectedCount) {
        txtManageSelectedCount.innerText = t('manage_selected_count', selectedManageNewsIds.size, filtered.length);
    }
    const txtManageBottomCount = document.getElementById('txtManageBottomCount');
    if (txtManageBottomCount) {
        txtManageBottomCount.innerText = t('manage_selected_short', selectedManageNewsIds.size);
    }
    const btnManageDelete = document.getElementById('btnManageDelete');
    if (btnManageDelete) {
        btnManageDelete.disabled = selectedManageNewsIds.size === 0;
    }
    const lblManageDeleteBtn = document.getElementById('lblManageDeleteBtn');
    if (lblManageDeleteBtn) {
        lblManageDeleteBtn.innerText = t('manage_btn_delete', selectedManageNewsIds.size);
    }

    const chkManageSelectAll = document.getElementById('chkManageSelectAll');
    if (chkManageSelectAll) {
        chkManageSelectAll.checked = filtered.length > 0 && filtered.every(n => selectedManageNewsIds.has(n.id));
    }
    if (btnManageDeselect) {
        btnManageDeselect.style.display = selectedManageNewsIds.size > 0 ? 'block' : 'none';
    }

    renderManageNewsCards(filtered, document.getElementById('manageNewsCardsList'));
}

function renderManageNewsCards(newsList, container) {
    if (!container) return;
    container.innerHTML = '';

    if (!newsList || newsList.length === 0) {
        const emptyBox = document.createElement('div');
        emptyBox.className = 'empty-state-box';
        emptyBox.innerHTML = `<div class="empty-title" style="color: #8B949E; font-size: 13px;">${t('manage_empty')}</div>`;
        container.appendChild(emptyBox);
        return;
    }

    newsList.forEach(news => {
        const wrapper = document.createElement('div');
        wrapper.className = 'manage-news-card-wrapper';

        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.className = 'manage-card-checkbox';
        chk.checked = selectedManageNewsIds.has(news.id);

        const card = document.createElement('div');
        card.className = `news-card ${chk.checked ? 'selected' : ''}`;
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <div class="card-top-row">
                <div class="card-source-badge" style="color: ${news.colorHex};">
                    <span class="card-source-dot" style="background: ${news.colorHex};"></span>
                    <span>${escapeHtml(news.source)}</span>
                </div>
                <div class="card-meta-right">
                    <span class="card-time">${escapeHtml(news.formattedTime)}</span>
                </div>
            </div>
            <div class="card-title">${escapeHtml(news.title)}</div>
        `;

        const toggleSelection = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            if (selectedManageNewsIds.has(news.id)) {
                selectedManageNewsIds.delete(news.id);
                chk.checked = false;
                card.classList.remove('selected');
            } else {
                selectedManageNewsIds.add(news.id);
                chk.checked = true;
                card.classList.add('selected');
            }
            if (currentAppState) {
                renderManageView(currentAppState.newsList);
            }
        };

        chk.addEventListener('change', toggleSelection);
        card.addEventListener('click', toggleSelection);

        wrapper.appendChild(chk);
        wrapper.appendChild(card);
        container.appendChild(wrapper);
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
    const newsList = (currentAppState.newsList || []).filter(n => isWithinDateRange(n.publishedAtMillis, dateFilterFrom, dateFilterTo));
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
               (s.description && s.description.toLowerCase().includes(q)) ||
               (s.url && s.url.toLowerCase().includes(q)) ||
               (s.id && s.id.toLowerCase().includes(q));
    });

    // Master Select All checkbox logic
    const chkToggleAll = document.getElementById('chkToggleAllSources');
    const lblToggleAll = document.getElementById('lblToggleAllSources');
    const txtCounter = document.getElementById('txtSourcesActiveCounter');
    if (lblToggleAll) lblToggleAll.innerText = t('sources_manage_select_all');

    const totalVisibleCount = allSources.length;
    const activeVisibleCount = allSources.filter(s => s.isActive).length;

    if (chkToggleAll && txtCounter) {
        txtCounter.innerText = `${activeVisibleCount} / ${totalVisibleCount}`;
        chkToggleAll.disabled = totalVisibleCount === 0;
        if (totalVisibleCount === 0) {
            chkToggleAll.checked = false;
            chkToggleAll.indeterminate = false;
        } else if (activeVisibleCount === totalVisibleCount) {
            chkToggleAll.checked = true;
            chkToggleAll.indeterminate = false;
        } else if (activeVisibleCount === 0) {
            chkToggleAll.checked = false;
            chkToggleAll.indeterminate = false;
        } else {
            chkToggleAll.checked = false;
            chkToggleAll.indeterminate = true;
        }

        chkToggleAll.onclick = () => {
            const shouldActivate = activeVisibleCount < totalVisibleCount;
            const targetIDs = q ? allSources.map(s => s.id) : [];
            window.go.main.App.ToggleAllSources(shouldActivate, targetIDs).then(renderState);
        };
    }

    const isX = s => s.type === 'X' || s.id.startsWith('x_') || s.url.includes('x.com') || s.url.includes('twitter.com');
    const isTg = s => (s.type === 'TELEGRAM' || s.id.startsWith('tg_') || s.url.includes('t.me/')) && !isX(s);

    const xSources = allSources.filter(isX).sort((a, b) => a.name.localeCompare(b.name));
    const tgSources = allSources.filter(isTg).sort((a, b) => a.name.localeCompare(b.name));
    const genSources = allSources.filter(s => !isX(s) && !isTg(s)).sort((a, b) => a.name.localeCompare(b.name));

    const defaultIds = [
        'x_saylor', 'x_elonmusk', 'x_vitalik', 'x_realdonaldtrump', 'x_erictrump',
        'x_iohk_charles', 'x_aeyakovenko', 'x_bgarlinghouse', 'x_cz_binance',
        'x_brian_armstrong', 'x_vladtenev', 'x_cryptohayes', 'x_paoloardoino', 'x_ericbalchunas',
        'x_jseyffart', 'x_lynaldencontact', 'x_zachxbt', 'x_ki_young_ju',
        'x_woonomic', 'x_pentosh1', 'x_gcrclassic',
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
                    ${src.description ? `<div class="source-card-desc">${escapeHtml(src.description)}</div>` : ''}
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

        const btnShareXQR = document.getElementById('btnShareXQR');
        if (btnShareXQR) {
            btnShareXQR.style.display = state.isXLoggedIn ? 'inline-block' : 'none';
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

    document.getElementById('txtCardIntervalsHeader').innerText = t('section_intervals');
    document.getElementById('txtRowCheckInterval').innerText = t('interval_day_title');
    document.getElementById('txtRowCheckIntervalDesc').innerText = t('interval_day_desc');
    document.getElementById('valCheckInterval').innerText = formatIntervalText(state.checkInterval || 60);

    document.getElementById('txtRowNightCheckInterval').innerText = t('interval_night_title');
    document.getElementById('txtRowNightCheckIntervalDesc').innerText = t('interval_night_desc');
    document.getElementById('valNightCheckInterval').innerText = formatIntervalText(state.nightCheckInterval || 900);

    const txtRowXCheck = document.getElementById('txtRowXCheckInterval');
    if (txtRowXCheck) txtRowXCheck.innerText = t('interval_x_day_title');
    const txtRowXCheckDesc = document.getElementById('txtRowXCheckIntervalDesc');
    if (txtRowXCheckDesc) txtRowXCheckDesc.innerText = t('interval_x_day_desc');
    const valXCheck = document.getElementById('valXCheckInterval');
    if (valXCheck) valXCheck.innerText = formatIntervalText(state.xCheckInterval || 300);

    const txtRowXNightCheck = document.getElementById('txtRowXNightCheckInterval');
    if (txtRowXNightCheck) txtRowXNightCheck.innerText = t('interval_x_night_title');
    const txtRowXNightCheckDesc = document.getElementById('txtRowXNightCheckIntervalDesc');
    if (txtRowXNightCheckDesc) txtRowXNightCheckDesc.innerText = t('interval_x_night_desc');
    const valXNightCheck = document.getElementById('valXNightCheckInterval');
    if (valXNightCheck) valXNightCheck.innerText = formatIntervalText(state.xNightCheckInterval || 600);

    const txtModalCheckTitle = document.getElementById('txtModalCheckIntervalTitle');
    if (txtModalCheckTitle) txtModalCheckTitle.innerText = t('modal_interval_day_title');
    const txtModalCheckHint = document.getElementById('txtModalCheckIntervalHint');
    if (txtModalCheckHint) txtModalCheckHint.innerText = t('modal_interval_day_hint');

    const txtModalNightCheckTitle = document.getElementById('txtModalNightCheckIntervalTitle');
    if (txtModalNightCheckTitle) txtModalNightCheckTitle.innerText = t('modal_interval_night_title');
    const txtModalNightCheckHint = document.getElementById('txtModalNightCheckIntervalHint');
    if (txtModalNightCheckHint) txtModalNightCheckHint.innerText = t('modal_interval_night_hint');

    const txtModalXTitle = document.getElementById('txtModalXCheckIntervalTitle');
    if (txtModalXTitle) txtModalXTitle.innerText = t('modal_interval_x_day_title');
    const txtModalXHint = document.getElementById('txtModalXCheckIntervalHint');
    if (txtModalXHint) txtModalXHint.innerText = t('modal_interval_x_day_hint');

    const txtModalXNightTitle = document.getElementById('txtModalXNightCheckIntervalTitle');
    if (txtModalXNightTitle) txtModalXNightTitle.innerText = t('modal_interval_x_night_title');
    const txtModalXNightHint = document.getElementById('txtModalXNightCheckIntervalHint');
    if (txtModalXNightHint) txtModalXNightHint.innerText = t('modal_interval_x_night_hint');

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

    const rowCutoff = document.getElementById('txtRowHistoryCutoff');
    if (rowCutoff) rowCutoff.innerText = t('history_cutoff_title');
    const rowCutoffDesc = document.getElementById('txtRowHistoryCutoffDesc');
    if (rowCutoffDesc) rowCutoffDesc.innerText = t('history_cutoff_desc');
    const cutoffEl = document.getElementById('valHistoryCutoff');
    if (cutoffEl) {
        if (!state.historyClearedAt || state.historyClearedAt <= 0) {
            cutoffEl.innerText = t('history_cutoff_no_limit');
        } else {
            const d = new Date(state.historyClearedAt);
            const pad = n => String(n).padStart(2, '0');
            cutoffEl.innerText = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
        }
    }

    const txtModalCutoffTitle = document.getElementById('txtModalCutoffTitle');
    if (txtModalCutoffTitle) txtModalCutoffTitle.innerText = t('modal_cutoff_title');
    const txtModalCutoffHint = document.getElementById('txtModalCutoffHint');
    if (txtModalCutoffHint) txtModalCutoffHint.innerText = t('modal_cutoff_hint');
    const btnCutoffNow = document.getElementById('btnCutoffNow');
    if (btnCutoffNow) btnCutoffNow.innerText = t('cutoff_preset_now');
    const btnCutoffToday = document.getElementById('btnCutoffToday');
    if (btnCutoffToday) btnCutoffToday.innerText = t('cutoff_preset_today');
    const btnCutoff24h = document.getElementById('btnCutoff24h');
    if (btnCutoff24h) btnCutoff24h.innerText = t('cutoff_preset_24h');
    const btnCutoff3d = document.getElementById('btnCutoff3d');
    if (btnCutoff3d) btnCutoff3d.innerText = t('cutoff_preset_3d');
    const btnCutoff7d = document.getElementById('btnCutoff7d');
    if (btnCutoff7d) btnCutoff7d.innerText = t('cutoff_preset_7d');
    const btnCutoffThisMonth = document.getElementById('btnCutoffThisMonth');
    if (btnCutoffThisMonth) btnCutoffThisMonth.innerText = t('cutoff_preset_this_month');
    const btnCutoffLastMonth = document.getElementById('btnCutoffLastMonth');
    if (btnCutoffLastMonth) btnCutoffLastMonth.innerText = t('cutoff_preset_last_month');
    const btnCutoffThisYear = document.getElementById('btnCutoffThisYear');
    if (btnCutoffThisYear) btnCutoffThisYear.innerText = t('cutoff_preset_this_year');
    const btnCutoffAll = document.getElementById('btnCutoffAll');
    if (btnCutoffAll) btnCutoffAll.innerText = t('cutoff_preset_all');

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

    document.querySelectorAll('.preset-pill[data-limit]').forEach(pill => {
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
// ↔️ WINDOW RESIZE HANDLER (STRETCH DOWNWARDS & CORNER RESIZE)
// =========================================================================
function initWindowResizeHandler() {
    const handle = document.getElementById('widgetResizeHandle');
    const corner = document.getElementById('widgetResizeCorner');
    if (!handle) return;

    let isResizing = false;
    let isCorner = false;
    let startX = 0;
    let startY = 0;
    let startW = 0;
    let startH = 0;
    let rafId = null;

    function startResize(e, cornerMode) {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        isCorner = cornerMode;
        startX = e.screenX;
        startY = e.screenY;
        startW = window.innerWidth;
        startH = window.innerHeight;

        document.body.classList.add('resizing-active');
        if (isCorner) {
            document.body.classList.add('corner-active');
        }

        const onMouseMove = (moveEvent) => {
            if (!isResizing) return;
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                rafId = null;
                if (!isResizing) return;

                const deltaY = moveEvent.screenY - startY;
                let newH = Math.round(startH + deltaY);
                if (newH < 500) newH = 500;
                if (newH > 2500) newH = 2500;

                let newW = startW;
                if (isCorner) {
                    const deltaX = moveEvent.screenX - startX;
                    newW = Math.round(startW + deltaX);
                    if (newW < 380) newW = 380;
                    if (newW > 650) newW = 650;
                }

                if (window.go && window.go.main && window.go.main.App && window.go.main.App.SetWindowSize) {
                    window.go.main.App.SetWindowSize(newW, newH);
                }
            });
        };

        const onMouseUp = () => {
            if (!isResizing) return;
            isResizing = false;
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            document.body.classList.remove('resizing-active');
            document.body.classList.remove('corner-active');
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);

            if (window.go && window.go.main && window.go.main.App && window.go.main.App.SaveWindowSize) {
                window.go.main.App.SaveWindowSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    handle.addEventListener('mousedown', (e) => {
        if (e.target.closest('#widgetResizeCorner')) {
            startResize(e, true);
        } else {
            startResize(e, false);
        }
    });

    if (corner) {
        corner.addEventListener('mousedown', (e) => {
            startResize(e, true);
        });
    }

    // Double-click toggle height: 890px <-> 1250px
    handle.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const currentH = window.innerHeight;
        const targetH = currentH >= 1100 ? 890 : 1250;
        if (window.go && window.go.main && window.go.main.App && window.go.main.App.SaveWindowSize) {
            window.go.main.App.SaveWindowSize(window.innerWidth, targetH);
        }
    });

    // Re-render chart on window resize
    window.addEventListener('resize', () => {
        if (currentAppState && (currentAppState.currentTab === 'CHART_AND_FEED' || !currentAppState.currentTab)) {
            renderChart();
        }
    });
}

// =========================================================================
// 🚀 EVENT LISTENERS SETUP
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 0. Resize Handler
    initWindowResizeHandler();

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

    // 2c. Global Show Chart Toggle
    const chkChartToggle = document.getElementById('chkChartToggle');
    if (chkChartToggle) {
        chkChartToggle.onchange = (e) => {
            if (window.go && window.go.main && window.go.main.App && window.go.main.App.SetShowChart) {
                window.go.main.App.SetShowChart(e.target.checked).then(renderState);
            }
        };
    }

    // 2d. Manage News View Controls
    const chkManageSelectAll = document.getElementById('chkManageSelectAll');
    if (chkManageSelectAll) {
        chkManageSelectAll.onchange = (e) => {
            if (!currentAppState || !currentAppState.newsList) return;
            const q = manageSearchQuery.toLowerCase().trim();
            const filtered = currentAppState.newsList.filter(n => {
                if (!q) return true;
                return (n.title && n.title.toLowerCase().includes(q)) ||
                       (n.description && n.description.toLowerCase().includes(q)) ||
                       (n.source && n.source.toLowerCase().includes(q)) ||
                       (n.tag && n.tag.toLowerCase().includes(q));
            });
            if (e.target.checked) {
                filtered.forEach(n => selectedManageNewsIds.add(n.id));
            } else {
                filtered.forEach(n => selectedManageNewsIds.delete(n.id));
            }
            renderManageView(currentAppState.newsList);
        };
    }

    const btnManageDeselect = document.getElementById('btnManageDeselect');
    if (btnManageDeselect) {
        btnManageDeselect.onclick = () => {
            selectedManageNewsIds.clear();
            if (currentAppState) renderManageView(currentAppState.newsList);
        };
    }

    const inputManageSearch = document.getElementById('inputManageSearch');
    const btnClearManageSearch = document.getElementById('btnClearManageSearch');
    if (inputManageSearch && btnClearManageSearch) {
        inputManageSearch.oninput = (e) => {
            manageSearchQuery = e.target.value;
            btnClearManageSearch.style.display = manageSearchQuery ? 'block' : 'none';
            if (currentAppState) renderManageView(currentAppState.newsList);
        };
        btnClearManageSearch.onclick = () => {
            manageSearchQuery = '';
            inputManageSearch.value = '';
            btnClearManageSearch.style.display = 'none';
            if (currentAppState) renderManageView(currentAppState.newsList);
        };
    }

    const btnManageDelete = document.getElementById('btnManageDelete');
    if (btnManageDelete) {
        btnManageDelete.onclick = async () => {
            if (selectedManageNewsIds.size === 0) return;
            const confirmMsg = t('manage_delete_confirm', selectedManageNewsIds.size);
            if (confirm(confirmMsg)) {
                const ids = Array.from(selectedManageNewsIds);
                if (window.go && window.go.main && window.go.main.App && window.go.main.App.DeleteNews) {
                    const newState = await window.go.main.App.DeleteNews(ids);
                    selectedManageNewsIds.clear();
                    renderState(newState);
                }
            }
        };
    }

    // 2b. Slide-Down Bar Trigger & Collapse
    const triggerBar = document.getElementById('slideDownTriggerBar');
    if (triggerBar) {
        triggerBar.onclick = () => toggleSlideDown();
    }
    const btnCollapse = document.getElementById('btnCollapseSlideDown');
    if (btnCollapse) {
        btnCollapse.onclick = () => toggleSlideDown(false);
    }

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

    // Date Filter Presets & Inputs
    const chipDateToday = document.getElementById('chipDateToday');
    if (chipDateToday) chipDateToday.onclick = () => setDatePreset('today');

    const chipDate7d = document.getElementById('chipDate7d');
    if (chipDate7d) chipDate7d.onclick = () => setDatePreset('7d');

    const chipDateMonth = document.getElementById('chipDateMonth');
    if (chipDateMonth) chipDateMonth.onclick = () => setDatePreset('month');

    const chipDateCustom = document.getElementById('chipDateCustom');
    if (chipDateCustom) chipDateCustom.onclick = () => toggleCustomDateBox();

    const chipDateAll = document.getElementById('chipDateAll');
    if (chipDateAll) chipDateAll.onclick = () => setDatePreset('all');

    const btnClearDate = document.getElementById('btnClearDateFilter');
    if (btnClearDate) btnClearDate.onclick = () => setDatePreset('all');

    const inputDateFrom = document.getElementById('inputDateFrom');
    const inputDateTo = document.getElementById('inputDateTo');
    if (inputDateFrom) {
        inputDateFrom.onchange = onDateInputChange;
        inputDateFrom.oninput = onDateInputChange;
    }
    if (inputDateTo) {
        inputDateTo.onchange = onDateInputChange;
        inputDateTo.oninput = onDateInputChange;
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

    // Check Interval (Day)
    document.getElementById('rowEditCheckInterval').onclick = () => {
        document.getElementById('modalEditCheckInterval').style.display = 'flex';
        document.getElementById('inputCheckIntervalVal').value = currentAppState ? (currentAppState.checkInterval || 60) : 60;
    };
    document.getElementById('btnCancelCheckInterval').onclick = () => {
        document.getElementById('modalEditCheckInterval').style.display = 'none';
    };
    document.getElementById('btnConfirmCheckInterval').onclick = () => {
        const val = parseInt(document.getElementById('inputCheckIntervalVal').value, 10);
        if (val && val >= 5 && val <= 86400) {
            window.go.main.App.SetCheckInterval(val).then(renderState);
        }
        document.getElementById('modalEditCheckInterval').style.display = 'none';
    };
    document.querySelectorAll('.preset-interval-btn').forEach(btn => {
        btn.onclick = () => {
            const sec = parseInt(btn.getAttribute('data-sec'), 10);
            if (sec) {
                document.getElementById('inputCheckIntervalVal').value = sec;
            }
        };
    });

    // Night Check Interval (Night)
    document.getElementById('rowEditNightCheckInterval').onclick = () => {
        document.getElementById('modalEditNightCheckInterval').style.display = 'flex';
        document.getElementById('inputNightCheckIntervalVal').value = currentAppState ? (currentAppState.nightCheckInterval || 900) : 900;
    };
    document.getElementById('btnCancelNightCheckInterval').onclick = () => {
        document.getElementById('modalEditNightCheckInterval').style.display = 'none';
    };
    document.getElementById('btnConfirmNightCheckInterval').onclick = () => {
        const val = parseInt(document.getElementById('inputNightCheckIntervalVal').value, 10);
        if (val && val >= 5 && val <= 86400) {
            window.go.main.App.SetNightCheckInterval(val).then(renderState);
        }
        document.getElementById('modalEditNightCheckInterval').style.display = 'none';
    };
    document.querySelectorAll('.preset-night-interval-btn').forEach(btn => {
        btn.onclick = () => {
            const sec = parseInt(btn.getAttribute('data-sec'), 10);
            if (sec) {
                document.getElementById('inputNightCheckIntervalVal').value = sec;
            }
        };
    });

    // X Check Interval (Day)
    document.getElementById('rowEditXCheckInterval').onclick = () => {
        document.getElementById('modalEditXCheckInterval').style.display = 'flex';
        document.getElementById('inputXCheckIntervalVal').value = currentAppState ? (currentAppState.xCheckInterval || 300) : 300;
    };
    document.getElementById('btnCancelXCheckInterval').onclick = () => {
        document.getElementById('modalEditXCheckInterval').style.display = 'none';
    };
    document.getElementById('btnConfirmXCheckInterval').onclick = () => {
        const val = parseInt(document.getElementById('inputXCheckIntervalVal').value, 10);
        if (val && val >= 30 && val <= 86400) {
            window.go.main.App.SetXCheckInterval(val).then(renderState);
        }
        document.getElementById('modalEditXCheckInterval').style.display = 'none';
    };
    document.querySelectorAll('.preset-x-interval-btn').forEach(btn => {
        btn.onclick = () => {
            const sec = parseInt(btn.getAttribute('data-sec'), 10);
            if (sec) {
                document.getElementById('inputXCheckIntervalVal').value = sec;
            }
        };
    });

    // X Night Check Interval (Night)
    document.getElementById('rowEditXNightCheckInterval').onclick = () => {
        document.getElementById('modalEditXNightCheckInterval').style.display = 'flex';
        document.getElementById('inputXNightCheckIntervalVal').value = currentAppState ? (currentAppState.xNightCheckInterval || 600) : 600;
    };
    document.getElementById('btnCancelXNightCheckInterval').onclick = () => {
        document.getElementById('modalEditXNightCheckInterval').style.display = 'none';
    };
    document.getElementById('btnConfirmXNightCheckInterval').onclick = () => {
        const val = parseInt(document.getElementById('inputXNightCheckIntervalVal').value, 10);
        if (val && val >= 30 && val <= 86400) {
            window.go.main.App.SetXNightCheckInterval(val).then(renderState);
        }
        document.getElementById('modalEditXNightCheckInterval').style.display = 'none';
    };
    document.querySelectorAll('.preset-x-night-interval-btn').forEach(btn => {
        btn.onclick = () => {
            const sec = parseInt(btn.getAttribute('data-sec'), 10);
            if (sec) {
                document.getElementById('inputXNightCheckIntervalVal').value = sec;
            }
        };
    });

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

    // History Cutoff Date
    function toLocalIsoDateTime(ts) {
        if (!ts || ts <= 0) return '';
        const d = new Date(ts);
        const pad = n => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    const rowEditHistoryCutoff = document.getElementById('rowEditHistoryCutoff');
    const modalEditHistoryCutoff = document.getElementById('modalEditHistoryCutoff');
    const inputHistoryCutoff = document.getElementById('inputHistoryCutoff');

    if (rowEditHistoryCutoff) {
        rowEditHistoryCutoff.onclick = () => {
            modalEditHistoryCutoff.style.display = 'flex';
            const currentTs = currentAppState ? (currentAppState.historyClearedAt || 0) : 0;
            inputHistoryCutoff.value = toLocalIsoDateTime(currentTs);
            document.querySelectorAll('.preset-pill[data-cutoff]').forEach(p => p.classList.remove('active'));
        };
    }

    document.querySelectorAll('.preset-pill[data-cutoff]').forEach(pill => {
        pill.onclick = () => {
            const cutoffKey = pill.getAttribute('data-cutoff');
            let targetTs = 0;
            const now = Date.now();
            if (cutoffKey === 'now') {
                targetTs = now;
            } else if (cutoffKey === 'today') {
                const d = new Date();
                d.setHours(0, 0, 0, 0);
                targetTs = d.getTime();
            } else if (cutoffKey === '24h') {
                targetTs = now - 24 * 3600 * 1000;
            } else if (cutoffKey === '3d') {
                targetTs = now - 3 * 24 * 3600 * 1000;
            } else if (cutoffKey === '7d') {
                targetTs = now - 7 * 24 * 3600 * 1000;
            } else if (cutoffKey === 'this_month') {
                const d = new Date();
                d.setDate(1);
                d.setHours(0, 0, 0, 0);
                targetTs = d.getTime();
            } else if (cutoffKey === 'last_month') {
                const d = new Date();
                d.setMonth(d.getMonth() - 1, 1);
                d.setHours(0, 0, 0, 0);
                targetTs = d.getTime();
            } else if (cutoffKey === 'this_year') {
                const d = new Date();
                d.setMonth(0, 1);
                d.setHours(0, 0, 0, 0);
                targetTs = d.getTime();
            } else if (cutoffKey === 'all') {
                targetTs = 0;
            }
            inputHistoryCutoff.value = toLocalIsoDateTime(targetTs);
            document.querySelectorAll('.preset-pill[data-cutoff]').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        };
    });

    const btnCancelHistoryCutoff = document.getElementById('btnCancelHistoryCutoff');
    if (btnCancelHistoryCutoff) {
        btnCancelHistoryCutoff.onclick = () => {
            modalEditHistoryCutoff.style.display = 'none';
        };
    }

    const btnConfirmHistoryCutoff = document.getElementById('btnConfirmHistoryCutoff');
    if (btnConfirmHistoryCutoff) {
        btnConfirmHistoryCutoff.onclick = () => {
            const rawVal = inputHistoryCutoff.value.trim();
            let ts = 0;
            if (rawVal) {
                const parsed = new Date(rawVal).getTime();
                if (!isNaN(parsed) && parsed > 0) {
                    ts = parsed;
                }
            }
            window.go.main.App.SetNewsFetchCutoffMillis(ts).then(renderState);
            modalEditHistoryCutoff.style.display = 'none';
        };
    }


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

    // X Session QR Code Modal
    const btnShareXQR = document.getElementById('btnShareXQR');
    const modalXSessionQR = document.getElementById('modalXSessionQR');
    const imgXSessionQR = document.getElementById('imgXSessionQR');
    const btnCloseXSessionQR = document.getElementById('btnCloseXSessionQR');

    if (btnShareXQR) {
        btnShareXQR.onclick = () => {
            if (window.go && window.go.main && window.go.main.App && window.go.main.App.GetXSessionQR) {
                window.go.main.App.GetXSessionQR().then(dataUrl => {
                    if (imgXSessionQR) imgXSessionQR.src = dataUrl;
                    if (modalXSessionQR) modalXSessionQR.style.display = 'flex';
                }).catch(err => {
                    alert('Błąd pobierania kodu QR sesji X: ' + err);
                });
            } else {
                alert('Brak wsparcia generowania kodu QR sesji');
            }
        };
    }
    if (btnCloseXSessionQR && modalXSessionQR) {
        btnCloseXSessionQR.onclick = () => {
            modalXSessionQR.style.display = 'none';
        };
    }

    // Add X Source Modal
    const btnAddXSource = document.getElementById('btnAddXSource');
    const modalAddX = document.getElementById('modalAddX');
    const inputXHandle = document.getElementById('inputXHandle');
    const inputXName = document.getElementById('inputXName');
    const inputXDesc = document.getElementById('inputXDesc');
    const btnCancelX = document.getElementById('btnCancelX');
    const btnConfirmX = document.getElementById('btnConfirmX');

    if (btnAddXSource && modalAddX) {
        btnAddXSource.onclick = () => {
            modalAddX.style.display = 'flex';
            inputXHandle.value = '';
            inputXName.value = '';
            if (inputXDesc) inputXDesc.value = '';
            inputXHandle.focus();
        };
        btnCancelX.onclick = () => {
            modalAddX.style.display = 'none';
        };
        btnConfirmX.onclick = () => {
            const handle = inputXHandle.value.trim();
            const name = inputXName.value.trim();
            const desc = inputXDesc ? inputXDesc.value.trim() : '';
            if (handle) {
                window.go.main.App.AddXSource(handle, name, desc).then(renderState);
            }
            modalAddX.style.display = 'none';
        };
    }

    // Add Telegram Source
    document.getElementById('btnAddTelegramSource').onclick = () => {
        document.getElementById('modalAddTelegram').style.display = 'flex';
        document.getElementById('inputTelegramHandle').value = '';
        document.getElementById('inputTelegramName').value = '';
        const descInput = document.getElementById('inputTelegramDesc');
        if (descInput) descInput.value = '';
    };
    document.getElementById('btnCancelTelegram').onclick = () => {
        document.getElementById('modalAddTelegram').style.display = 'none';
    };
    document.getElementById('btnConfirmTelegram').onclick = () => {
        const handle = document.getElementById('inputTelegramHandle').value.trim();
        const name = document.getElementById('inputTelegramName').value.trim();
        const descInput = document.getElementById('inputTelegramDesc');
        const desc = descInput ? descInput.value.trim() : '';
        if (handle) {
            window.go.main.App.AddTelegramSource(handle, name, desc).then(renderState);
        }
        document.getElementById('modalAddTelegram').style.display = 'none';
    };

    // Add RSS / Atom Source
    document.getElementById('btnAddRssSource').onclick = () => {
        document.getElementById('modalAddRss').style.display = 'flex';
        document.getElementById('inputRssUrl').value = '';
        document.getElementById('inputRssName').value = '';
        const descInput = document.getElementById('inputRssDesc');
        if (descInput) descInput.value = '';
    };
    document.getElementById('btnCancelRss').onclick = () => {
        document.getElementById('modalAddRss').style.display = 'none';
    };
    document.getElementById('btnConfirmRss').onclick = () => {
        const url = document.getElementById('inputRssUrl').value.trim();
        const name = document.getElementById('inputRssName').value.trim();
        const descInput = document.getElementById('inputRssDesc');
        const desc = descInput ? descInput.value.trim() : '';
        if (url) {
            window.go.main.App.AddRssSource(url, name, desc).then(renderState);
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
