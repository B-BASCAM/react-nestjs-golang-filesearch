import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Length, Max, Min } from 'class-validator';
import { ObjectID } from 'typeorm';

export class UpdateTaskReqDto {

    @Length(24)
    id: ObjectID;

    @Length(5, 15)
    @ApiProperty()
    @AutoMap()
    status: string;

    @Min(0)
    @Max(100)
    @ApiProperty()
    @AutoMap()
    progressPercentage: number;

    @Min(0)
    @ApiProperty()
    @AutoMap()
    countOfMatchedFiles: number;

    @Length(19)
    @ApiProperty()
    @AutoMap()
    updateAt: string;

    @Length(0, 10)
    @ApiProperty()
    @AutoMap()
    result: string;
}