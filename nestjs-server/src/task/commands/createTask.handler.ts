import { } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './createTask.command';
import { TasksEntityRepository } from '../repository/tasksEntity.repository';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { afterMap, beforeMap, createMap, Mapper } from '@automapper/core';
import { TaskEntity } from '../entities/task.entity';
import { CreateTaskReqDto, CreateTaskResDto } from '../dto/index';
import { statusEnum } from '../enums/status.enum';
import { TaskCreatedEvent } from '../events/taskCreated.event';
import { formatDate } from '../helpers/formatDate';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler
    extends AutomapperProfile
    implements ICommandHandler<CreateTaskCommand>
{

    constructor(
        private readonly repository: TasksEntityRepository,
        private readonly eventBus: EventBus,
        @InjectMapper() mapper: Mapper,
    ) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, TaskEntity, CreateTaskResDto,
                afterMap((source, destination) => {
                    destination.id = source._id.toString()
                }));

            createMap(mapper, CreateTaskReqDto, TaskEntity,
                beforeMap((source, destination) => {
                    destination.createAt = formatDate(new Date()),
                        destination.updateAt = formatDate(new Date()),
                        destination.progressPercentage = 0,
                        destination.status = statusEnum.Waiting
                }));
        };
    }

    async execute(createTaskCommand: CreateTaskCommand): Promise<any> {

        const { createTaskReqDto } = createTaskCommand;

        const taskEntity = this.mapper.map(createTaskReqDto, CreateTaskReqDto, TaskEntity);

        const createdTaskEntity = await this.repository.createTask(taskEntity);

        const createTaskResDto = this.mapper.map(createdTaskEntity, TaskEntity, CreateTaskResDto);

        this.eventBus.publish(
            new TaskCreatedEvent(createTaskResDto)
        )

        return createTaskResDto;
    }
}
