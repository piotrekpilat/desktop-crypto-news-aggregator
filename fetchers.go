package main

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"html"
	"io"
	"net/http"
	"net/url"
	"regexp"
	"strconv"
	"strings"
	"time"

	"desktop-widget/xscraper"
)

var (
	htmlTagRegex = regexp.MustCompile(`<[^>]*>`)
	brTagRegex   = regexp.MustCompile(`(?i)<br\s*/?>`)
	multiNLRegex = regexp.MustCompile(`\n{3,}`)
)

func CleanHtml(raw string) string {
	res := brTagRegex.ReplaceAllString(raw, "\n")
	res = htmlTagRegex.ReplaceAllString(res, "")
	res = html.UnescapeString(res)
	res = strings.ReplaceAll(res, "&nbsp;", " ")
	res = strings.ReplaceAll(res, "&#036;", "$")
	res = multiNLRegex.ReplaceAllString(res, "\n\n")
	return strings.TrimSpace(res)
}

func ParseDateStr(dateStr string) int64 {
	trimmed := strings.TrimSpace(dateStr)
	if trimmed == "" {
		return time.Now().UnixMilli()
	}

	formats := []string{
		time.RFC1123Z,
		time.RFC1123,
		time.RFC3339Nano,
		time.RFC3339,
		"2006-01-02T15:04:05-07:00",
		"2006-01-02T15:04:05Z",
		"2006-01-02T15:04:05",
		"2006-01-02 15:04:05",
		"Mon, 02 Jan 2006 15:04:05 -0700",
		"Mon, 2 Jan 2006 15:04:05 -0700",
		"Mon, 02 Jan 2006 15:04:05 GMT",
		"Mon, 2 Jan 2006 15:04:05 GMT",
		"02 Jan 2006 15:04:05 -0700",
		"02 Jan 2006 15:04:05 GMT",
		"2006-01-02",
	}

	for _, layout := range formats {
		if t, err := time.Parse(layout, trimmed); err == nil {
			return t.UnixMilli()
		}
	}
	return time.Now().UnixMilli()
}

func FormatTimeAgo(millis int64, lang string) string {
	diff := time.Now().UnixMilli() - millis
	if diff < 0 {
		futureDiff := -diff
		futureMinutes := futureDiff / (60 * 1000)
		futureHours := futureDiff / (60 * 60 * 1000)
		switch lang {
		case "pl":
			if futureMinutes < 1 {
				return "Za chwilę"
			}
			if futureMinutes < 60 {
				return fmt.Sprintf("Za %d min", futureMinutes)
			}
			if futureHours < 24 {
				return fmt.Sprintf("Za %d godz.", futureHours)
			}
			return time.UnixMilli(millis).Format("02 Jan, 15:04")
		case "de":
			if futureMinutes < 1 {
				return "Gleich"
			}
			if futureMinutes < 60 {
				return fmt.Sprintf("In %d Min.", futureMinutes)
			}
			if futureHours < 24 {
				return fmt.Sprintf("In %d Std.", futureHours)
			}
			return time.UnixMilli(millis).Format("02.01, 15:04")
		default:
			if futureMinutes < 1 {
				return "In a moment"
			}
			if futureMinutes < 60 {
				return fmt.Sprintf("In %d min", futureMinutes)
			}
			if futureHours < 24 {
				return fmt.Sprintf("In %d hrs", futureHours)
			}
			return time.UnixMilli(millis).Format("02 Jan, 15:04")
		}
	}

	minutes := diff / (60 * 1000)
	hours := diff / (60 * 60 * 1000)

	switch lang {
	case "pl":
		if minutes < 1 {
			return "Przed chwilą"
		}
		if minutes < 60 {
			return fmt.Sprintf("%d min temu", minutes)
		}
		if hours < 24 {
			return fmt.Sprintf("%d godz. temu", hours)
		}
		return time.UnixMilli(millis).Format("02 Jan, 15:04")
	case "de":
		if minutes < 1 {
			return "Gerade eben"
		}
		if minutes < 60 {
			return fmt.Sprintf("vor %d Min.", minutes)
		}
		if hours < 24 {
			return fmt.Sprintf("vor %d Std.", hours)
		}
		return time.UnixMilli(millis).Format("02.01, 15:04")
	default:
		if minutes < 1 {
			return "Just now"
		}
		if minutes < 60 {
			return fmt.Sprintf("%d min ago", minutes)
		}
		if hours < 24 {
			return fmt.Sprintf("%d hrs ago", hours)
		}
		return time.UnixMilli(millis).Format("02 Jan, 15:04")
	}
}

