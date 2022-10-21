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

		if count > 0 && count%100000 == 0 {
			logger.GetLogger().Println("COUNTING CONTINUES :", count)
		}

		return nil
	})

	if err != nil {
		logger.GetLogger().Fatal(err)
	}

	switch totalCount := count; {

	case totalCount > 10000000:
		intervalCount = count / 100
		intervalPercentage = 1
	case totalCount > 1000000:
		intervalCount = count / 50
		intervalPercentage = 2
	case totalCount > 500000:
		intervalCount = count / 33
		intervalPercentage = 3
	case totalCount > 150000:
		intervalCount = count / 25
		intervalPercentage = 4
	case totalCount > 100000:
		intervalCount = count / 20
		intervalPercentage = 5
	case totalCount > 50000:
		intervalCount = count / 10
		intervalPercentage = 10
	case totalCount > 30000:
		intervalCount = count / 9
		intervalPercentage = 11
	case totalCount > 10000:
		intervalCount = count / 5
		intervalPercentage = 20
	case totalCount > 2500:
		intervalCount = count / 3
		intervalPercentage = 33
	case totalCount > 500:
		intervalCount = count / 2
		intervalPercentage = 50
	default:
		intervalCount = count + 1
		intervalPercentage = 100
	}
}
