import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { FileSearchEntity } from '../entities/filesearch.entity';


@Injectable()
export class FilesEntityRepository {

  constructor(
    @InjectRepository(FileSearchEntity)
    private readonly endpointRepository: MongoRepository<FileSearchEntity>,

  ) { }


  async findById(id: string): Promise<FileSearchEntity> {

    const { ObjectID } = require('mongodb').ObjectId;

    return this.endpointRepository.findOneBy(ObjectID(id));
  }



  async create(fileSearchEntity: FileSearchEntity): Promise<FileSearchEntity> {

    const result = await this.endpointRepository.insert(fileSearchEntity);

    return this.endpointRepository.findOneBy(result.identifiers[0].id);
  }

}