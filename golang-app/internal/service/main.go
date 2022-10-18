package usecase

var redisQueueChannel = make(chan searchTask, 30)
var workerCount = 15
var intervalCount int = 0 //sistemdeki tüm dosyaları say 10 ekle; 5'e böl %10 artsın
var intervalPercentage int = 0

type searchTask struct {
	id                string
	requestedFileName string
}

func InitializeWorkers() {

	go addChannelFromQueue()

	startWorkers()
}

func startWorkers() {
	for i := 0; i < workerCount; i++ {
		go func() {
			for {
				data := <-redisQueueChannel
				getFileNames(data)
			}
		}()
	}
}

func SetIntervalVariables(count int, percentage int) {
	intervalCount = count
	intervalPercentage = percentage
}
