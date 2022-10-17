import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';


export class showFileSearchResDto {

    @ApiProperty()
    @AutoMap()
    requestedFileName: string;

    @ApiProperty()
    @AutoMap()
    searchStatus: string;

    @ApiProperty()
    @AutoMap()
    progressPercentage: number;

    @ApiProperty()
    @AutoMap()
    countOfMatchedFiles: number;

    @ApiProperty()
    @AutoMap()
    createDate: string;

    @ApiProperty()
    @AutoMap()
    lastUpdateDate: string;

    @ApiProperty()
    @AutoMap(() => [String])
    matchedFilePaths: string[];
}
