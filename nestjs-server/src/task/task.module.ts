import { CacheModule, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TasksEntityRepository } from './repository/tasksEntity.repository';
import { QueryHandlers } from './queries/index';
import { CommandHandlers } from './commands/index';
import { EventHandlers } from './events/index';
import { AutomapperModule } from '@automapper/nestjs';
import { FilesController } from './task.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { customCacheManager } from './cache/customCacheManager';
import { RedisManager } from './queue/redisManager';
import { TaskDetailEntity } from './entities/taskDetail.entity';

const redisManager = {
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
    TypeOrmModule.forFeature([TaskEntity, TaskDetailEntity]),
    AutomapperModule,
    ConfigModule,
    CacheModule.register({ max: 10, isGlobal: true })
  ],
  controllers: [FilesController],
  providers: [
    TasksEntityRepository,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    customCacheManager,
    redisManager,
  ],
})

export class FilesModule { }
