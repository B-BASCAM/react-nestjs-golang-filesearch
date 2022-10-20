package main

import (
	service "golangapp/golang-app/internal/service"
	"golangapp/golang-app/pkg"
	"golangapp/golang-app/pkg/config"
	"golangapp/golang-app/pkg/logger"
	repositoryInterface "golangapp/golang-app/pkg/repository"
	repositoryMongoDB "golangapp/golang-app/pkg/repository/mongodb"
)

const (
	configFile = "config.json"
)

func main() {

	pkg.SetWorkingDirectory()

	go Initialize()

	pkg.WaitForTerminate()
}

func Initialize() {

	config.Initialize(configFile)

	logger.CreateLogger(config.GetConfig()["LOG_PREFIX"], config.GetConfig()["LOG_FILENAME"])

	repositoryInterface.SetDB(repositoryMongoDB.NewDBEntity(config.GetConfig()["MONGODB_DATABASE"], config.GetConfig()["MONGODB_SERVERURL"]))

	go service.Initialize()

}
