import { CreateTaskDetailReqDto } from "../dto/createTaskDetailReq.dto";

export class CreateTaskDetailCommand {

    constructor(public readonly createTaskDetailReqDtoList: CreateTaskDetailReqDto[]) { }
}