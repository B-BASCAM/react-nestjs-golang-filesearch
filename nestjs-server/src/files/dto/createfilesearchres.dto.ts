import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { SearchStatusEnum } from '../enums/searchstatus.enum';

export class createFileSearchResDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    @AutoMap()
    requestedFileName: string;

    @ApiProperty()
    @AutoMap()
    searchStatus: string;
}
