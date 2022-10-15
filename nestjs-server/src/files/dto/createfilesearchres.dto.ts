import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class createFileSearchResDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    @AutoMap()
    requestedFileName: string;

    @ApiProperty()
    @AutoMap()
    searchStatus: string;
}
