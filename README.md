# Crypto News Desktop Widget (Wails / Go) 📱

Aplikacja widgetowa w technologii **Wails (Go + HTML5/CSS/JS Canvas)** odwzorowująca 1:1 funkcjonalność oraz wygląd aplikacji mobilnej Android w ramce nowoczesnego smartfona / emulatora na pulpicie.

---

## 🌟 Funkcje i wygląd

1. **Obudowa smartfona (Phone Emulator Frame)**:
   - Realistyczna ramka telefonu z zaokrąglonymi rogami, wyspą z głośnikiem i aparatem,
   - Przycisk przypinania okna na wierzchu (Always On Top 📌),
   - Przyciski minimalizacji (−) i zamknięcia (✕),
   - Możliwość swobodnego przeciągania widgetu po pulpicie (`--wails-draggable`).

2. **4 Główne Zakładki (Bottom Navigation)**:
   - **📈 Wykres & News**:
     - Wybór pary z listy obserwowanych (ADA, BTC, ETH, SOL, XRP itd.) wraz z kursem Binance Spot oraz zmianą 24h,
     - Czysty wykres cenowy (Canvas) z podświetlanymi punktami newsów w czasie i na cenie oraz pulsującą animacją zaznaczonego newsa,
     - Pasek filtrów słów kluczowych (+ Słowo, tagi),
     - Pasek filtrów źródeł (Wszystkie, Makro, TG, Cointelegraph, CoinDesk, Reddit itd.),
     - Karty newsów z prognozami makro (PROGNOZA / POPRZEDNI), gwiazdkami ulubionych oraz linkami.
   - **📰 Tylko Feed**:
     - Pełnoekranowy widok feedu wiadomości bez wykresu.
   - **⭐ Ulubione**:
     - Zapisane wiadomości z możliwością filtrowania i odczytu.
   - **⚙️ Ustawienia** (z 3 pod-zakładkami):
     - 🪙 **Pary**: Wyszukiwarka par USDT, pobieranie par na żywo z Binance Spot API, włączanie/wyłączanie obserwowanych par,
     - 📡 **Źródła**: Włączanie/wyłączanie poszczególnych źródeł RSS, Telegram, Reddit, CryptoPanic (z polem na token API),
     - ⚙️ **Aplikacja & Noc**:
       - Alarm wibracyjny / dźwiękowy z regulacją liczby powtórzeń (1–30),
       - Tryb nocny (wyciszanie z edycją godzin Od / Do),
       - Zmiana języka (🇵🇱 Polski, 🇬🇧 English, 🇩🇪 Deutsch) w locie,
       - Wewnętrzna przeglądarka newsów,
       - Zarządzanie historią i limitami newsów (presety 500–5000, czyszczenie),
       - Status połączeń z Binance API i źródłami RSS.

3. **Górne paski alarmów**:
   - Pasek globalnego włącznika alarmu,
   - Baner trybu nocnego (gdy obowiązują ciche godziny),
   - Aktywny baner alarmu ("Nowa wiadomość oczekuje", licznik wibracji, przycisk "Widziałem").

4. **Wewnętrzna przeglądarka (In-App Browser)**:
   - Otwieranie artykułów wewnątrz widgetu z opcją przejścia do domyślnej przeglądarki.

---

## 🚀 Uruchomienie i budowanie

### Kompilacja:
```bash
make widget-build
# lub bezpośrednio w katalogu desktop-widget:
cd desktop-widget && make build
```

### Uruchomienie widgetu:
```bash
make widget-run
# lub bezpośrednio:
./desktop-widget/build/bin/desktop-widget
```

### Tryb deweloperski z Hot-Reload:
```bash
cd desktop-widget && make dev
```
