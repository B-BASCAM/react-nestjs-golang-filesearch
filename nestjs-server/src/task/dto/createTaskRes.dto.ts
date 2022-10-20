import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskResDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    @AutoMap()
    requestedFileName: string;

    @ApiProperty()
    @AutoMap()
    status: string;
}
