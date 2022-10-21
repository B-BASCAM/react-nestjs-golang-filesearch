import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Length, Max, Min } from 'class-validator';

export class UpdateTaskReqDto {

    // @Length(24)
    id: string;

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


    @ApiProperty()
    @AutoMap()
    updateAt: string;


    @ApiProperty()
    @AutoMap()
    result: string;
}