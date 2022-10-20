import { UpdateTaskReqDto } from "../dto/updateTaskReq.dto";

export class UpdateTaskCommand {

    constructor(public readonly updateTaskReqDto: UpdateTaskReqDto) { }
}