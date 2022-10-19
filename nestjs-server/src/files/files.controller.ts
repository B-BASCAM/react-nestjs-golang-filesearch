import { Body, Controller, Get, Param, Post, NotFoundException, InternalServerErrorException, Header, BadRequestException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { createFileSearchReqDto, showFileSearchReqDto, createFileSearchResDto, showFileSearchResDto } from './dto/index';
import { GetFileSearchByIdQuery } from './queries/get-filesearchbyid.query';
import { CreateFileSearchCommand } from './commands/create-filesearch.command';
import { ConfigService } from '@nestjs/config';
import { CustomCacheManager } from './cache/customcachemanager';



@Controller('files')
export class FilesController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService,
    private readonly customCacheManager: CustomCacheManager,
  ) { }


  @ApiCreatedResponse({ type: createFileSearchResDto })
  @Post()
  async createFileSearchRequest(@Body() params: createFileSearchReqDto): Promise<createFileSearchResDto> {

    let createResult: Promise<createFileSearchResDto>;

    try {

      createResult = this.commandBus.execute(new CreateFileSearchCommand(params))

    }
    catch (err) {

      throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);

    }

    return createResult;
  }


  @ApiCreatedResponse({ type: showFileSearchResDto })
  @Get('/:id/:pageNumber')
  @Header('content-type', 'application/json')
  async showFileSearchResult(@Param() params: showFileSearchReqDto): Promise<showFileSearchResDto> {

    let searchResult: Promise<showFileSearchResDto>

    this.controlObjectIdParam(params)

    try {

      const cachedValue = await this.customCacheManager.getFromCache(Promise<showFileSearchResDto>, params.id + params.pageNumber)

      if (cachedValue) {
        return cachedValue;
      }


      searchResult = this.queryBus.execute(new GetFileSearchByIdQuery(params));

      if (!(await searchResult)) {
        throw new NotFoundException(this.configService.get('ERROR_NOTFOUND', '404 Not Found'));
      }

      await this.customCacheManager.addToCache(params.id + params.pageNumber, JSON.stringify(await searchResult), 3000);

    } catch (err) {

      if (err.status) {
        throw err
      } else {
        throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
      }
    }

    return searchResult;
  }



  controlObjectIdParam(params: showFileSearchReqDto) {
    try {

      const { ObjectID } = require('mongodb').ObjectId;

      params.id = ObjectID(params.id)

    } catch {

      throw new BadRequestException(this.configService.get('ERROR_OBJECTID', ' Invalid Argument: id must be an ObjectID'))
    }
  }

}
