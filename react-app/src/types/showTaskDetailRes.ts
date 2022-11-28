export interface IShowTaskDetailRes {
  requestedFileName: string;
  status: string;
  progressPercentage: number;
  countOfMatchedFiles: number;
  createAt: string;
  updateAt: string;
  result: string;
  matchedFilePaths: string[];
}

