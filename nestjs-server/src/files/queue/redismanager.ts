import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as celery from 'celery-node'


@Injectable()
export class RedisManager {

    constructor(private readonly configService: ConfigService,) { }


    async sendMessage(taskName: string, taskData: string[]) {

        let client = celery.createClient(
            this.configService.get('REDIS_BROKER', ''),
            this.configService.get('REDIS_BACKEND', '')
        )

        //gocelery does not support TASK_PROTOCOL=2
        client.conf.TASK_PROTOCOL = 1

        const task = client.createTask(taskName);

        const result = task.applyAsync(taskData).result().then(data => {
            client.disconnect();
        });

    }
}