import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { SearchStatusEnum } from '../enums/searchstatus.enum';


@Entity('filesearchtasks')
export class FileSearchEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @AutoMap()
    @Column()
    requestedFileName: string;

    @AutoMap(() => Number)
    @Column()
    searchStatus: SearchStatusEnum;

    @AutoMap()
    @Column()
    progressPercentage: number;

    @AutoMap()
    @Column()
    createDate: Date;

    @AutoMap()
    @Column()
    lastUpdateDate: Date;
}