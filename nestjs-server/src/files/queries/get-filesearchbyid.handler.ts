import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FilesEntityRepository } from '../repository/files-entity.repository';
import { GetFileSearchByIdQuery } from './get-filesearchbyid.query';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { beforeMap, afterMap, createMap, Mapper } from '@automapper/core';
import { showFileSearchResDto } from '../dto/showfilesearchres.dto';
import { FileSearchEntity } from '../entities/filesearch.entity';
import { SearchStatusEnum } from '../enums/searchstatus.enum';


@QueryHandler(GetFileSearchByIdQuery)
export class GetFileSearchByIdHandler
    extends AutomapperProfile
    implements IQueryHandler<GetFileSearchByIdQuery>
{

    constructor(private readonly repository: FilesEntityRepository,
        @InjectMapper() mapper: Mapper,
    ) {
        super(mapper);
    }
    override get profile() {
        return (mapper) => {
            createMap(mapper, FileSearchEntity, showFileSearchResDto,

                afterMap((source, destination) => {
                    destination.searchStatus = (SearchStatusEnum[source.searchStatus])
                    // , destination.matchedFilePaths = source.matchedFilePaths

                }));
            // createMap(mapper, Task);
            //createMap(mapper, TaskDto,beforeMap((source, destination) => {source._id=destination._id}));
        };
    }
    async execute(query: GetFileSearchByIdQuery) {
        const { id } = query;
        const fileSearchEntity = await this.repository.findById(id);
        return this.mapper.map(fileSearchEntity, FileSearchEntity, showFileSearchResDto);
    }
}

