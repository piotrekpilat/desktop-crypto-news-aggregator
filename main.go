package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
)

//go:embed all:frontend/src
var assets embed.FS

func main() {
	app := NewApp()

	err := wails.Run(&options.App{
		Title:             "Crypto News Widget",
		Width:             430,
		Height:            890,
		MinWidth:          380,
		MinHeight:         700,
		MaxWidth:          550,
		MaxHeight:         1100,
		Frameless:         true,
		CSSDragProperty:   "--wails-draggable",
		CSSDragValue:      "drag",
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 11, G: 14, B: 20, A: 0},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		Linux: &linux.Options{
			WindowIsTranslucent: true,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyAlways,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
