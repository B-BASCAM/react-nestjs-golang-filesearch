package service

import (
	"golangapp/golang-app/pkg/config"

	"github.com/gocelery/gocelery"
	"github.com/gomodule/redigo/redis"
)

func createRedisQueueChannel() {

	redisQueueChannel = make(chan SearchTask, totalWorkerCount*2)
}

func addTasksToChannelFromQueue() {

	var counts int = 0

	redisPool := &redis.Pool{
		Dial: func() (redis.Conn, error) {
			c, err := redis.DialURL(config.GetConfig()["REDIS_BROKER"])
			if err != nil {
				return nil, err
			}
			return c, err
		},
	}

	cli, _ := gocelery.NewCeleryClient(
		gocelery.NewRedisBroker(redisPool),
		&gocelery.RedisCeleryBackend{Pool: redisPool},
		1,
	)

	add := func(taskId, requestedFileName string) string {

		counts = counts + 1

		searchTask := SearchTask{taskId: taskId, requestedFileName: requestedFileName}

		redisQueueChannel <- searchTask

		return "0"
	}

	cli.Register("add", add)

	cli.StartWorker()
}
