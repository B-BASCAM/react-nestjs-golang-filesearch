import { Body, Controller, Get, Param, Post, NotFoundException, InternalServerErrorException, Header, BadRequestException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateTaskReqDto, ShowTaskDetailReqDto, CreateTaskResDto, ShowTaskDetailResDto } from './dto/index';
import { GetTaskDetailByIdQuery } from './queries/getTaskDetailsById.query';
import { CreateTaskCommand } from './commands/createTask.command';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
export class FilesController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService,
  ) { }

  @ApiCreatedResponse({ type: CreateTaskResDto })
  @Post()
  async createTask(@Body() params: CreateTaskReqDto): Promise<CreateTaskResDto> {

    let createTaskResDto: Promise<CreateTaskResDto>;

    try {
      createTaskResDto = this.commandBus.execute(new CreateTaskCommand(params))
    }
    catch (err) {
      throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
    }

    return createTaskResDto;
  }

  @ApiCreatedResponse({ type: ShowTaskDetailResDto })
  @Get('/:id/:pageNumber')
  async showTaskDetail(@Param() params: ShowTaskDetailReqDto): Promise<ShowTaskDetailResDto> {

    let showTaskDetailResDto: Promise<ShowTaskDetailResDto>

    try {
      showTaskDetailResDto = this.queryBus.execute(new GetTaskDetailByIdQuery(params));

      if (!(await showTaskDetailResDto)) {
        throw new NotFoundException(this.configService.get('ERROR_NOTFOUND', '404 Not Found'));
      }
    } catch (err) {
      throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured'));
    }

    return showTaskDetailResDto;
  }


  controlObjectIdParam(params: ShowTaskDetailReqDto) {

    const { ObjectID } = require('mongodb').ObjectId;

    params.id = ObjectID(params.id)
  }

}
