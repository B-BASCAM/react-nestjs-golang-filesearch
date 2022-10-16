import { showFileSearchReqDto } from "../dto";

export class GetFileSearchByIdQuery {

    constructor(
        public readonly showfileSearchReqDto: showFileSearchReqDto,
    ) { }

}