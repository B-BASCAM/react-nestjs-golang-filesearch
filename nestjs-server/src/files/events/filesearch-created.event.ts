import { createFileSearchResDto } from "../dto";

export class FileSearchCreatedEvent {
  constructor(
    public readonly createfileSearchResDto: createFileSearchResDto,
  ) { }
}


