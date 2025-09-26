package main

import (
	"context"

	"github.com/Owbird/KNUST-AIM-API/pkg/auth"
	"github.com/Owbird/KNUST-AIM-API/pkg/news"
	"github.com/Owbird/KNUST-AIM-API/pkg/results"
	"github.com/Owbird/KNUST-AIM-API/pkg/status"
	"github.com/Owbird/KNUST-AIM-API/pkg/user"
)

// App struct
type App struct {
	ctx             context.Context
	UserFunctions   *user.UserFunctions
	ResultFunctions *results.ResultsFunctions
	AuthFunctions   *auth.AuthFunctions
	NewsFunctions   *news.NewsFunctions
	StatusFunctions *status.StatusFunctions
}

var Version string

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		UserFunctions:   user.NewUserFunctions(),
		ResultFunctions: results.NewResultsFunctions(),
		AuthFunctions:   auth.NewAuthFunctions(),
		NewsFunctions:   news.NewNewsFunctions(),
		StatusFunctions: status.NewStatusFunctions(),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetVersion() string { return Version }
