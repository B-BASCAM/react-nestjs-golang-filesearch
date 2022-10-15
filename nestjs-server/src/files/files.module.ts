import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileSearchEntity } from './entities/filesearch.entity';
import { FilesEntityRepository } from './repository/files-entity.repository';
import { QueryHandlers } from './queries/index';
import { CommandHandlers } from './commands/index';
import { EventHandlers } from './events/index';
import { AutomapperModule } from '@automapper/nestjs';
import { FilesController } from './files.controller';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FileSearchEntity]),
    AutomapperModule
  ],
  controllers: [FilesController],
  providers: [
    FilesEntityRepository,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers
  ],
})
export class FilesModule { }
