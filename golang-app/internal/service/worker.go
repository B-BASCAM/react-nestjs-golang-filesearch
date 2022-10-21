package service

import (
	"golangapp/golang-app/pkg/config"
	"golangapp/golang-app/pkg/logger"
	"golangapp/golang-app/pkg/model"
	repositoryInterface "golangapp/golang-app/pkg/repository"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

func startWorkers() {

	logger.GetLogger().Println("GOROUTINES ARE RUNNING")

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

func searchPathsForFileNames(searchTask SearchTask) error {

	var (
		currentCount        int = 0
		matchedFilePaths    []string
		currentPercentage   int    = 0
		countOfMatchedFiles int    = 0
		taskResult          string = string(model.Error)
	)

	err := filepath.Walk(rootPath, func(path string, info os.FileInfo, err error) error {

		if err != nil {
			return nil
		}

		if info.IsDir() {
			return nil
		}

		currentCount = currentCount + 1

		if strings.Contains(path, searchTask.requestedFileName) {

			countOfMatchedFiles = countOfMatchedFiles + 1

			matchedFilePaths = append(matchedFilePaths, path)
		}

		if intervalCount > 0 && currentCount%intervalCount == 0 {

			currentPercentage = (currentCount / intervalCount) * intervalPercentage

			editTaskAddTaskDetail(searchTask.taskId, currentPercentage, matchedFilePaths, countOfMatchedFiles, string(model.Processing), "")

			matchedFilePaths = []string{}
		}

		return nil
	})
	taskResult = string(model.Error)
	if err == nil {
		taskResult = string(model.Success)
		currentPercentage = 100
	} else {
		logger.GetLogger().Println(err)
	}

	editTaskAddTaskDetail(searchTask.taskId, currentPercentage, matchedFilePaths, countOfMatchedFiles, string(model.Completed), taskResult)

	return err
}

func editTaskAddTaskDetail(taskID string, currentPercentage int, matchedFilePaths []string, countOfMatchedFiles int, status string, result string) {

	go editTask(taskID, currentPercentage, countOfMatchedFiles, status, result)

	if len(matchedFilePaths) > 0 {
		go addTaskDetail(taskID, matchedFilePaths)
	}

}

func addTaskDetail(taskId string, matchedFilePaths []string) {

	var taskDetailEntityList []model.TaskDetailEntity

	for _, pathName := range matchedFilePaths {
		taskDetailEntityList = append(taskDetailEntityList, model.TaskDetailEntity{
			TaskId:          taskId,
			MatchedFilePath: pathName,
		})
	}

	err := repositoryInterface.GetDB().GetTaskDetailEntityDB().AddMany(taskDetailEntityList)

	if err != nil {
		logger.GetLogger().Println(err)
	}
}

func editTask(taskId string, currentPercentage int, countOfMatchedFiles int, status string, result string) {

	taskEntity := model.TaskEntity{
		Id:                  taskId,
		Status:              status,
		ProgressPercentage:  currentPercentage,
		CountOfMatchedFiles: countOfMatchedFiles,
		UpdateAt:            time.Now().Format("02.01.2006 15:04:05"),
		Result:              result,
	}

	err := repositoryInterface.GetDB().GetTaskEntityDB().Update(taskEntity)

	if err != nil {
		logger.GetLogger().Println(err)
	}

}
