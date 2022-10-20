import { } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './updateTask.command';
import { TasksEntityRepository } from '../repository/tasksEntity.repository';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler
    implements ICommandHandler<UpdateTaskCommand>
{

    constructor(private readonly repository: TasksEntityRepository) { }

    async execute(UpdateTaskCommand: UpdateTaskCommand): Promise<any> {

        const { ObjectID } = require('mongodb').ObjectId;

        const { updateTaskReqDto } = UpdateTaskCommand;

        return this.repository.updateOneTask({ _id: ObjectID(updateTaskReqDto.id) }, {
            $set:
            {
                countOfMatchedFiles: updateTaskReqDto.countOfMatchedFiles,
                progressPercentage: updateTaskReqDto.progressPercentage,
                result: updateTaskReqDto.result,
                status: updateTaskReqDto.status,
                updateAt: updateTaskReqDto.updateAt,
            }
        })
    }
}
