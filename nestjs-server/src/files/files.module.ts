import { CacheModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSearchEntity } from './entities/filesearch.entity';
import { FilesEntityRepository } from './repository/files-entity.repository';
import { QueryHandlers } from './queries/index';
import { CommandHandlers } from './commands/index';
import { EventHandlers } from './events/index';
import { AutomapperModule } from '@automapper/nestjs';
import { FilesController } from './files.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomCacheManager } from './cache/customcachemanager';
import { RedisManager } from './queue/redismanager';
import { FileSearchDetailEntity } from './entities/filesearchdetail.entity';


let redisManager = {
  useFactory: (configService: ConfigService) => {
    return new RedisManager(configService.get('REDIS_BROKER', 'redis://myredis:6379/0'),
      configService.get('REDIS_BACKEND', 'redis://myredis:6379/0'));
  },
  provide: RedisManager,
  inject: [ConfigService]
}


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FileSearchEntity, FileSearchDetailEntity]),
    AutomapperModule,
    ConfigModule,
    CacheModule.register({ max: 10, isGlobal: true })
  ],
  controllers: [FilesController],
  providers: [
    FilesEntityRepository,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    CustomCacheManager,
    redisManager,
  ],

})

export class FilesModule { }
