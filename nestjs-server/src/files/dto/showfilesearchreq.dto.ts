import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsObject, Length } from 'class-validator';
import { ObjectID } from 'typeorm';


export class showFileSearchReqDto {

    @ApiProperty()
    @Length(24)
    id: ObjectID;

    @ApiProperty()
    @IsNumberString()
    @Length(1, 10)
    pageNumber: string;

}
