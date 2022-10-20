package service

var (
	redisQueueChannel  chan SearchTask
	totalWorkerCount   = 1000
	intervalCount      = 0
	intervalPercentage = 5
	rootPath           = "C://"
)

type SearchTask struct {
	taskId            string
	requestedFileName string
}

func Initialize() {

	initializeSettings()

	go addTasksToChannelFromQueue()

	startWorkers()
}

func initializeSettings() {

	setIntervalVariables()

	setTotalWorkerCount()

	createRedisQueueChannel()
}
