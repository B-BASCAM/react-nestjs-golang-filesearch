import { ObjectID } from "typeorm";

export class GetFileSearchByIdQuery {
    constructor(
        public readonly id: string,
    ) { }
}