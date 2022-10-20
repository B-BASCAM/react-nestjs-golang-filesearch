import { CreateTaskReqDto } from "../dto/createTaskReq.dto";

export class CreateTaskCommand {

    constructor(public readonly createTaskReqDto: CreateTaskReqDto) { }
}