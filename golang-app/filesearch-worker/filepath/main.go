package filepath

import (
	"fmt"
	"os"
	"path/filepath"
)

var intervalCount int = 0 //sistemdeki tüm dosyaları say 10 ekle; 5'e böl %10 artsın
var intervalPercentage int = 0

func GetFileNames(id string, rootPath string) error {

	var count int = 0
	var filePaths []string
	var percentage int = 0

	err := filepath.Walk(rootPath, func(path string, info os.FileInfo, err error) error {

		if err != nil {
			fmt.Println(err)
			return err
		}
		if info.IsDir() {
			return nil
		}
		count++
		filePaths = append(filePaths, path)
		if intervalCount > 0 && count%intervalCount == 0 {
			percentage = (count / intervalCount) * intervalPercentage
			fmt.Println(percentage)
			//mongoyaz(percentage, filePaths, statuskod:processing, count)
			filePaths = []string{}
		}

		return nil
	})
	if err == nil {
		//%100 bitti
		//mongoyaz(100, filePaths,statuskod:end,count)
	} else {
		//mongoyaz(percentage, filePaths,statuskod:fail,count)
	}

	return err
}

func SetIntervalVariables(count int, percentage int) {
	intervalCount = count
	intervalPercentage = percentage
}
