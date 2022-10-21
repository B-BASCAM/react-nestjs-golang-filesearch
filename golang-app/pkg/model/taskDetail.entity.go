package model

type TaskDetailEntity struct {
	Id              string `bson:"id" json:"id"`
	TaskId          string `bson:"taskId" json:"taskId"`
	MatchedFilePath string `bson:"matchedFilePath" json:"matchedFilePath"`
}
