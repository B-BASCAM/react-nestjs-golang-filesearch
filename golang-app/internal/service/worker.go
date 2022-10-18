package service

import (
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

func startWorkers() {

	for i := 0; i < totalWorkerCount; i++ {

		go func() {

			for {

				data := <-redisQueueChannel

				searchPathsForFileNames(data)
			}

		}()

	}

}

func setTotalWorkerCount() {

	workerCount, err := strconv.Atoi(config.GetConfig()["GOROUTINE_COUNT"])

	if err == nil {

		totalWorkerCount = workerCount
	}

}

func searchPathsForFileNames(searchtask searchTask) error {

	var (
		currentCount        int = 0
		matchedFilePaths    []string
		currentPercentage   int = 0
		countOfMatchedFiles int = 0
	)

	err := filepath.Walk(rootPath, func(path string, info os.FileInfo, err error) error {

		if err != nil {
			return nil
		}

		if info.IsDir() {
			return nil
		}

		currentCount = currentCount + 1

		if strings.Contains(path, searchtask.requestedFileName) {

			countOfMatchedFiles = countOfMatchedFiles + 1

			matchedFilePaths = append(matchedFilePaths, path)
		}

		if intervalCount > 0 && currentCount%intervalCount == 0 {

			currentPercentage = (currentCount / intervalCount) * intervalPercentage

			editTaskAddTaskDetail(searchtask.taskId, currentPercentage, matchedFilePaths, countOfMatchedFiles, int(model.InProgress))

			matchedFilePaths = []string{}
		}

		return nil
	})

	if err == nil {

		currentPercentage = 100

		editTaskAddTaskDetail(searchtask.taskId, currentPercentage, matchedFilePaths, countOfMatchedFiles, int(model.Success))

	} else {

		editTaskAddTaskDetail(searchtask.taskId, currentPercentage, matchedFilePaths, countOfMatchedFiles, int(model.Fail))
	}

	return err
}

func editTaskAddTaskDetail(taskID string, currentPercentage int, matchedFilePaths []string, countOfMatchedFiles int, statusCode int) {

	castedTaskId, err := primitive.ObjectIDFromHex(taskID)

	if err != nil {

		logger.GetLogger().Println(err)

		return
	}

	go editTask(castedTaskId, currentPercentage, countOfMatchedFiles, statusCode)

	if len(matchedFilePaths) > 0 {

		go addTaskDetail(castedTaskId, matchedFilePaths)
	}

}

func addTaskDetail(searchID primitive.ObjectID, matchedFilePaths []string) {

	var sliceFileSearchTaskDetailEntity []model.FileSearchTaskDetailEntity

	for _, pathName := range matchedFilePaths {
		sliceFileSearchTaskDetailEntity = append(sliceFileSearchTaskDetailEntity, model.FileSearchTaskDetailEntity{
			Searchid:        searchID,
			MatchedFilePath: pathName,
		})
	}

	err := repositoryinterface.GetDB().GetFileSearchTaskDetailEntityDB().AddMany(sliceFileSearchTaskDetailEntity)

	if err != nil {
		logger.GetLogger().Println(err)
	}
}

func editTask(taskId primitive.ObjectID, currentPercentage int, countOfMatchedFiles int, statusCode int) {

	fileSearchTaskEntity := model.FileSearchTaskEntity{
		Id:                  taskId,
		SearchStatus:        statusCode,
		ProgressPercentage:  currentPercentage,
		CountOfMatchedFiles: countOfMatchedFiles,
		LastUpdateDate:      time.Now().Format("02.01.2006 15:04:05"),
	}

	err := repositoryinterface.GetDB().GetFileSearchTaskEntityDB().Update(fileSearchTaskEntity)

	if err != nil {
		logger.GetLogger().Println(err)
	}

}
