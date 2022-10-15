import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { FileSearchCreatedEvent } from './filesearch-created.event';
import { FilesEntityRepository } from '../repository/files-entity.repository';
@EventsHandler(FileSearchCreatedEvent)
export class FileSearchCreatedHandler
  implements IEventHandler<FileSearchCreatedEvent> {


  constructor(
    private readonly repository: FilesEntityRepository
  ) { }

  //TODO queue ekle starting to queue
  handle(event: FileSearchCreatedEvent) {
    const { heroId, dragonId } = event;
    console.log(clc.greenBright('FileSearchCreated...') + "heroId:" + heroId + ", dragonId:" + "dragonId");
  }
}
