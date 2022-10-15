import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException, ParseUUIDPipe, UsePipes, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { createFileSearchReqDto, showFileSearchReqDto, createFileSearchResDto, showFileSearchResDto } from './dto/index';
import { GetFileSearchByIdQuery } from './queries/get-filesearchbyid.query';
import { CreateFileSearchCommand } from './commands/create-filesearch.command';
@Controller('files')
export class FilesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @ApiCreatedResponse({ type: createFileSearchResDto })
  @Post()
  createFileSearchRequest(@Body() params: createFileSearchReqDto): Promise<createFileSearchResDto> {
    let createResult: Promise<createFileSearchResDto>;
    try {
      createResult = this.commandBus.execute(new CreateFileSearchCommand(params))
    }
    catch (err) {
      throw new InternalServerErrorException('An Error Occured: ' + err);
    }
    return createResult;
  }

  @ApiNotFoundResponse({ description: '404. NotFoundException. File Search Request Not Found', })
  @ApiCreatedResponse({ type: showFileSearchResDto })
  @Get(':id')
  async showFileSearchResult(@Param() params: showFileSearchReqDto): Promise<showFileSearchResDto> {
    let searchResult: Promise<showFileSearchResDto>
    try {
      searchResult = this.queryBus.execute(new GetFileSearchByIdQuery(params.id))

    } catch (err) {
      throw new InternalServerErrorException('An Error Occured: ' + err);
    }
    if (!searchResult) {
      throw new NotFoundException('Search Request Not Found');
    }
    return searchResult;
  }

}
