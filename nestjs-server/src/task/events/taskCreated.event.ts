import { CreateTaskResDto } from "../dto";

export class TaskCreatedEvent {

  constructor(
    public readonly createTaskResDto: CreateTaskResDto,
  ) { }
}


