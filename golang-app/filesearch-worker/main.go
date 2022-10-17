package main

import (
	"fmt"
	"golangapp/golang-app/pkg"
	"golangapp/golang-app/pkg/logger"
	"golangapp/golang-app/pkg/model"
	"golangapp/golang-app/pkg/repository"
	repositorymongo "golangapp/golang-app/pkg/repository/mongo"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Initialize() {

	logger.CreateLogger("fw: ", "fileworker.log")

	repository.SetDB(repositorymongo.NewDBEntity("test", "mongodb://admin:admin@127.0.0.1:27017/admin?authSource=admin"))

	oid, err := primitive.ObjectIDFromHex("634dc4d1cab5cd3c280658c2")
	aa := model.FileSearchTaskEntity{
		Id:                  oid,
		SearchStatus:        1,
		ProgressPercentage:  20,
		CountOfMatchedFiles: 100,
		LastUpdateDate:      time.Now().Format("02.01.2006 15:04:05"),
	}
	err = repository.GetDB().GetFileSearchTaskEntityDB().Update(aa)

	// oid, err := primitive.ObjectIDFromHex("634dc4d1cab5cd3c280658c2")
	// aa := model.FileSearchTaskDetailEntity{
	// 	Searchid:        oid,
	// 	MatchedFilePath: "aadenemegolang",
	// }
	// err = repository.GetDB().GetFileSearchTaskDetailEntityDB().Add(aa)

	fmt.Println(err)

}

func main() {

	pkg.SetWorkingDirectory()

	go Initialize()

	pkg.WaitForTerminate()
}
