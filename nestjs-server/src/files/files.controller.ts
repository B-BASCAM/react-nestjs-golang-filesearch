import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException, ParseUUIDPipe, UsePipes } from '@nestjs/common';
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

  @Post()
  createFileSearchRequest(@Body() params: createFileSearchReqDto): Promise<createFileSearchResDto> {
    return this.commandBus.execute(new CreateFileSearchCommand(params));
  }

  @ApiNotFoundResponse({ description: '404. NotFoundException. User was not found', })
  @ApiCreatedResponse({ type: showFileSearchReqDto })
  @Get(':id')
  async showFileSearchResult(@Param() params: showFileSearchReqDto): Promise<showFileSearchResDto> {
    const searchResult = await this.queryBus.execute(new GetFileSearchByIdQuery(params.id))
    if (!searchResult) {
      throw new NotFoundException('The user does not exist');
    }
    return searchResult;
  }

}
