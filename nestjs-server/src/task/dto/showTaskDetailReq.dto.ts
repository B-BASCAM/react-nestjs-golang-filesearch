import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class ShowTaskDetailReqDto {

    @ApiProperty()
    @Length(24)
    id: string;

    @ApiProperty()
    @IsNumberString()
    @Length(1, 10)
    pageNumber: string;

}
