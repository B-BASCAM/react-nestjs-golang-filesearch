import { } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateFileSearchCommand } from './create-filesearch.command';
import { FilesEntityRepository } from '../repository/files-entity.repository';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { afterMap, beforeMap, createMap, Mapper } from '@automapper/core';
import { FileSearchEntity } from '../entities/filesearch.entity';
import { ObjectID } from 'typeorm';
import { createFileSearchReqDto, createFileSearchResDto } from '../dto/index';
import { SearchStatusEnum } from '../enums/searchstatus.enum';

@CommandHandler(CreateFileSearchCommand)
export class CreateEndpointHandler
    extends AutomapperProfile
    implements ICommandHandler<CreateFileSearchCommand>
{

    constructor(
        private readonly repository: FilesEntityRepository,
        @InjectMapper() mapper: Mapper,
    ) {
        super(mapper);
    }
    override get profile() {

        return (mapper) => {
            createMap(mapper, FileSearchEntity, createFileSearchResDto,
                afterMap((source, destination) => {
                    destination.id = source.id.toString(),
                        destination.searchStatus = (SearchStatusEnum[source.searchStatus])
                }));

            createMap(mapper, createFileSearchReqDto, FileSearchEntity,
                beforeMap((source, destination) => {
                    destination.createDate = new Date(),
                        destination.lastUpdateDate = new Date(),
                        // destination.matchedFilePaths = [' a'], //[]
                        destination.progressPercentage = 0,
                        destination.searchStatus = SearchStatusEnum.New

                }));

            //createMap(mapper, TaskDto,beforeMap((source, destination) => {source._id=destination._id}));
        };
    }
    async execute(createFileSearchCommand: CreateFileSearchCommand): Promise<any> {

        const { createfileSearchReqDto } = createFileSearchCommand;

        const fileSearchEntity = this.mapper.map(createfileSearchReqDto, createFileSearchReqDto, FileSearchEntity)

        const createdfileSearchEntity = await this.repository.create(fileSearchEntity);
        return this.mapper.map(createdfileSearchEntity, FileSearchEntity, createFileSearchResDto)
    }
}
