import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task/entities/task.entity';
import { FilesModule } from './task/task.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskDetailEntity } from './task/entities/taskDetail.entity';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
});

const autoMapperModule = AutomapperModule.forRoot({
  strategyInitializer: classes(),
});

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mongodb',
    host: configService.get('TYPEORM_HOST', 'mongodb'),
    username: 'admin',
    password: 'admin',
    database: 'test',
    entities: [TaskEntity, TaskDetailEntity],
    synchronize: true,
    authSource: 'admin',
  }),
});

@Module({
  imports: [configModule, autoMapperModule, typeOrmModule, FilesModule],
})

export class AppModule { }
