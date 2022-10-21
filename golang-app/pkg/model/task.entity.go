package model

type TaskEntity struct {
	Id                  string `bson:"id" json:"id"`
	RequestedFileName   string `bson:"requestedFileName" json:"requestedFileName"`
	Status              string `bson:"status" json:"status"`
	ProgressPercentage  int    `bson:"progressPercentage" json:"progressPercentage"`
	CountOfMatchedFiles int    `bson:"countOfMatchedFiles" json:"countOfMatchedFiles"`
	CreateAt            string `bson:"createAt" json:"createAt"`
	UpdateAt            string `bson:"updateAt" json:"updateAt"`
	Result              string `bson:"result" json:"result"`
}
