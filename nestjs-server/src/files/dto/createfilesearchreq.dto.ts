import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class createFileSearchReqDto {

    @Length(1, 50)
    @ApiProperty()
    @AutoMap()
    requestedFileName: string;
}
