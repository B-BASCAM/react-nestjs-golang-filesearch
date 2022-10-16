import { createFileSearchReqDto } from "../dto/createfilesearchreq.dto";

export class CreateFileSearchCommand {

    constructor(public readonly createfileSearchReqDto: createFileSearchReqDto) { }
}