package service

var (
	redisQueueChannel  chan searchTask
	totalWorkerCount   = 1000
	intervalCount      = 0
	intervalPercentage = 5
	rootPath           = "C://"
)

type searchTask struct {
	id                string
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
