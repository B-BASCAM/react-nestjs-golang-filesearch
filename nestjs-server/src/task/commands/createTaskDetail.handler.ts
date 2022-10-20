import { } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskDetailCommand } from './CreateTaskDetail.command';
import { TasksEntityRepository } from '../repository/tasksEntity.repository';
import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateTaskDetailReqDto } from '../dto';
import { TaskDetailEntity } from '../entities/taskDetail.entity';

@CommandHandler(CreateTaskDetailCommand)
export class CreateTaskDetailHandler extends AutomapperProfile
    implements ICommandHandler<CreateTaskDetailCommand>
{

    constructor(
        private readonly repository: TasksEntityRepository,
        @InjectMapper() mapper: Mapper,) { super(mapper); }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CreateTaskDetailReqDto, TaskDetailEntity);
        };
    }

    async execute(CreateTaskDetailCommand: CreateTaskDetailCommand): Promise<any> {

        const { ObjectID } = require('mongodb').ObjectId;

        const { createTaskDetailReqDtoList } = CreateTaskDetailCommand;

        var taskDetailList = createTaskDetailReqDtoList.map(createTaskDetailReqDto => this.mapper.map(createTaskDetailReqDto, CreateTaskDetailReqDto, TaskDetailEntity))

        return this.repository.createManyTaskDetail(taskDetailList)
    }
}
