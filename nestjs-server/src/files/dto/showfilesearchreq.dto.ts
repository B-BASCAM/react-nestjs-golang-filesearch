import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { ObjectID } from 'typeorm';

export class showFileSearchReqDto {
    @ApiProperty()
    @Length(10, 30)
    id: string;
}
