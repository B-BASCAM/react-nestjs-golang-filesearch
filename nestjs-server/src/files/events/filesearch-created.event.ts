export class FileSearchCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly requestedFileName: string,
  ) { }
}


