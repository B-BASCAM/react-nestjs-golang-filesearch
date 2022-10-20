import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ShowTaskDetailResDto {

    @ApiProperty()
    @AutoMap()
    requestedFileName: string;

    @ApiProperty()
    @AutoMap()
    status: string;

    @ApiProperty()
    @AutoMap()
    progressPercentage: number;

    @ApiProperty()
    @AutoMap()
    countOfMatchedFiles: number;

    @ApiProperty()
    @AutoMap()
    createAt: string;

    @ApiProperty()
    @AutoMap()
    updateAt: string;

    @ApiProperty()
    @AutoMap()
    result: string;

    @ApiProperty()
    @AutoMap(() => [String])
    matchedFilePaths: string[];
}
