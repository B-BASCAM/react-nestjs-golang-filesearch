import { Body, Controller, Get, Param, Post, NotFoundException, InternalServerErrorException, Header, BadRequestException, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateTaskReqDto, ShowTaskDetailReqDto, CreateTaskResDto, ShowTaskDetailResDto, UpdateTaskReqDto, CreateTaskDetailReqDto } from './dto/index';
import { GetTaskDetailByIdQuery } from './queries/getTaskDetailsById.query';
import { CreateTaskCommand } from './commands/createTask.command';
import { ConfigService } from '@nestjs/config';
import { UpdateTaskCommand } from './commands/updateTask.command';
import { CreateTaskDetailCommand } from './commands/CreateTaskDetail.command';

@Controller('tasks')
export class FilesController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService,
  ) { }

  @ApiCreatedResponse({ type: CreateTaskResDto })
  @Post('createTask')
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

  @Get('showTaskDetail/:id/:pageNumber')
  async showTaskDetail(@Param() params: ShowTaskDetailReqDto): Promise<ShowTaskDetailResDto> {

    let showTaskDetailResDto: Promise<ShowTaskDetailResDto>

    try {
      showTaskDetailResDto = this.queryBus.execute(new GetTaskDetailByIdQuery(params));
    } catch (err) {
      throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
    }

    if (!(await showTaskDetailResDto)) {
      throw new NotFoundException(this.configService.get('ERROR_NOTFOUND', '404 Not Found'));
    }

    return showTaskDetailResDto;
  }

  @Post('updateTask')
  async updateTask(@Body() params: UpdateTaskReqDto): Promise<any> {

    try {
      return this.commandBus.execute(new UpdateTaskCommand(params));
    } catch (err) {
      throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
    }
  }

  @ApiCreatedResponse()
  @Post('createTaskDetail')
  async createTaskDetail(@Body() params: CreateTaskDetailReqDto[]): Promise<any> {

    try {
      return this.commandBus.execute(new CreateTaskDetailCommand(params))
    }
    catch (err) {
      throw new InternalServerErrorException(this.configService.get('ERROR_INTERNALSERVER', 'An Unknown Error Occured') + ": " + err);
    }
  }
}
