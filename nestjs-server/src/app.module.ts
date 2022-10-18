import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileSearchEntity } from './files/entities/filesearch.entity';
import { FilesModule } from './files/files.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileSearchDetailEntity } from './files/entities/filesearchdetail.entity';


let configModule = ConfigModule.forRoot({
  // envFilePath: '.env',
  isGlobal: true,
});

let autoMapperModule = AutomapperModule.forRoot({
  strategyInitializer: classes(),
});


let typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    url: configService.get('TYPEORM_URL', ''),
    type: 'mongodb',
    host: configService.get('TYPEORM_HOST', ''),
    port: configService.get('TYPEORM_PORT',),
    username: 'admin',
    password: 'admin',
    database: 'test',
    entities: [FileSearchEntity, FileSearchDetailEntity],
    synchronize: true,
    authSource: 'admin',
  }),
});


@Module({
  imports: [configModule, autoMapperModule, typeOrmModule, FilesModule],

})

export class AppModule { }
