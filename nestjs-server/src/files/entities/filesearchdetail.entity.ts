import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';


@Entity('filesearchtaskdetails')
export class FileSearchDetailEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @ObjectIdColumn()
    searchid: ObjectID;

    @AutoMap()
    @Column()
    matchedFilePath: string;
}

