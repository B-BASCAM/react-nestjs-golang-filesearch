package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TaskDetailEntity struct {
	Id              primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	TaskId          primitive.ObjectID `bson:"taskId,omitempty" json:"taskId,omitempty"`
	MatchedFilePath string             `bson:"matchedFilePath,omitempty" json:"matchedFilePath,omitempty"`
}