func Md5Hash(text string) string {
	hash := md5.Sum([]byte(text))
	return hex.EncodeToString(hash[:])
}

type FeedClient struct {
	httpCli      *http.Client
	xSession     xscraper.Session
	xSessionPath string
}

func NewFeedClient() *FeedClient {
	return &FeedClient{
		httpCli: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (fc *FeedClient) SetXSession(session xscraper.Session, path string) {
	fc.xSession = session
	fc.xSessionPath = path
}

// FetchSource fetches news for a single source
func (fc *FeedClient) FetchSource(source FeedSource, cryptoPanicToken string) ([]CryptoNewsItem, error) {
	if strings.HasPrefix(source.ID, "x_") || strings.Contains(source.URL, "x.com") || strings.Contains(source.URL, "twitter.com") {
		return fc.fetchX(source)
	}
	if source.ID == "llama_hacks" || strings.Contains(strings.ToLower(source.URL), "api.llama.fi/hacks") {
		return fc.fetchDefiLlamaHacks(source)
	}
	if source.ID == "macro_cal" || strings.Contains(strings.ToLower(source.URL), "ff_calendar") {
		return fc.fetchMacroCalendar(source)
	}
	if source.ID == "cp_api" || strings.Contains(strings.ToLower(source.URL), "cryptopanic.com") {
		return fc.fetchCryptoPanic(source, cryptoPanicToken)
	}
	if strings.HasPrefix(source.ID, "tg_") || strings.Contains(source.URL, "t.me/") {
		return fc.fetchTelegram(source)
	}
	if strings.HasPrefix(source.ID, "rd_") || strings.Contains(source.URL, "reddit.com") {
		return fc.fetchReddit(source)
	}
	return fc.fetchGenericRss(source)
}

func (fc *FeedClient) fetchX(source FeedSource) ([]CryptoNewsItem, error) {
	handle := strings.TrimSpace(source.URL)
	handle = strings.TrimPrefix(handle, "https://x.com/")
	handle = strings.TrimPrefix(handle, "http://x.com/")
	handle = strings.TrimPrefix(handle, "https://twitter.com/")
	handle = strings.TrimPrefix(handle, "http://twitter.com/")
	handle = strings.TrimPrefix(handle, "x.com/")
	handle = strings.TrimPrefix(handle, "twitter.com/")
	handle = strings.TrimPrefix(handle, "@")
	handle = strings.TrimPrefix(handle, "x_")
	handle = strings.Split(handle, "/")[0]
	handle = strings.Split(handle, "?")[0]

	if handle == "" {
		return nil, fmt.Errorf("nieprawidłowy profil X dla źródła %s", source.Name)
	}

	session := fc.xSession
	if session.AuthToken == "" && fc.xSessionPath != "" {
		if s, err := xscraper.New(); err == nil {
			if err := s.LoadSessionFromFile(fc.xSessionPath); err == nil {
				session = s.GetSession()
			}
		}
	}
	if session.AuthToken == "" {
		if s, err := xscraper.New(); err == nil {
			if err := s.LoadSessionFromFile("session.json"); err == nil {
				session = s.GetSession()
			}
		}
	}

	tweets, err := xscraper.ScrapeUserTweetsBrowser(handle, 10, session)
	if err != nil {
		return nil, err
	}

	var items []CryptoNewsItem
	for _, t := range tweets {
		pubMillis := t.CreatedAt.UnixMilli()
		if pubMillis <= 0 {
			pubMillis = time.Now().UnixMilli()
		}

		title := t.Text
		if len(title) > 120 {
			title = title[:117] + "..."
		}

		desc := t.Text
		if len(t.MediaURLs) > 0 {
			desc += fmt.Sprintf("\n\nZałączone zdjęcia/media: %d", len(t.MediaURLs))
		}

		items = append(items, CryptoNewsItem{
			ID:                fmt.Sprintf("x-%s-%s", handle, t.ID),
			Title:             title,
			Description:       desc,
			Source:            source.Name,
			URL:               t.PermanentURL,
			PublishedAtMillis: pubMillis,
			FormattedTime:     FormatTimeAgo(pubMillis, "pl"),
			Tag:               "#" + handle + " #X",
			ColorHex:          source.ColorHex,
		})
	}

	return items, nil
}

// 0. DefiLlama Hacks & Exploits
type defiLlamaHackItem struct {
	Date           int64       `json:"date"`
	Name           string      `json:"name"`
	Classification string      `json:"classification"`
	Technique      string      `json:"technique"`
	Amount         float64     `json:"amount"`
	TargetType     string      `json:"targetType"`
	Source         string      `json:"source"`
	BridgeHack     bool        `json:"bridgeHack"`
	Chain          interface{} `json:"chain"`
}

func formatHackAmount(amount float64) string {
	if amount >= 1_000_000_000 {
		return fmt.Sprintf("$%.2fB USD", amount/1_000_000_000)
	}
	if amount >= 1_000_000 {
		return fmt.Sprintf("$%.2fM USD", amount/1_000_000)
	}
	if amount >= 1_000 {
		return fmt.Sprintf("$%.1fK USD", amount/1_000)
	}
	if amount > 0 {
		return fmt.Sprintf("$%.0f USD", amount)
	}
	return "Nieznana kwota"
}

func (fc *FeedClient) fetchDefiLlamaHacks(source FeedSource) ([]CryptoNewsItem, error) {
	req, err := http.NewRequest("GET", source.URL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "CryptoNewsApp/1.0")

	resp, err := fc.httpCli.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var items []defiLlamaHackItem
	if err := json.Unmarshal(body, &items); err != nil {
		return nil, err
	}

	var result []CryptoNewsItem
	for _, it := range items {
		name := strings.TrimSpace(it.Name)
		if name == "" || it.Date <= 0 {
			continue
		}

		timeMillis := it.Date * 1000
		formattedTime := FormatTimeAgo(timeMillis, "pl")

		var chains []string
		if chList, ok := it.Chain.([]interface{}); ok {
			for _, c := range chList {
				if cStr, ok := c.(string); ok && strings.TrimSpace(cStr) != "" {
					chains = append(chains, strings.TrimSpace(cStr))
				}
			}
		} else if chStr, ok := it.Chain.(string); ok && strings.TrimSpace(chStr) != "" {
			chains = append(chains, strings.TrimSpace(chStr))
		}

		prefix := "🚨 EXPLOIT: "
		if it.BridgeHack {
			prefix = "🚨 BRIDGE EXPLOIT: "
		}

		formattedAmt := formatHackAmount(it.Amount)
		title := prefix + name
		if it.Amount > 0 {
			title += fmt.Sprintf(" (%s)", formattedAmt)
		}

		var descParts []string
		if strings.TrimSpace(it.Technique) != "" {
			descParts = append(descParts, "Technika: "+strings.TrimSpace(it.Technique))
		}
		if len(chains) > 0 {
			descParts = append(descParts, "Łańcuch: "+strings.Join(chains, ", "))
		}
		if strings.TrimSpace(it.Classification) != "" {
			descParts = append(descParts, "Typ: "+strings.TrimSpace(it.Classification))
		}
		if strings.TrimSpace(it.TargetType) != "" {
			descParts = append(descParts, "Cel: "+strings.TrimSpace(it.TargetType))
		}

		desc := strings.Join(descParts, " | ")
		if desc == "" {
			desc = fmt.Sprintf("Wykryto incydent bezpieczeństwa w protokole %s", name)
		}

		tags := []string{"#Exploit", "#DeFi"}
		if it.BridgeHack {
			tags = append(tags, "#Bridge")
		}
		for i, c := range chains {
			if i >= 2 {
				break
			}
			tags = append(tags, "#"+c)
		}

		sourceLabel := "DefiLlama • Security"
		if len(chains) > 0 {
			sourceLabel = "DefiLlama • " + chains[0]
		}

		finalURL := it.Source
		if !strings.HasPrefix(finalURL, "http://") && !strings.HasPrefix(finalURL, "https://") {
			finalURL = "https://defillama.com/hacks"
		}

		idKey := fmt.Sprintf("llama_hack_%s_%d_%f", name, it.Date, it.Amount)

		result = append(result, CryptoNewsItem{
			ID:                Md5Hash(idKey),
			Title:             title,
			Description:       desc,
			Source:            sourceLabel,
			URL:               finalURL,
			PublishedAtMillis: timeMillis,
			FormattedTime:     formattedTime,
			Tag:               strings.Join(tags, " "),
			ColorHex:          "#FF3366",
		})
	}

	// Sort newest first & limit to 50
	for i := 0; i < len(result); i++ {
		for j := i + 1; j < len(result); j++ {
			if result[i].PublishedAtMillis < result[j].PublishedAtMillis {
				result[i], result[j] = result[j], result[i]
			}
		}
	}
	if len(result) > 50 {
		result = result[:50]
	}

	return result, nil
}

// 1. Kalendarz Makro
type macroItem struct {
	Title    string `json:"title"`
	Country  string `json:"country"`
	Date     string `json:"date"`
	Impact   string `json:"impact"`
	Forecast string `json:"forecast"`
	Previous string `json:"previous"`
}

func (fc *FeedClient) fetchMacroCalendar(source FeedSource) ([]CryptoNewsItem, error) {
	req, err := http.NewRequest("GET", source.URL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "CryptoNewsApp/1.0")

	resp, err := fc.httpCli.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var items []macroItem
	if err := json.Unmarshal(body, &items); err != nil {
		return nil, err
	}

	var result []CryptoNewsItem
	for _, it := range items {
		rawTitle := strings.TrimSpace(it.Title)
		if rawTitle == "" {
			continue
		}
		country := strings.TrimSpace(it.Country)
		dateStr := strings.TrimSpace(it.Date)
		impact := strings.TrimSpace(it.Impact)
		forecast := strings.TrimSpace(it.Forecast)
		previous := strings.TrimSpace(it.Previous)

		timeMillis := ParseDateStr(dateStr)
		formattedTime := FormatTimeAgo(timeMillis, "pl")

		colorHex := "#8B949E"
		switch strings.ToLower(impact) {
		case "high":
			colorHex = "#FF3366"
		case "medium":
			colorHex = "#F59E0B"
		}

		title := rawTitle
		if country != "" {
			title = fmt.Sprintf("%s (%s)", rawTitle, country)
		}

		description := fmt.Sprintf("Wydarzenie makroekonomiczne (%s Impact)", impact)
		if forecast != "" || previous != "" {
			fText := "-"
			pText := "-"
			if forecast != "" {
				fText = forecast
			}
			if previous != "" {
				pText = previous
			}
			description = fmt.Sprintf("PROGNOZA: %s | POPRZEDNI: %s", fText, pText)
		}

		tag := "#Makro"
		if country != "" {
			tag += " #" + country
		}
		if impact != "" {
			tag += " #" + impact
		}

		sourceLabel := "Makro • GLOBAL"
		if country != "" {
			sourceLabel = "Makro • " + country
		}

		idKey := fmt.Sprintf("macro_%s_%s_%s", country, rawTitle, dateStr)
		result = append(result, CryptoNewsItem{
			ID:                Md5Hash(idKey),
			Title:             title,
			Description:       description,
			Source:            sourceLabel,
			URL:               "https://www.forexfactory.com/calendar",
			PublishedAtMillis: timeMillis,
			FormattedTime:     formattedTime,
			Tag:               tag,
			ColorHex:          colorHex,
		})
	}
	return result, nil
}

// 2. Telegram Public Channel scraper
func (fc *FeedClient) fetchTelegram(source FeedSource) ([]CryptoNewsItem, error) {
	targetURL := source.URL
	if strings.Contains(targetURL, "t.me/") && !strings.Contains(targetURL, "t.me/s/") {
		targetURL = strings.Replace(targetURL, "t.me/", "t.me/s/", 1)
	} else if !strings.HasPrefix(targetURL, "http") {
		clean := strings.TrimPrefix(strings.TrimSpace(targetURL), "@")
		targetURL = "https://t.me/s/" + clean
	}

	req, err := http.NewRequest("GET", targetURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

	resp, err := fc.httpCli.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	htmlContent := string(body)
	re := regexp.MustCompile(`(?s)<div class="tgme_widget_message_wrap[^"]*".*?<div class="tgme_widget_message_text[^"]*"[^>]*>(.*?)</div>.*?<a class="tgme_widget_message_date" href="([^"]*)".*?<time datetime="([^"]*)`)
	matches := re.FindAllStringSubmatch(htmlContent, -1)

	var result []CryptoNewsItem
	for _, m := range matches {
		if len(m) < 4 {
			continue
		}
		rawText := m[1]
		link := m[2]
		rawTime := m[3]

		cleanText := CleanHtml(rawText)
		if cleanText == "" {
			continue
		}

		lines := strings.Split(cleanText, "\n")
		firstLine := cleanText
		for _, l := range lines {
			l = strings.TrimSpace(l)
			if l != "" {
				firstLine = l
				break
			}
		}

		title := firstLine
		if len([]rune(title)) > 90 {
			title = string([]rune(title)[:87]) + "..."
		}

		desc := cleanText
		if len([]rune(desc)) > 300 {
			desc = string([]rune(desc)[:297]) + "..."
		}

		timeMillis := ParseDateStr(rawTime)
		fullURL := link
		if strings.HasPrefix(link, "/") {
			fullURL = "https://t.me" + link
		} else if !strings.HasPrefix(link, "http") && link != "" {
			fullURL = "https://t.me/" + link
		} else if fullURL == "" {
			fullURL = source.URL
		}

		id := "tg-" + link
		if link == "" {
			id = "tg-" + Md5Hash(cleanText)
		}

		result = append(result, CryptoNewsItem{
			ID:                id,
			Title:             title,
			Description:       desc,
			Source:            source.Name,
			URL:               fullURL,
			PublishedAtMillis: timeMillis,
			FormattedTime:     FormatTimeAgo(timeMillis, "pl"),
			Tag:               "#Telegram",
			ColorHex:          source.ColorHex,
		})
	}

	// Reverse to have newest first if telegram output is ascending
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}

	return result, nil
}

// 3. Reddit RSS / Atom Feed
type atomFeed struct {
	Entries []struct {
		ID      string `xml:"id"`
		Title   string `xml:"title"`
		Link    struct {
			Href string `xml:"href,attr"`
		} `xml:"link"`
		Content string `xml:"content"`
		Summary string `xml:"summary"`
		Updated string `xml:"updated"`
	} `xml:"entry"`
}

func (fc *FeedClient) fetchReddit(source FeedSource) ([]CryptoNewsItem, error) {
	req, err := http.NewRequest("GET", source.URL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "desktop:com.crypto.aggregator.widget:v1.0.0 (by /u/crypto_news_widget)")

	resp, err := fc.httpCli.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var feed atomFeed
	if err := xml.Unmarshal(body, &feed); err == nil && len(feed.Entries) > 0 {
		var result []CryptoNewsItem
		for _, e := range feed.Entries {
			title := strings.TrimSpace(e.Title)
			if title == "" {
				continue
			}
			content := e.Content
			if content == "" {
				content = e.Summary
			}
			cleanContent := CleanHtml(content)
			if len([]rune(cleanContent)) > 300 {
				cleanContent = string([]rune(cleanContent)[:297]) + "..."
			}

			timeMillis := ParseDateStr(e.Updated)
			link := strings.TrimSpace(e.Link.Href)

			id := "rd-" + e.ID
			if e.ID == "" {
				id = "rd-" + Md5Hash(title)
			}

			result = append(result, CryptoNewsItem{
				ID:                id,
				Title:             title,
				Description:       cleanContent,
				Source:            source.Name,
				URL:               link,
				PublishedAtMillis: timeMillis,
				FormattedTime:     FormatTimeAgo(timeMillis, "pl"),
				Tag:               "#Reddit",
				ColorHex:          source.ColorHex,
			})
		}
		return result, nil
	}

	// Fallback to generic RSS
	return fc.fetchGenericRss(source)
}

// 4. Generic RSS 2.0 & Atom XML Parser
type genericRssFeed struct {
	Channel struct {
		Items []struct {
			Title       string `xml:"title"`
			Link        string `xml:"link"`
			Description string `xml:"description"`
			Content     string `xml:"content"`
			Encoded     string `xml:"encoded"`
			PubDate     string `xml:"pubDate"`
			Guid        string `xml:"guid"`
		} `xml:"item"`
	} `xml:"channel"`
	Entries []struct {
		ID      string `xml:"id"`
		Title   string `xml:"title"`
		Link    struct {
			Href string `xml:"href,attr"`
		} `xml:"link"`
		Content string `xml:"content"`
		Summary string `xml:"summary"`
		Updated string `xml:"updated"`
		PubDate string `xml:"published"`
	} `xml:"entry"`
}

func (fc *FeedClient) fetchGenericRss(source FeedSource) ([]CryptoNewsItem, error) {
	req, err := http.NewRequest("GET", source.URL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

	resp, err := fc.httpCli.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var feed genericRssFeed
	if err := xml.Unmarshal(body, &feed); err != nil {
		return nil, err
	}

	var result []CryptoNewsItem

	// 1. Process RSS 2.0 items
	for _, it := range feed.Channel.Items {
		title := strings.TrimSpace(it.Title)
		if title == "" {
			continue
		}
		rawDesc := it.Description
		if rawDesc == "" {
			rawDesc = it.Encoded
		}
		if rawDesc == "" {
			rawDesc = it.Content
		}
		desc := CleanHtml(rawDesc)
		if len([]rune(desc)) > 300 {
			desc = string([]rune(desc)[:297]) + "..."
		}

		timeMillis := ParseDateStr(it.PubDate)
		link := strings.TrimSpace(it.Link)
		id := "rss-" + it.Guid
		if it.Guid == "" {
			id = "rss-" + Md5Hash(title)
		}

		result = append(result, CryptoNewsItem{
			ID:                id,
			Title:             title,
			Description:       desc,
			Source:            source.Name,
			URL:               link,
			PublishedAtMillis: timeMillis,
			FormattedTime:     FormatTimeAgo(timeMillis, "pl"),
			Tag:               "#Crypto",
			ColorHex:          source.ColorHex,
		})
	}

	// 2. Process Atom XML entries
	for _, e := range feed.Entries {
		title := strings.TrimSpace(e.Title)
		if title == "" {
			continue
		}
		content := e.Content
		if content == "" {
			content = e.Summary
		}
		cleanContent := CleanHtml(content)
		if len([]rune(cleanContent)) > 300 {
			cleanContent = string([]rune(cleanContent)[:297]) + "..."
		}

		dateStr := e.Updated
		if dateStr == "" {
			dateStr = e.PubDate
		}
		timeMillis := ParseDateStr(dateStr)
		link := strings.TrimSpace(e.Link.Href)

		id := "atom-" + e.ID
		if e.ID == "" {
			id = "atom-" + Md5Hash(title)
		}

		result = append(result, CryptoNewsItem{
			ID:                id,
			Title:             title,
			Description:       cleanContent,
			Source:            source.Name,
			URL:               link,
			PublishedAtMillis: timeMillis,
			FormattedTime:     FormatTimeAgo(timeMillis, "pl"),
			Tag:               "#Crypto",
			ColorHex:          source.ColorHex,
		})
	}

	return result, nil
}

// 5. CryptoPanic API
type cpResponse struct {
	Results []struct {
		ID          int    `xml:"id" json:"id"`
		Title       string `json:"title"`
		URL         string `json:"url"`
		PublishedAt string `json:"published_at"`
		Currencies  []struct {
			Code string `json:"code"`
		} `json:"currencies"`
		Metadata struct {
			Description string `json:"description"`
		} `json:"metadata"`
	} `json:"results"`
}

func (fc *FeedClient) fetchCryptoPanic(source FeedSource, token string) ([]CryptoNewsItem, error) {
	token = strings.TrimSpace(token)
	if token == "" {
		return nil, fmt.Errorf("Brak tokena CryptoPanic")
	}

	apiURL := fmt.Sprintf("https://cryptopanic.com/api/v1/posts/?auth_token=%s&public=true", url.QueryEscape(token))
	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "CryptoNewsApp/1.0")

	resp, err := fc.httpCli.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var cp cpResponse
	if err := json.Unmarshal(body, &cp); err != nil {
		return nil, err
	}

	var result []CryptoNewsItem
	for _, it := range cp.Results {
		title := strings.TrimSpace(it.Title)
		if title == "" {
			continue
		}
		desc := CleanHtml(it.Metadata.Description)
		timeMillis := ParseDateStr(it.PublishedAt)

		tags := []string{}
		for _, c := range it.Currencies {
			if len(tags) < 3 && c.Code != "" {
				tags = append(tags, "#"+c.Code)
			}
		}
		tagStr := strings.Join(tags, " ")
		if tagStr == "" {
			tagStr = "#Crypto"
		}

		result = append(result, CryptoNewsItem{
			ID:                fmt.Sprintf("cryptopanic-%d", it.ID),
			Title:             title,
			Description:       desc,
			Source:            source.Name,
			URL:               it.URL,
			PublishedAtMillis: timeMillis,
			FormattedTime:     FormatTimeAgo(timeMillis, "pl"),
			Tag:               tagStr,
			ColorHex:          source.ColorHex,
		})
	}
	return result, nil
}

// 6. Binance API Client
type BinanceClient struct {
	httpCli *http.Client
}

func NewBinanceClient() *BinanceClient {
	return &BinanceClient{
		httpCli: &http.Client{Timeout: 8 * time.Second},
	}
}

type binanceTicker24h struct {
	Symbol             string `json:"symbol"`
	LastPrice          string `json:"lastPrice"`
	PriceChangePercent string `json:"priceChangePercent"`
}

type binanceSymbolInfo struct {
	Symbol     string `json:"symbol"`
	Status     string `json:"status"`
	BaseAsset  string `json:"baseAsset"`
	QuoteAsset string `json:"quoteAsset"`
}

type binanceExchangeInfo struct {
	Symbols []binanceSymbolInfo `json:"symbols"`
}

func (bc *BinanceClient) GetKlines(symbol string, interval string, limit int) ([]PricePoint, error) {
	reqURL := fmt.Sprintf("https://api.binance.com/api/v3/klines?symbol=%s&interval=%s&limit=%d", symbol, interval, limit)
	resp, err := bc.httpCli.Get(reqURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var rawKlines [][]interface{}
	if err := json.Unmarshal(body, &rawKlines); err != nil {
		return nil, err
	}

	var points []PricePoint
	for _, candle := range rawKlines {
		if len(candle) < 5 {
			continue
		}
		tNum, ok1 := candle[0].(float64)
		cStr, ok2 := candle[4].(string)
		if ok1 && ok2 {
			price, pErr := strconv.ParseFloat(cStr, 64)
			if pErr == nil {
				points = append(points, PricePoint{
					Timestamp: int64(tNum),
					Price:     price,
				})
			}
		}
	}
	return points, nil
}

func (bc *BinanceClient) GetTicker24h(symbol string) (float64, float64, error) {
	reqURL := fmt.Sprintf("https://api.binance.com/api/v3/ticker/24hr?symbol=%s", symbol)
	resp, err := bc.httpCli.Get(reqURL)
	if err != nil {
		return 0, 0, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return 0, 0, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, 0, err
	}

	var t binanceTicker24h
	if err := json.Unmarshal(body, &t); err != nil {
		return 0, 0, err
	}

	lastPrice, _ := strconv.ParseFloat(t.LastPrice, 64)
	changePct, _ := strconv.ParseFloat(t.PriceChangePercent, 64)
	return lastPrice, changePct, nil
}

func (bc *BinanceClient) GetExchangeInfo() ([]CoinInfo, error) {
	reqURL := "https://api.binance.com/api/v3/exchangeInfo"
	resp, err := bc.httpCli.Get(reqURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var exInfo binanceExchangeInfo
	if err := json.Unmarshal(body, &exInfo); err != nil {
		return nil, err
	}

	palette := []string{"#00E5FF", "#00FF88", "#A855F7", "#F59E0B", "#FF3366", "#38BDF8", "#E84142", "#E6007A"}
	knownMap := make(map[string]CoinInfo)
	for _, k := range DefaultInitialCoins {
		knownMap[k.Symbol] = k
	}

	var coins []CoinInfo
	for _, sym := range exInfo.Symbols {
		if sym.Status == "TRADING" && sym.QuoteAsset == "USDT" {
			if known, ok := knownMap[sym.Symbol]; ok {
				coins = append(coins, known)
			} else {
				h := int(Md5Hash(sym.BaseAsset)[0])
				color := palette[h%len(palette)]
				firstChar := "●"
				if len(sym.BaseAsset) > 0 {
					firstChar = string([]rune(sym.BaseAsset)[:1])
				}
				coins = append(coins, CoinInfo{
					Symbol:     sym.Symbol,
					BaseAsset:  sym.BaseAsset,
					QuoteAsset: sym.QuoteAsset,
					Name:       sym.BaseAsset,
					IconSymbol: firstChar,
					ColorHex:   color,
				})
			}
		}
	}
	return coins, nil
}
