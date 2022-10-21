import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('taskDetails')
export class TaskDetailEntity {

    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn()
    taskId: ObjectID;

    @AutoMap()
    @Column()
    matchedFilePath: string;
}

