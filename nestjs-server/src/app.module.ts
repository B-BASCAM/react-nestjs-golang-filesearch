import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileSearchEntity } from './files/entities/filesearch.entity';
import { FilesModule } from './files/files.module';

import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';


var configModule = ConfigModule.forRoot({
  isGlobal: true,
});
var autoMapperModule = AutomapperModule.forRoot({
  strategyInitializer: classes(),
});

var typeOrmModule = TypeOrmModule.forRootAsync({
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
    entities: [FileSearchEntity],
    synchronize: true,
    authSource: 'admin',
  }),


});
@Module({
  imports: [configModule, autoMapperModule, typeOrmModule, FilesModule],

})
export class AppModule { }
