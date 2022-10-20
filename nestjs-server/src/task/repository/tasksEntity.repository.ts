import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { TaskEntity } from '../entities/task.entity';
import { TaskDetailEntity } from '../entities/taskDetail.entity';

@Injectable()
export class TasksEntityRepository {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: MongoRepository<TaskEntity>,
    @InjectRepository(TaskDetailEntity)
    private readonly taskDetailRepository: MongoRepository<TaskDetailEntity>,
  ) { }

  async create(TaskEntity: TaskEntity): Promise<TaskEntity> {

    const result = await this.taskRepository.insert(TaskEntity);

    return this.taskRepository.findOneBy(result.identifiers[0].id);
  }

  async findById(id: ObjectID): Promise<TaskEntity> {

    return this.taskRepository.findOneBy(id);
  }

  async findByTaskId(options: MongoFindManyOptions): Promise<TaskDetailEntity[]> {

    return this.taskDetailRepository.find(options);
  }
}