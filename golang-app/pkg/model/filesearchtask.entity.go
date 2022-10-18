package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FileSearchTaskEntity struct {
	Id                  primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	RequestedFileName   string             `bson:"requestedFileName,omitempty" json:"requestedFileName,omitempty"`
	SearchStatus        int                `bson:"searchStatus,omitempty" json:"searchStatus,omitempty"`
	ProgressPercentage  int                `bson:"progressPercentage,omitempty" json:"progressPercentage,omitempty"`
	CountOfMatchedFiles int                `bson:"countOfMatchedFiles,omitempty" json:"countOfMatchedFiles,omitempty"`
	CreateDate          string             `bson:"createDate,omitempty" json:"createDate,omitempty"`
	LastUpdateDate      string             `bson:"lastUpdateDate,omitempty" json:"lastUpdateDate,omitempty"`
}
