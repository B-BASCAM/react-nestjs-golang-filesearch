package repositorymongodb

import (
	"context"

	"golangapp/golang-app/pkg/logger"
	"golangapp/golang-app/pkg/model"
	repositoryinterface "golangapp/golang-app/pkg/repository"

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

	dbEntity.FileSearchTaskEntityList = FileSearchTaskEntityDB{}

	dbEntity.FileSearchTaskDetailEntityList = FileSearchTaskDetailEntityDB{}

	dbEntity.ServerUrl = serverUrl

	dbEntity.DatabaseName = dataBaseName

	dbEntity.Connect()

	return dbEntity
}

type DBEntity struct {
	FileSearchTaskEntityList       FileSearchTaskEntityDB
	FileSearchTaskDetailEntityList FileSearchTaskDetailEntityDB
	ServerUrl                      string
	DatabaseName                   string
}

func (entity *DBEntity) GetFileSearchTaskEntityDB() repositoryinterface.FileSearchTaskEntityDB {
	return entity.FileSearchTaskEntityList
}

func (entity *DBEntity) GetFileSearchTaskDetailEntityDB() repositoryinterface.FileSearchTaskDetailEntityDB {
	return entity.FileSearchTaskDetailEntityList
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

type FileSearchTaskEntityDB model.FileSearchTaskEntity

func (f FileSearchTaskEntityDB) Update(m model.FileSearchTaskEntity) error {

	filter := bson.M{}

	filter["_id"] = m.Id

	update := bson.M{}

	options := bson.M{}

	options["searchStatus"] = m.SearchStatus

	options["countOfMatchedFiles"] = m.CountOfMatchedFiles

	options["lastUpdateDate"] = m.LastUpdateDate

	options["progressPercentage"] = m.ProgressPercentage

	update["$set"] = options

	_, err := (db.Collection("filesearchtasks")).UpdateOne(
		Ctx,
		filter,
		update,
	)

	return err

}

type FileSearchTaskDetailEntityDB model.FileSearchTaskDetailEntity

func (f FileSearchTaskDetailEntityDB) Add(m model.FileSearchTaskDetailEntity) error {

	_, err := (db.Collection("filesearchtaskdetails")).InsertOne(Ctx, m)

	return err
}

func (f FileSearchTaskDetailEntityDB) AddMany(m []model.FileSearchTaskDetailEntity) error {

	docs := make([]interface{}, len(m))

	for i, s := range m {

		docs[i] = s
	}
	_, err := (db.Collection("filesearchtaskdetails")).InsertMany(Ctx, docs)

	return err
}
