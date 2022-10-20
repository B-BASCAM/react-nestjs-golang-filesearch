import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskCreatedEvent } from './taskCreated.event';
import { RedisManager } from '../queue/redisManager';

@EventsHandler(TaskCreatedEvent)
export class TaskCreatedHandler
  implements IEventHandler<TaskCreatedEvent> {

  constructor(
    private readonly redisManager: RedisManager,
  ) { }

  handle(event: TaskCreatedEvent) {

    const { createTaskResDto } = event;

    const taskName: string = "add";

    const taskData: string[] = [createTaskResDto.id, createTaskResDto.requestedFileName];

    this.redisManager.sendMessage(taskName, taskData)
  }

}
