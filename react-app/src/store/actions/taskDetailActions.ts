import { IShowTaskDetailRes } from "../../types/showTaskDetailRes";


export enum TaskDetailActionTypes {
  LOAD_TASKDETAIL = 'taskDetail/load',
  LOADING_TASKDETAIL = 'taskDetail/loading',
  LOADED_TASKDETAIL = 'taskDetail/loaded',
  LOAD_TASKDETAIL_FAILED = 'taskDetail/loading_failed'
}

export function loadTaskDetail(taskId: string, pageNum: string): ILoadTaskDetailAction {
  return {
    type: TaskDetailActionTypes.LOAD_TASKDETAIL,
    payload: {
      taskId,
      pageNum
    }
  }
}
export function loadingTaskDetail(): ILoadingTaskDetailAction {
  return {
    type: TaskDetailActionTypes.LOADING_TASKDETAIL
  }
}

export function loadedTaskDetail(showTaskDetailRes: IShowTaskDetailRes): ILoadededTaskDetailAction {
  return {
    type: TaskDetailActionTypes.LOADED_TASKDETAIL,
    payload: {
      showTaskDetailRes
    }
  }
}

export function loadingTaskDetailFailed(): ILoadingTaskDetailFailedAction {
  return {
    type: TaskDetailActionTypes.LOAD_TASKDETAIL_FAILED
  }
}


export interface ILoadTaskDetailAction {
  type: TaskDetailActionTypes.LOAD_TASKDETAIL;
  payload: {
    taskId: string;
    pageNum: string;
  }
}

export interface ILoadingTaskDetailAction {
  type: TaskDetailActionTypes.LOADING_TASKDETAIL;
}

export interface ILoadededTaskDetailAction {
  type: TaskDetailActionTypes.LOADED_TASKDETAIL;
  payload: {
    showTaskDetailRes: IShowTaskDetailRes;
  }
}

export interface ILoadingTaskDetailFailedAction {
  type: TaskDetailActionTypes.LOAD_TASKDETAIL_FAILED;
}





export type TaskDetailAction = ILoadTaskDetailAction | ILoadededTaskDetailAction | ILoadingTaskDetailAction | ILoadingTaskDetailFailedAction