import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID, ObjectLiteral } from 'typeorm';
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

  async createTask(TaskEntity: TaskEntity): Promise<TaskEntity> {

    const result = await this.taskRepository.insert(TaskEntity);

    return await this.taskRepository.findOneBy(result.identifiers[0].id);
  }

  async findTaskById(id: ObjectID): Promise<TaskEntity> {

    return await this.taskRepository.findOneBy(id);
  }

  async findTaskDetailByTaskId(options: MongoFindManyOptions): Promise<TaskDetailEntity[]> {

    return await this.taskDetailRepository.find(options);
  }

  async updateOneTask(query: ObjectLiteral, update: ObjectLiteral): Promise<any> {

    return await this.taskRepository.updateOne(query, update);
  }

  async createManyTaskDetail(taskDetailEntityList: TaskDetailEntity[]): Promise<any> {

    return await this.taskRepository.insert(taskDetailEntityList);
  }

}