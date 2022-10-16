import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { FileSearchCreatedEvent } from './filesearch-created.event';
import { RedisManager } from '../queue/redismanager';

@EventsHandler(FileSearchCreatedEvent)
export class FileSearchCreatedHandler
  implements IEventHandler<FileSearchCreatedEvent> {

  constructor(
    private readonly redisManager: RedisManager,
  ) { }

  handle(event: FileSearchCreatedEvent) {
    const { createfileSearchResDto } = event;
    const taskName: string = "add";
    const taskData: string[] = [createfileSearchResDto.id, createfileSearchResDto.requestedFileName];

    this.redisManager.sendMessage(taskName, taskData)
  }

}
