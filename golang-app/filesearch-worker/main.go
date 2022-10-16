package main

import (
	"golangapp/golang-app/pkg"
	"golangapp/golang-app/pkg/logger"
)

func Initialize() {
	logger.CreateLogger("fw: ", "fileworker.log")
}

func main() {

	pkg.SetWorkingDirectory()

	go Initialize()

	pkg.WaitForTerminate()
}
