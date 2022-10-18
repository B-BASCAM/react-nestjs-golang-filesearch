package service

import (
	"fmt"
	"golangapp/golang-app/pkg/config"
	"golangapp/golang-app/pkg/logger"
	"golangapp/golang-app/pkg/model"
	repositoryinterface "golangapp/golang-app/pkg/repository"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func setTotalWorkerCount() {

	workerCount, err := strconv.Atoi(config.GetConfig()["GOROUTINE_COUNT"])

	if err == nil {
		totalWorkerCount = workerCount
	}

}

func startWorkers() {
	for i := 0; i < totalWorkerCount; i++ {
		go func() {
			for {
				data := <-redisQueueChannel
				getFileNames(data)
			}
		}()
	}
}

func getFileNames(searchtask searchTask) error {
	var rootPath = "C://"
	var count int = 0
	var filePaths []string
	var percentage int = 0
	var countOfMatched int = 0

	err := filepath.Walk(rootPath, func(path string, info os.FileInfo, err error) error {

		if err != nil {

			return nil
		}

		if info.IsDir() {
			return nil
		}

		count++

		// a contains
		if strings.Contains(path, searchtask.requestedFileName) {
			countOfMatched = countOfMatched + 1
			filePaths = append(filePaths, path)
			fmt.Println(path)
		}

		if intervalCount > 0 && count%intervalCount == 0 {
			percentage = (count / intervalCount) * intervalPercentage
			fmt.Println(percentage)
			editTaskAddTaskDetail(searchtask.id, percentage, filePaths, countOfMatched, 1)

			filePaths = []string{}
		}

		return nil
	})

	if err == nil {
		percentage = 100
		editTaskAddTaskDetail(searchtask.id, percentage, filePaths, countOfMatched, 2)

	} else {

		editTaskAddTaskDetail(searchtask.id, percentage, filePaths, countOfMatched, 3)
	}

	return err
}

func editTaskAddTaskDetail(taskID string, percentage int, matchedFiles []string, countOfMatched int, statusCode int) {
	objectID, err := primitive.ObjectIDFromHex(taskID)
	if err != nil {
		logger.GetLogger().Println(err)
		return
	}
	go editTask(objectID, percentage, countOfMatched, statusCode)
	if len(matchedFiles) > 0 {
		go addTaskDetail(objectID, matchedFiles)
	}

}

func addTaskDetail(searchID primitive.ObjectID, matchedFiles []string) {

	var m []model.FileSearchTaskDetailEntity

	for _, name := range matchedFiles {
		m = append(m, model.FileSearchTaskDetailEntity{
			Searchid:        searchID,
			MatchedFilePath: name,
		})
	}

	err := repositoryinterface.GetDB().GetFileSearchTaskDetailEntityDB().AddMany(m)

	if err != nil {
		logger.GetLogger().Println(err)
	}
}

func editTask(taskId primitive.ObjectID, percentage int, countOfMatchedFiles int, statusCode int) {

	taskModel := model.FileSearchTaskEntity{
		Id:                  taskId,
		SearchStatus:        statusCode,
		ProgressPercentage:  percentage,
		CountOfMatchedFiles: countOfMatchedFiles,
		LastUpdateDate:      time.Now().Format("02.01.2006 15:04:05"),
	}

	err := repositoryinterface.GetDB().GetFileSearchTaskEntityDB().Update(taskModel)

	if err != nil {
		logger.GetLogger().Println(err)
	}

}
