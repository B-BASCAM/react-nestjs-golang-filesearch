import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsObject, Length } from 'class-validator';
import { ObjectID } from 'typeorm';

export class ShowTaskDetailReqDto {

    @ApiProperty()
    @Length(24)
    id: string;

    @ApiProperty()
    @IsNumberString()
    @Length(1, 10)
    pageNumber: string;

}
