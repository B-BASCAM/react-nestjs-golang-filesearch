import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';


export class showFileSearchReqDto {

    @ApiProperty()
    @Length(10, 30)
    id: string;
}
