package main

import (
	"embed"
	"os/exec"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed aim-api-server
var aimServer embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Start the API server
	exec.Command("./aim-api-server").Start()

	// Create application with options
	err := wails.Run(&options.App{
		Title:     "AIM",
		Width:     1024,
		Height:    768,
		MinHeight: 768,
		MinWidth:  1024,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
			app.UserFunctions,
			app.ResultFunctions,
			app.AuthFunctions,
			app.NewsFunctions,
			app.StatusFunctions,
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
