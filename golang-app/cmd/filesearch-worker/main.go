package main

import (
	"fmt"
	usecase "golangapp/golang-app/internal/service"
	"golangapp/golang-app/pkg"
	"golangapp/golang-app/pkg/config"
	"golangapp/golang-app/pkg/logger"
	repositoryinterface "golangapp/golang-app/pkg/repository"
	repositorymongo "golangapp/golang-app/pkg/repository/mongo"
)

func Initialize() {

	config.FillFromConfigFile("internal/config/config.json")

	fmt.Println(config.GetConfig()["LOG_PREFIX"])

	logger.CreateLogger(config.GetConfig()["LOG_PREFIX"], config.GetConfig()["LOG_FILENAME"])

	repositoryinterface.SetDB(repositorymongo.NewDBEntity(config.GetConfig()["MONGODB_DATABASE"], config.GetConfig()["MONGODB_SERVERURL"]))

	usecase.Dbdb()

}

func main() {

	pkg.SetWorkingDirectory()

	go Initialize()

	pkg.WaitForTerminate()
}
