import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as celery from 'celery-node'


@Injectable()
export class RedisManager {

    redisBrokerAdr: string;

    redisBackendAdr: string;

    constructor(redisBroker: string, redisBackendAdr: string) {
        this.redisBrokerAdr = redisBroker;
        this.redisBackendAdr = redisBackendAdr;
    }


    async sendMessage(taskName: string, taskData: string[]) {

        try {

            let client = celery.createClient(this.redisBrokerAdr, this.redisBackendAdr)

            client.conf.TASK_PROTOCOL = 1

            const task = client.createTask(taskName);

            task.applyAsync(taskData)

        } catch (err) {
            console.log(err)
        }


    }

}