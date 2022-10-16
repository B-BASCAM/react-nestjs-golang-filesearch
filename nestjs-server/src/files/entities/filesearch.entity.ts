import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { SearchStatusEnum } from '../enums/searchstatus.enum';


@Entity('filesearchresults')
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

    @AutoMap(() => [String])
    @Column()
    matchedFilePaths: string[] = [];

    @AutoMap()
    @Column()
    createDate: Date;

    @AutoMap()
    @Column()
    lastUpdateDate: Date;
}