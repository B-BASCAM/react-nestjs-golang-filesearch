import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateTaskDetailReqDto {

    @ApiProperty()
    @Length(24)
    taskId: string;

    @Length(1, 10000)
    @ApiProperty()
    @AutoMap()
    matchedFilePath: string;
}
