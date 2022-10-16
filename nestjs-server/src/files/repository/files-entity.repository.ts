import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { FileSearchEntity } from '../entities/filesearch.entity';
import { FileSearchDetailEntity } from '../entities/filesearchdetail.entity';


@Injectable()
export class FilesEntityRepository {

  constructor(
    @InjectRepository(FileSearchEntity)
    private readonly fileSearchRepository: MongoRepository<FileSearchEntity>,

    @InjectRepository(FileSearchDetailEntity)
    private readonly fileSearchDetailRepository: MongoRepository<FileSearchDetailEntity>,
  ) { }


  async create(fileSearchEntity: FileSearchEntity): Promise<FileSearchEntity> {

    const result = await this.fileSearchRepository.insert(fileSearchEntity);

    return this.fileSearchRepository.findOneBy(result.identifiers[0].id);
  }


  async findById(id: ObjectID): Promise<FileSearchEntity> {

    return this.fileSearchRepository.findOneBy(id);
  }


  async findBySearchId(options: MongoFindManyOptions): Promise<FileSearchDetailEntity[]> {

    return this.fileSearchDetailRepository.find(options);

  }

}