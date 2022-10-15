import { Body, Controller, Get, Param, Post, NotFoundException, InternalServerErrorException, Header } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { createFileSearchReqDto, showFileSearchReqDto, createFileSearchResDto, showFileSearchResDto } from './dto/index';
import { GetFileSearchByIdQuery } from './queries/get-filesearchbyid.query';
import { CreateFileSearchCommand } from './commands/create-filesearch.command';
import { ConfigService } from '@nestjs/config';
import { CustomCacheManager } from './cache/customcachemanager';
import { RedisManager } from './queue/redismanager';


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

      throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', '') + ": " + err);

    }

    return createResult;

  }

  @Header('content-type', 'application/json')
  @ApiCreatedResponse({ type: showFileSearchResDto })
  @Get(':id')
  async showFileSearchResult(@Param() params: showFileSearchReqDto): Promise<showFileSearchResDto> {

    let searchResult: Promise<showFileSearchResDto>

    try {

      //Get From Cache -> value changes according to parameter
      const cachedValue = await this.customCacheManager.getFromCache(Promise<showFileSearchResDto>, params.id)
      if (cachedValue) {
        return cachedValue;
      }


      searchResult = this.queryBus.execute(new GetFileSearchByIdQuery(params.id))

      if (!searchResult) {
        throw new NotFoundException(this.configService.get('ERROR_NOTFOUND', ''));
      }


      //Set Cache
      await this.customCacheManager.addToCache(params.id, JSON.stringify(await searchResult), 3000);

    } catch (err) {

      throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', '') + ": " + err);

    }

    return searchResult;
  }

}
