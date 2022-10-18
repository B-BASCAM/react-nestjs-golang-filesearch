package repositoryinterface

import (
	"golangapp/golang-app/pkg/model"
)

var constantDB DB

func SetDB(db DB) {

	constantDB = db
}

func GetDB() DB {

	return constantDB
}

type DB interface {
	GetFileSearchTaskEntityDB() FileSearchTaskEntityDB

	GetFileSearchTaskDetailEntityDB() FileSearchTaskDetailEntityDB
}

type FileSearchTaskEntityDB interface {
	Update(m model.FileSearchTaskEntity) error
}

type FileSearchTaskDetailEntityDB interface {
	Add(m model.FileSearchTaskDetailEntity) error

	AddMany(m []model.FileSearchTaskDetailEntity) error
}
