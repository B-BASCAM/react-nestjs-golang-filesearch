import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateTaskReqDto {

    @Length(1, 100)
    @ApiProperty()
    @AutoMap()
    requestedFileName: string;
}
