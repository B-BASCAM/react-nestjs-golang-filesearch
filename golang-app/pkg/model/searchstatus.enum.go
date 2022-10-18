package model

type SearchStatusEnum byte

const (
	New            SearchStatusEnum = 0
	InProgress     SearchStatusEnum = 1
	Success        SearchStatusEnum = 2
	Fail           SearchStatusEnum = 3
	RetriedSuccess SearchStatusEnum = 4
	RetriedFail    SearchStatusEnum = 5
)
