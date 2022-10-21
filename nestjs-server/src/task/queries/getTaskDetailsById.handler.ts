import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TasksEntityRepository } from '../repository/tasksEntity.repository';
import { GetTaskDetailByIdQuery } from './getTaskDetailsById.query';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { afterMap, createMap, Mapper } from '@automapper/core';
import { ShowTaskDetailResDto } from '../dto/showTaskDetailRes.dto';
import { TaskEntity } from '../entities/task.entity';
import { customCacheManager } from '../cache/customCacheManager';


@QueryHandler(GetTaskDetailByIdQuery)
export class GetTaskDetailByIdHandler extends AutomapperProfile
    implements IQueryHandler<GetTaskDetailByIdQuery>
{

    constructor(private readonly repository: TasksEntityRepository,
        private readonly customCacheManager: customCacheManager,
        @InjectMapper() mapper: Mapper,
    ) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, TaskEntity, ShowTaskDetailResDto,
                afterMap((source, destination) => {


                }));
        };
    }

    async execute(query: GetTaskDetailByIdQuery) {

        const { showTaskDetailReqDto } = query;

        const cachedValue = await this.customCacheManager.getCached(Promise<ShowTaskDetailResDto>, showTaskDetailReqDto.id + showTaskDetailReqDto.pageNumber)

        if (cachedValue) {
            return JSON.parse(cachedValue);
        }

        const { ObjectID } = require('mongodb').ObjectId;

        const taskEntitys = await this.repository.findTaskById(ObjectID(showTaskDetailReqDto.id));

        const showTaskDetailResDto = this.mapper.map(taskEntitys, TaskEntity, ShowTaskDetailResDto);

        if (showTaskDetailResDto) {

            const skipNumber = Number(showTaskDetailReqDto.pageNumber) > 0 ? (Number(showTaskDetailReqDto.pageNumber) - 1) * 50 : 0;

            const options = { where: { taskId: ObjectID(showTaskDetailReqDto.id) }, skip: skipNumber, take: 50 }

            const taskDetailEntity = await this.repository.findTaskDetailByTaskId(options);

            const matchedFilePath = taskDetailEntity.map(o => o.matchedFilePath)

            showTaskDetailResDto.matchedFilePaths = matchedFilePath;


            await this.customCacheManager.cache(showTaskDetailReqDto.id + showTaskDetailReqDto.pageNumber, JSON.stringify(showTaskDetailResDto), 3000);
        }

        return showTaskDetailResDto;
    }
}

