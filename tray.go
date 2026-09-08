package main

import (
	"bytes"
	_ "embed"
	"fmt"
	"image"
	"image/draw"
	_ "image/png"
	"os"
	"path/filepath"
	"sync"

	"github.com/godbus/dbus/v5"
	"github.com/godbus/dbus/v5/introspect"
	"github.com/godbus/dbus/v5/prop"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed build/appicon.png
var defaultAppIcon []byte

//go:embed build/appicon_48.png
var icon48 []byte

//go:embed build/appicon_32.png
var icon32 []byte

//go:embed build/appicon_24.png
var icon24 []byte

//go:embed build/appicon_22.png
var icon22 []byte

//go:embed build/appicon_16.png
var icon16 []byte

type dXPixmap struct {
	Width  int32
	Height int32
	Data   []byte
}

func decodeToARGB(data []byte) (dXPixmap, bool) {
	img, _, err := image.Decode(bytes.NewReader(data))
	if err != nil {
		return dXPixmap{}, false
	}
	bounds := img.Bounds()
	width := bounds.Dx()
	height := bounds.Dy()
	rgba := image.NewRGBA(bounds)
	draw.Draw(rgba, bounds, img, bounds.Min, draw.Src)

	argb := make([]byte, width*height*4)
	for i := 0; i < len(rgba.Pix); i += 4 {
		r := rgba.Pix[i]
		g := rgba.Pix[i+1]
		b := rgba.Pix[i+2]
		a := rgba.Pix[i+3]

		argb[i] = a
		argb[i+1] = r
		argb[i+2] = g
		argb[i+3] = b
	}
	return dXPixmap{Width: int32(width), Height: int32(height), Data: argb}, true
}

func getIconPixmap() []dXPixmap {
	var pixmaps []dXPixmap
	for _, raw := range [][]byte{icon22, icon24, icon32, icon48, icon16, defaultAppIcon} {
		if px, ok := decodeToARGB(raw); ok {
			pixmaps = append(pixmaps, px)
		}
	}
	return pixmaps
}

type sniItem struct {
	app     *App
	menuObj *dbusMenu
}

func (s *sniItem) ContextMenu(x int32, y int32) *dbus.Error {
	return nil
}

func (s *sniItem) Activate(x int32, y int32) *dbus.Error {
	s.app.ToggleWindowVisibility()
	return nil
}

func (s *sniItem) SecondaryActivate(x int32, y int32) *dbus.Error {
	s.app.ToggleWindowVisibility()
	return nil
}

func (s *sniItem) Scroll(delta int32, orientation string) *dbus.Error {
	return nil
}

// DBusMenu item structure matching (ia{sv}av)
type dbusMenuItem struct {
	Id         int32
	Properties map[string]dbus.Variant
	Children   []dbus.Variant
}

type dbusMenu struct {
	mu       sync.Mutex
	app      *App
	revision uint32
	conn     *dbus.Conn
}

func (m *dbusMenu) GetLayout(parentId int32, recursionDepth int32, propertyNames []string) (uint32, dbusMenuItem, *dbus.Error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	showText := "👁️  Pokaż widget"
	hideText := "🙈  Ukryj widget"
	alwaysOnTopText := "📌  Przypnij na wierzchu"
	if m.app.alwaysOnTop {
		alwaysOnTopText = "✓ 📌 Przypnij na wierzchu"
	}

	items := []dbus.Variant{
		dbus.MakeVariant(dbusMenuItem{
			Id: 1,
			Properties: map[string]dbus.Variant{
				"label":       dbus.MakeVariant(showText),
				"enabled":     dbus.MakeVariant(true),
				"visible":     dbus.MakeVariant(true),
				"toggle-type": dbus.MakeVariant(""),
			},
			Children: []dbus.Variant{},
		}),
		dbus.MakeVariant(dbusMenuItem{
			Id: 2,
			Properties: map[string]dbus.Variant{
				"label":       dbus.MakeVariant(hideText),
				"enabled":     dbus.MakeVariant(true),
				"visible":     dbus.MakeVariant(true),
				"toggle-type": dbus.MakeVariant(""),
			},
			Children: []dbus.Variant{},
		}),
		dbus.MakeVariant(dbusMenuItem{
			Id: 3,
			Properties: map[string]dbus.Variant{
				"label":       dbus.MakeVariant(alwaysOnTopText),
				"enabled":     dbus.MakeVariant(true),
				"visible":     dbus.MakeVariant(true),
				"toggle-type": dbus.MakeVariant(""),
			},
			Children: []dbus.Variant{},
		}),
		dbus.MakeVariant(dbusMenuItem{
			Id: 4,
			Properties: map[string]dbus.Variant{
				"label":       dbus.MakeVariant("🔄  Odśwież dane"),
				"enabled":     dbus.MakeVariant(true),
				"visible":     dbus.MakeVariant(true),
				"toggle-type": dbus.MakeVariant(""),
			},
			Children: []dbus.Variant{},
		}),
		dbus.MakeVariant(dbusMenuItem{
			Id: 5,
			Properties: map[string]dbus.Variant{
				"type": dbus.MakeVariant("separator"),
			},
			Children: []dbus.Variant{},
		}),
		dbus.MakeVariant(dbusMenuItem{
			Id: 6,
			Properties: map[string]dbus.Variant{
				"label":       dbus.MakeVariant("❌  Zamknij"),
				"enabled":     dbus.MakeVariant(true),
				"visible":     dbus.MakeVariant(true),
				"toggle-type": dbus.MakeVariant(""),
			},
			Children: []dbus.Variant{},
		}),
	}

	root := dbusMenuItem{
		Id: 0,
		Properties: map[string]dbus.Variant{
			"children-display": dbus.MakeVariant("submenu"),
		},
		Children: items,
	}

	return m.revision, root, nil
}

func (m *dbusMenu) GetGroupProperties(ids []int32, propertyNames []string) ([]struct {
	Id         int32
	Properties map[string]dbus.Variant
}, *dbus.Error) {
	return nil, nil
}

func (m *dbusMenu) GetProperty(id int32, name string) (dbus.Variant, *dbus.Error) {
	return dbus.MakeVariant(""), nil
}

func (m *dbusMenu) Event(id int32, eventId string, data dbus.Variant, timestamp uint32) *dbus.Error {
	if eventId == "clicked" {
		switch id {
		case 1:
			m.app.ShowWindow()
		case 2:
			m.app.HideWindow()
		case 3:
			m.app.ToggleAlwaysOnTop()
		case 4:
			m.app.RefreshData()
		case 6:
			wailsRuntime.Quit(m.app.ctx)
		}
		m.NotifyLayoutUpdate()
	}
	return nil
}

func (m *dbusMenu) AboutToShow(id int32) (bool, *dbus.Error) {
	return false, nil
}

func (m *dbusMenu) NotifyLayoutUpdate() {
	m.mu.Lock()
	m.revision++
	rev := m.revision
	conn := m.conn
	m.mu.Unlock()

	if conn != nil {
		_ = conn.Emit("/MenuBar", "com.canonical.dbusmenu.LayoutUpdated", rev, int32(0))
	}
}

func (a *App) initTray() {
	go a.setupDBusTray()
}

func (a *App) setupDBusTray() {
	conn, err := dbus.ConnectSessionBus()
	if err != nil {
		fmt.Println("Błąd łączenia z DBus Session:", err)
		return
	}

	// Save icon to config dir
	configDir, _ := os.UserConfigDir()
	iconPath := "/tmp/crypto-news-widget-icon.png"
	iconDir := "/tmp"
	if configDir != "" {
		appDir := filepath.Join(configDir, "crypto-aggregator-widget")
		os.MkdirAll(appDir, 0755)
		iconPath = filepath.Join(appDir, "icon.png")
		iconDir = appDir
	}
	_ = iconDir
	_ = os.WriteFile(iconPath, defaultAppIcon, 0644)

	pid := os.Getpid()
	serviceName := fmt.Sprintf("org.kde.StatusNotifierItem-%d-1", pid)
	reply, err := conn.RequestName(serviceName, dbus.NameFlagDoNotQueue)
	if err != nil || reply != dbus.RequestNameReplyPrimaryOwner {
		serviceName = fmt.Sprintf("org.freedesktop.StatusNotifierItem-%d-1", pid)
		_, _ = conn.RequestName(serviceName, dbus.NameFlagDoNotQueue)
	}

	menu := &dbusMenu{
		app:      a,
		revision: 1,
		conn:     conn,
	}

	sni := &sniItem{
		app:     a,
		menuObj: menu,
	}

	propsSpec := map[string]map[string]*prop.Prop{
		"org.kde.StatusNotifierItem": {
			"Category": {
				Value:    "ApplicationStatus",
				Writable: false,
				Emit:     prop.EmitTrue,
			},
			"Id": {
				Value:    "crypto-news-widget",
				Writable: false,
				Emit:     prop.EmitTrue,
			},
			"Title": {
				Value:    "Crypto News Widget",
				Writable: false,
				Emit:     prop.EmitTrue,
			},
			"Status": {
				Value:    "Active",
				Writable: false,
				Emit:     prop.EmitTrue,
			},
			"WindowId": {
				Value:    int32(0),
				Writable: false,
				Emit:     prop.EmitFalse,
			},
			"IconName": {
				Value:    "preferences-system-notifications-symbolic",
				Writable: false,
				Emit:     prop.EmitTrue,
			},
			"IconPixmap": {
				Value:    getIconPixmap(),
				Writable: false,
				Emit:     prop.EmitTrue,
			},
			"IconThemePath": {
				Value:    "",
				Writable: false,
				Emit:     prop.EmitTrue,
			},
			"Menu": {
				Value:    dbus.ObjectPath("/MenuBar"),
				Writable: false,
				Emit:     prop.EmitFalse,
			},
			"ItemIsMenu": {
				Value:    true,
				Writable: false,
				Emit:     prop.EmitFalse,
			},
		},
	}

	props, err := prop.Export(conn, "/StatusNotifierItem", propsSpec)
	if err != nil {
		fmt.Println("Błąd eksportu właściwości SNI:", err)
	}
	_ = props

	sniIntro := introspect.Introspectable(introspect.NewIntrospectable(&introspect.Node{
		Name: "/StatusNotifierItem",
		Interfaces: []introspect.Interface{
			introspect.IntrospectData,
			prop.IntrospectData,
			{
				Name: "org.kde.StatusNotifierItem",
				Methods: []introspect.Method{
					{
						Name: "ContextMenu",
						Args: []introspect.Arg{
							{Name: "x", Type: "i", Direction: "in"},
							{Name: "y", Type: "i", Direction: "in"},
						},
					},
					{
						Name: "Activate",
						Args: []introspect.Arg{
							{Name: "x", Type: "i", Direction: "in"},
							{Name: "y", Type: "i", Direction: "in"},
						},
					},
					{
						Name: "SecondaryActivate",
						Args: []introspect.Arg{
							{Name: "x", Type: "i", Direction: "in"},
							{Name: "y", Type: "i", Direction: "in"},
						},
					},
					{
						Name: "Scroll",
						Args: []introspect.Arg{
							{Name: "delta", Type: "i", Direction: "in"},
							{Name: "orientation", Type: "s", Direction: "in"},
						},
					},
				},
				Signals: []introspect.Signal{
					{Name: "NewTitle"},
					{Name: "NewIcon"},
					{Name: "NewAttentionIcon"},
					{Name: "NewOverlayIcon"},
					{Name: "NewToolTip"},
					{Name: "NewStatus", Args: []introspect.Arg{{Name: "status", Type: "s"}}},
				},
				Properties: []introspect.Property{
					{Name: "Category", Type: "s", Access: "read"},
					{Name: "Id", Type: "s", Access: "read"},
					{Name: "Title", Type: "s", Access: "read"},
					{Name: "Status", Type: "s", Access: "read"},
					{Name: "WindowId", Type: "i", Access: "read"},
					{Name: "IconName", Type: "s", Access: "read"},
					{
						Name:   "IconPixmap",
						Type:   "a(iiay)",
						Access: "read",
						Annotations: []introspect.Annotation{
							{Name: "org.qtproject.QtDBus.QtTypeName", Value: "KDbusImageVector"},
						},
					},
					{Name: "IconThemePath", Type: "s", Access: "read"},
					{Name: "Menu", Type: "o", Access: "read"},
					{Name: "ItemIsMenu", Type: "b", Access: "read"},
				},
			},
		},
	}))

	menuIntro := introspect.Introspectable(introspect.NewIntrospectable(&introspect.Node{
		Name: "/MenuBar",
		Interfaces: []introspect.Interface{
			introspect.IntrospectData,
			{
				Name: "com.canonical.dbusmenu",
				Methods: []introspect.Method{
					{
						Name: "GetLayout",
						Args: []introspect.Arg{
							{Name: "parentId", Type: "i", Direction: "in"},
							{Name: "recursionDepth", Type: "i", Direction: "in"},
							{Name: "propertyNames", Type: "as", Direction: "in"},
							{Name: "revision", Type: "u", Direction: "out"},
							{Name: "layout", Type: "(ia{sv}av)", Direction: "out"},
						},
					},
					{
						Name: "GetGroupProperties",
						Args: []introspect.Arg{
							{Name: "ids", Type: "ai", Direction: "in"},
							{Name: "propertyNames", Type: "as", Direction: "in"},
							{Name: "properties", Type: "a(ia{sv})", Direction: "out"},
						},
					},
					{
						Name: "GetProperty",
						Args: []introspect.Arg{
							{Name: "id", Type: "i", Direction: "in"},
							{Name: "name", Type: "s", Direction: "in"},
							{Name: "value", Type: "v", Direction: "out"},
						},
					},
					{
						Name: "Event",
						Args: []introspect.Arg{
							{Name: "id", Type: "i", Direction: "in"},
							{Name: "eventId", Type: "s", Direction: "in"},
							{Name: "data", Type: "v", Direction: "in"},
							{Name: "timestamp", Type: "u", Direction: "in"},
						},
					},
					{
						Name: "AboutToShow",
						Args: []introspect.Arg{
							{Name: "id", Type: "i", Direction: "in"},
							{Name: "needUpdate", Type: "b", Direction: "out"},
						},
					},
				},
				Signals: []introspect.Signal{
					{
						Name: "LayoutUpdated",
						Args: []introspect.Arg{
							{Name: "revision", Type: "u"},
							{Name: "parent", Type: "i"},
						},
					},
				},
			},
		},
	}))

	_ = conn.Export(sniIntro, "/StatusNotifierItem", "org.freedesktop.DBus.Introspectable")
	_ = conn.Export(menuIntro, "/MenuBar", "org.freedesktop.DBus.Introspectable")

	if err := conn.Export(sni, "/StatusNotifierItem", "org.kde.StatusNotifierItem"); err != nil {
		fmt.Println("Błąd eksportu SNI:", err)
	}
	if err := conn.Export(sni, "/StatusNotifierItem", "org.freedesktop.StatusNotifierItem"); err != nil {
		fmt.Println("Błąd eksportu Freedesktop SNI:", err)
	}
	if err := conn.Export(menu, "/MenuBar", "com.canonical.dbusmenu"); err != nil {
		fmt.Println("Błąd eksportu DBusMenu:", err)
	}

	// Register with StatusNotifierWatcher
	watcher := conn.Object("org.kde.StatusNotifierWatcher", "/StatusNotifierWatcher")
	_ = watcher.Call("org.kde.StatusNotifierWatcher.RegisterStatusNotifierItem", 0, serviceName)

	watcher2 := conn.Object("org.freedesktop.StatusNotifierWatcher", "/StatusNotifierWatcher")
	_ = watcher2.Call("org.freedesktop.StatusNotifierWatcher.RegisterStatusNotifierItem", 0, serviceName)

	// Emit initial signals so Ubuntu AppIndicator discovers the icon
	_ = conn.Emit("/StatusNotifierItem", "org.kde.StatusNotifierItem.NewIcon")
	_ = conn.Emit("/StatusNotifierItem", "org.kde.StatusNotifierItem.NewStatus", "Active")
}

func (a *App) SendDesktopNotification(title, body string) {
	conn, err := dbus.ConnectSessionBus()
	if err != nil {
		return
	}
	defer conn.Close()

	configDir, _ := os.UserConfigDir()
	iconPath := "utilities-system-monitor"
	if configDir != "" {
		iconPath = filepath.Join(configDir, "crypto-aggregator-widget", "icon.png")
	}

	obj := conn.Object("org.freedesktop.Notifications", "/org/freedesktop/Notifications")
	_ = obj.Call("org.freedesktop.Notifications.Notify", 0,
		"Crypto News Widget",
		uint32(0),
		iconPath,
		title,
		body,
		[]string{"default", "Pokaż"},
		map[string]dbus.Variant{
			"urgency": dbus.MakeVariant(byte(1)),
		},
		int32(6000),
	)
}
