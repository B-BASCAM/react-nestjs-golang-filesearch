package repositoryinterface

import (
	"golangapp/golang-app/pkg/model"
)

var (
	constantDB DB
)

func SetDB(db DB) {

	constantDB = db
}

func GetDB() DB {

	return constantDB
}

type DB interface {
	GetTaskEntityDB() TaskEntityDB
	GetTaskDetailEntityDB() TaskDetailEntityDB
	Connect()
}

type TaskEntityDB interface {
	Update(m model.TaskEntity) error
}

type TaskDetailEntityDB interface {
	AddMany(m []model.TaskDetailEntity) error
}
