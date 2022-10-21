package repositoryNestService

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"

	"golangapp/golang-app/pkg/logger"
	"golangapp/golang-app/pkg/model"
	repositoryInterface "golangapp/golang-app/pkg/repository"
)

var serviceUrl string

func NewDBEntity(dataBaseName string, serverUrl string) *DBEntity {

	dbEntity := &DBEntity{}

	dbEntity.TaskEntityList = TaskEntityDB{}

	dbEntity.TaskDetailEntityList = TaskDetailEntityDB{}

	serviceUrl = serverUrl

	return dbEntity
}

type DBEntity struct {
	TaskEntityList       TaskEntityDB
	TaskDetailEntityList TaskDetailEntityDB
	ServerUrl            string
	DatabaseName         string
}

func (entity *DBEntity) GetTaskEntityDB() repositoryInterface.TaskEntityDB {
	return entity.TaskEntityList
}

func (entity *DBEntity) GetTaskDetailEntityDB() repositoryInterface.TaskDetailEntityDB {
	return entity.TaskDetailEntityList
}

func (entity *DBEntity) Connect() {

}

type TaskEntityDB model.TaskEntity

func (t TaskEntityDB) Update(m model.TaskEntity) error {

	taskJSON, err := json.Marshal(m)

	req, err := http.NewRequest(http.MethodPost, serviceUrl+"updateTask", bytes.NewBuffer(taskJSON))
	if err != nil {
		logger.GetLogger().Fatalf("client: could not create request: %s\n", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := http.Client{
		Timeout: 30 * time.Second,
	}

	_, err = client.Do(req)

	if err != nil {
		logger.GetLogger().Fatalf("client: error making http request: %s\n", err)
	}

	return err

}

type TaskDetailEntityDB model.TaskDetailEntity

func (t TaskDetailEntityDB) AddMany(m []model.TaskDetailEntity) error {

	taskDetailListJSON, err := json.Marshal(m)

	req, err := http.NewRequest(http.MethodPost, serviceUrl+"createTaskDetail", bytes.NewBuffer(taskDetailListJSON))
	if err != nil {
		logger.GetLogger().Fatalf("client: could not create request: %s\n", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := http.Client{
		Timeout: 30 * time.Second,
	}

	_, err = client.Do(req)

	if err != nil {
		logger.GetLogger().Fatalf("client: error making http request: %s\n", err)
	}

	return err
}
