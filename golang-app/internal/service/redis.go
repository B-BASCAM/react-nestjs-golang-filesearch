package usecase

import (
	"github.com/gocelery/gocelery"
	"github.com/gomodule/redigo/redis"
)

// celery "github.com/gocelery/gocelery" ihtiyaç duyar
func addChannelFromQueue() {

	var counts int = 0
	// create redis connection pool
	redisPool := &redis.Pool{
		Dial: func() (redis.Conn, error) {
			c, err := redis.DialURL("redis://127.0.0.1:5003")
			if err != nil {
				return nil, err
			}
			return c, err
		},
	}

	// initialize celery client
	cli, _ := gocelery.NewCeleryClient(
		gocelery.NewRedisBroker(redisPool),
		&gocelery.RedisCeleryBackend{Pool: redisPool},
		1, // number of workers
	)

	add := func(id, requestedFileName string) string { //worker sayısını 5 yapabiliriz, burda veri varsa işlemi yapıp return deyip devam
		counts = counts + 1

		searchtask := searchTask{id: id, requestedFileName: requestedFileName}
		//sendNestjs()
		//time.Sleep(10 * time.Second)
		redisQueueChannel <- searchtask //kanal kapasitesi 2, kuyruktan 3 ü okur buraya geldiğinde kanalın boşalmasını bekler

		return "0" //return demeden yeni işleme başlamıyor

	}

	// register task
	cli.Register("add", add)
	// start workers (non-blocking call)

	cli.StartWorker()
	// wait for client request

	//time.Sleep(10000 * time.Second)
	// stop workers gracefully (blocking call)
	//cli.StopWorker()

}
