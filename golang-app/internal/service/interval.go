package service

import (
	"golangapp/golang-app/pkg/config"
	"golangapp/golang-app/pkg/logger"
	"os"
	"path/filepath"
)

func setIntervalVariables() {

	rootPath = config.GetConfig()["SEARCH_ROOTPATH"]

	var count int = 0

	err := filepath.Walk(rootPath, func(path string, info os.FileInfo, err error) error {

		if err != nil {
			return nil
		}

		if info.IsDir() {
			return nil
		}

		count++

		return nil
	})

	if err != nil {
		logger.GetLogger().Fatal(err)
	}

	if count > 10000000 {
		intervalCount = count / 100
		intervalPercentage = 1
	} else if count > 1000000 {
		intervalCount = count / 50
		intervalPercentage = 2
	} else if count > 500000 {
		intervalCount = count / 33
		intervalPercentage = 3
	} else if count > 150000 {
		intervalCount = count / 25
		intervalPercentage = 4
	} else if count > 100000 {
		intervalCount = count / 20
		intervalPercentage = 5
	} else if count > 50000 {
		intervalCount = count / 10
		intervalPercentage = 10
	} else if count > 30000 {
		intervalCount = count / 8
		intervalPercentage = 12
	} else if count > 10000 {
		intervalCount = count / 5
		intervalPercentage = 20
	} else if count > 2500 {
		intervalCount = count / 3
		intervalPercentage = 33
	} else if count > 500 {
		intervalCount = count / 2
		intervalPercentage = 50
	} else {
		intervalCount = count + 1
		intervalPercentage = 100
	}

}
