import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { resultEnum } from '../enums/result.enum';
import { statusEnum } from '../enums/status.enum';

@Entity('tasks')
export class TaskEntity {

    @ObjectIdColumn()
    _id: ObjectID;

    @AutoMap()
    @Column()
    requestedFileName: string;

    @AutoMap()
    @Column()
    status: string = '';

    @AutoMap()
    @Column()
    progressPercentage: number = 0;

    @AutoMap()
    @Column()
    countOfMatchedFiles: number = 0;

    @AutoMap()
    @Column()
    createAt: string;

    @AutoMap()
    @Column()
    updateAt: string;

    @AutoMap()
    @Column()
    result: string = '';
}