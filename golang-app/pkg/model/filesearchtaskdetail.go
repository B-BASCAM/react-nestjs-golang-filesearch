package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FileSearchTaskDetailEntity struct {
	Id              primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Searchid        primitive.ObjectID `bson:"searchid,omitempty" json:"searchid,omitempty"`
	MatchedFilePath string             `bson:"matchedFilePath,omitempty" json:"matchedFilePath,omitempty"`
}
