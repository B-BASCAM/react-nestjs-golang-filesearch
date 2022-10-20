package repositoryMongoDB

import (
	"context"

	"golangapp/golang-app/pkg/logger"
	"golangapp/golang-app/pkg/model"
	repositoryInterface "golangapp/golang-app/pkg/repository"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

var (
	db  *mongo.Database
	Ctx = context.TODO()
)

func NewDBEntity(dataBaseName string, serverUrl string) *DBEntity {

	dbEntity := &DBEntity{}

	dbEntity.TaskEntityList = TaskEntityDB{}

	dbEntity.TaskDetailEntityList = TaskDetailEntityDB{}

	dbEntity.ServerUrl = serverUrl

	dbEntity.DatabaseName = dataBaseName

	dbEntity.Connect()

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

	clientOptions := options.Client().ApplyURI(entity.ServerUrl)

	client, err := mongo.Connect(Ctx, clientOptions)

	if err != nil {
		logger.GetLogger().Fatal(err)
	}

	err = client.Ping(Ctx, nil)

	if err != nil {
		logger.GetLogger().Fatal(err)
	}

	db = client.Database(entity.DatabaseName)

}

type TaskEntityDB model.TaskEntity

func (f TaskEntityDB) Update(m model.TaskEntity) error {

	filter := bson.M{}

	filter["_id"] = m.Id

	update := bson.M{}

	options := bson.M{}

	options["status"] = m.Status

	options["countOfMatchedFiles"] = m.CountOfMatchedFiles

	options["updateAt"] = m.UpdateAt

	options["progressPercentage"] = m.ProgressPercentage

	options["result"] = m.Result

	update["$set"] = options

	_, err := (db.Collection("tasks")).UpdateOne(
		Ctx,
		filter,
		update,
	)

	return err

}

type TaskDetailEntityDB model.TaskDetailEntity

func (f TaskDetailEntityDB) AddMany(m []model.TaskDetailEntity) error {

	docs := make([]interface{}, len(m))

	for i, s := range m {

		docs[i] = s
	}
	_, err := (db.Collection("taskDetails")).InsertMany(Ctx, docs)

	return err
}
