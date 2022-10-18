package main

import (
	usecase "golangapp/golang-app/internal/service"
	"golangapp/golang-app/pkg"
	"golangapp/golang-app/pkg/config"
	"golangapp/golang-app/pkg/logger"
	repositoryinterface "golangapp/golang-app/pkg/repository"
	repositorymongo "golangapp/golang-app/pkg/repository/mongo"
)

const (
	configFile = "internal/config/config.json"
)

func main() {

	pkg.SetWorkingDirectory()

	go Initialize()

	pkg.WaitForTerminate()
}

func Initialize() {

	config.FillFromConfigFile(configFile)

	logger.CreateLogger(config.GetConfig()["LOG_PREFIX"], config.GetConfig()["LOG_FILENAME"])

	repositoryinterface.SetDB(repositorymongo.NewDBEntity(config.GetConfig()["MONGODB_DATABASE"], config.GetConfig()["MONGODB_SERVERURL"]))

	go usecase.InitializeWorkers()

}
