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
    @AutoMap(() => [String])
    matchedFilePaths: string[];

    @ApiProperty()
    @AutoMap()
    createDate: Date;

    @ApiProperty()
    @AutoMap()
    lastUpdateDate: Date;
}
