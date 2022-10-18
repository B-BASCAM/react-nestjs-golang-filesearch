package usecase

import (
	"fmt"
	"golangapp/golang-app/pkg/model"
	repositoryinterface "golangapp/golang-app/pkg/repository"
	"os"
	"path/filepath"

	"go.mongodb.org/mongo-driver/bson/primitive"
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
			//mongoyaz(id, percentage, filePaths, statuskod:processing, count)
			filePaths = []string{}
		}

		return nil
	})

	if err == nil {
		//%100 bitti
		//mongoyaz(id, 100, filePaths,statuskod:end,count)
	} else {
		//mongoyaz(,di percentage, filePaths,statuskod:fail,count)
	}

	return err
}

func SetIntervalVariables(count int, percentage int) {
	intervalCount = count
	intervalPercentage = percentage
}

func Dbdb() {
	// oid, err := primitive.ObjectIDFromHex("634dc4d1cab5cd3c280658c2")
	// aa := model.FileSearchTaskEntity{
	// 	Id:                  oid,
	// 	SearchStatus:        1,
	// 	ProgressPercentage:  40,
	// 	CountOfMatchedFiles: 100,
	// 	LastUpdateDate:      time.Now().Format("02.01.2006 15:04:05"),
	// }
	// err = repositoryinterface.GetDB().GetFileSearchTaskEntityDB().Update(aa)

	oid, err := primitive.ObjectIDFromHex("634e04cc8ce4c330284c094e")
	aa := model.FileSearchTaskDetailEntity{
		Searchid:        oid,
		MatchedFilePath: "aadenemegolang",
	}
	bb := model.FileSearchTaskDetailEntity{
		Searchid:        oid,
		MatchedFilePath: "bbdenemegolang",
	}

	var m []model.FileSearchTaskDetailEntity
	m = append(m, aa)
	m = append(m, bb)

	err = repositoryinterface.GetDB().GetFileSearchTaskDetailEntityDB().AddMany(m)

	fmt.Println(err)
}
