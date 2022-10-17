package repositorymongo

import (
	"context"
	"fmt"
	"golangapp/golang-app/pkg/model"
	"golangapp/golang-app/pkg/repository"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

var db *mongo.Database
var (
	BooksCollection   *mongo.Collection
	AuthorsCollection *mongo.Collection
	Ctx               = context.TODO()
)

func NewDBEntity(dataBase string, server string) *DBEntity {
	dbEntity := &DBEntity{}
	dbEntity.FileSearchTaskEntityList = FileSearchTaskEntityDB{}
	dbEntity.FileSearchTaskDetailEntityList = FileSearchTaskDetailEntityDB{}
	dbEntity.Server = server
	dbEntity.Database = dataBase
	dbEntity.Connect()
	return dbEntity
}

type DBEntity struct {
	FileSearchTaskEntityList       FileSearchTaskEntityDB
	FileSearchTaskDetailEntityList FileSearchTaskDetailEntityDB
	Server                         string
	Database                       string
}

func (entity *DBEntity) GetFileSearchTaskEntityDB() repository.FileSearchTaskEntityDB {
	return entity.FileSearchTaskEntityList
}

func (entity *DBEntity) GetFileSearchTaskDetailEntityDB() repository.FileSearchTaskDetailEntityDB {
	return entity.FileSearchTaskDetailEntityList
}

func (entity *DBEntity) Connect() {

	host := "127.0.0.1"
	port := "27017"
	connectionURI := "mongodb://admin:admin@" + host + ":" + port + "/"
	clientOptions := options.Client().ApplyURI(connectionURI)
	client, err := mongo.Connect(Ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(Ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	db = client.Database("test")
	fmt.Println(db.Name())

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
