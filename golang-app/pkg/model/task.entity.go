package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TaskEntity struct {
	Id                  primitive.ObjectID `bson:"id,omitempty" json:"id,omitempty"`
	RequestedFileName   string             `bson:"requestedFileName,omitempty" json:"requestedFileName,omitempty"`
	Status              string             `bson:"status,omitempty" json:"status,omitempty"`
	ProgressPercentage  int                `bson:"progressPercentage,omitempty" json:"progressPercentage,omitempty"`
	CountOfMatchedFiles int                `bson:"countOfMatchedFiles,omitempty" json:"countOfMatchedFiles,omitempty"`
	CreateAt            string             `bson:"createAt,omitempty" json:"createAt,omitempty"`
	UpdateAt            string             `bson:"updateAt,omitempty" json:"updateAt,omitempty"`
	Result              string             `bson:"result,omitempty" json:"result,omitempty"`
}
