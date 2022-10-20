import { ShowTaskDetailReqDto } from "../dto";

export class GetTaskDetailByIdQuery {

    constructor(
        public readonly showTaskDetailReqDto: ShowTaskDetailReqDto,
    ) { }
}