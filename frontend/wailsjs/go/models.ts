export namespace main {
	
	export class AlarmCycleState {
	    isActive: boolean;
	    vibrationCount: number;
	    maxVibrations: number;
	    secondsRemaining: number;
	    acknowledged: boolean;
	    lastNewsId: string;
	
	    static createFrom(source: any = {}) {
	        return new AlarmCycleState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.isActive = source["isActive"];
	        this.vibrationCount = source["vibrationCount"];
	        this.maxVibrations = source["maxVibrations"];
	        this.secondsRemaining = source["secondsRemaining"];
	        this.acknowledged = source["acknowledged"];
	        this.lastNewsId = source["lastNewsId"];
	    }
	}
	export class CoinInfo {
	    symbol: string;
	    baseAsset: string;
	    quoteAsset: string;
	    name: string;
	    iconSymbol: string;
	    colorHex: string;
	
	    static createFrom(source: any = {}) {
	        return new CoinInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.symbol = source["symbol"];
	        this.baseAsset = source["baseAsset"];
	        this.quoteAsset = source["quoteAsset"];
	        this.name = source["name"];
	        this.iconSymbol = source["iconSymbol"];
	        this.colorHex = source["colorHex"];
	    }
	}
	export class CryptoNewsItem {
	    id: string;
	    title: string;
	    description: string;
	    source: string;
	    url: string;
	    publishedAtMillis: number;
	    formattedTime: string;
	    tag: string;
	    colorHex: string;
	    associatedPrice: number;
	    isFavorite: boolean;
	    isSeen: boolean;
	
	    static createFrom(source: any = {}) {
	        return new CryptoNewsItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.description = source["description"];
	        this.source = source["source"];
	        this.url = source["url"];
	        this.publishedAtMillis = source["publishedAtMillis"];
	        this.formattedTime = source["formattedTime"];
	        this.tag = source["tag"];
	        this.colorHex = source["colorHex"];
	        this.associatedPrice = source["associatedPrice"];
	        this.isFavorite = source["isFavorite"];
	        this.isSeen = source["isSeen"];
	    }
	}
	export class FeedSource {
	    id: string;
	    name: string;
	    url: string;
	    colorHex: string;
	    isActive: boolean;
	    failureCount: number;
	    autoDisabledAfterFailure: boolean;
	
	    static createFrom(source: any = {}) {
	        return new FeedSource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.url = source["url"];
	        this.colorHex = source["colorHex"];
	        this.isActive = source["isActive"];
	        this.failureCount = source["failureCount"];
	        this.autoDisabledAfterFailure = source["autoDisabledAfterFailure"];
	    }
	}
	export class PricePoint {
	    timestamp: number;
	    price: number;
	
	    static createFrom(source: any = {}) {
	        return new PricePoint(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.timestamp = source["timestamp"];
	        this.price = source["price"];
	    }
	}
	export class FullAppState {
	    pricePoints: PricePoint[];
	    newsList: CryptoNewsItem[];
	    sourcesList: FeedSource[];
	    selectedCoin: CoinInfo;
	    observedCoins: CoinInfo[];
	    allAvailableCoins: CoinInfo[];
	    keywords: string[];
	    currentPrice: number;
	    priceChangePercent: number;
	    selectedNewsId: string;
	    activeSourceFilter: string;
	    selectedSourceFilters: string[];
	    currentTab: string;
	    settingsSubTab: string;
	    isOffline: boolean;
	    isLiveMarket: boolean;
	    alarmEnabled: boolean;
	    maxVibrations: number;
	    nightModeEnabled: boolean;
	    nightModeStart: string;
	    nightModeEnd: string;
	    isNightTimeNow: boolean;
	    currentLanguage: string;
	    cryptoPanicTokenConfigured: boolean;
	    alarmCycle: AlarmCycleState;
	    maxStoredNews: number;
	    totalStoredNewsCount: number;
	    unreadNewsCount: number;
	    useInternalBrowser: boolean;
	    alwaysOnTop: boolean;
	    autostart: boolean;
	    isXLoggedIn: boolean;
	
	    static createFrom(source: any = {}) {
	        return new FullAppState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.pricePoints = this.convertValues(source["pricePoints"], PricePoint);
	        this.newsList = this.convertValues(source["newsList"], CryptoNewsItem);
	        this.sourcesList = this.convertValues(source["sourcesList"], FeedSource);
	        this.selectedCoin = this.convertValues(source["selectedCoin"], CoinInfo);
	        this.observedCoins = this.convertValues(source["observedCoins"], CoinInfo);
	        this.allAvailableCoins = this.convertValues(source["allAvailableCoins"], CoinInfo);
	        this.keywords = source["keywords"];
	        this.currentPrice = source["currentPrice"];
	        this.priceChangePercent = source["priceChangePercent"];
	        this.selectedNewsId = source["selectedNewsId"];
	        this.activeSourceFilter = source["activeSourceFilter"];
	        this.selectedSourceFilters = source["selectedSourceFilters"];
	        this.currentTab = source["currentTab"];
	        this.settingsSubTab = source["settingsSubTab"];
	        this.isOffline = source["isOffline"];
	        this.isLiveMarket = source["isLiveMarket"];
	        this.alarmEnabled = source["alarmEnabled"];
	        this.maxVibrations = source["maxVibrations"];
	        this.nightModeEnabled = source["nightModeEnabled"];
	        this.nightModeStart = source["nightModeStart"];
	        this.nightModeEnd = source["nightModeEnd"];
	        this.isNightTimeNow = source["isNightTimeNow"];
	        this.currentLanguage = source["currentLanguage"];
	        this.cryptoPanicTokenConfigured = source["cryptoPanicTokenConfigured"];
	        this.alarmCycle = this.convertValues(source["alarmCycle"], AlarmCycleState);
	        this.maxStoredNews = source["maxStoredNews"];
	        this.totalStoredNewsCount = source["totalStoredNewsCount"];
	        this.unreadNewsCount = source["unreadNewsCount"];
	        this.useInternalBrowser = source["useInternalBrowser"];
	        this.alwaysOnTop = source["alwaysOnTop"];
	        this.autostart = source["autostart"];
	        this.isXLoggedIn = source["isXLoggedIn"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

