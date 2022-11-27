import { ICreateTaskRes } from "../../types/createTaskRes";
import { ITodoItem } from "../../types/todoItem";

export enum TaskActionTypes {
  ADD_TASK = 'todos/add',
  ADDING_TASK = 'todos/adding',
  ADDED_TASK = 'todos/added',
  ADDING_TASK_FAILED = 'todos/adding_failed'
}

export function addTask(requestedFileName: string): IAddTaskAction {
  return {
    type: TaskActionTypes.ADD_TASK,
    payload: {
      requestedFileName
    }
  }
}
export function addingTask(): IAddingTaskAction {
  return {
    type: TaskActionTypes.ADDING_TASK
  }
}

export function addedTask(createTaskRes: ICreateTaskRes): IAddedTaskAction {
  return {
    type: TaskActionTypes.ADDED_TASK,
    payload: {
      createTaskRes
    }
  }
}

export function addingTaskFailed(): IAddingTaskFailedAction {
  return {
    type: TaskActionTypes.ADDING_TASK_FAILED
  }
}


export interface IAddTaskAction {
  type: TaskActionTypes.ADD_TASK;
  payload: {
    requestedFileName: string;
  }
}

export interface IAddingTaskAction {
  type: TaskActionTypes.ADDING_TASK;
}

export interface IAddedTaskAction {
  type: TaskActionTypes.ADDED_TASK;
  payload: {
    createTaskRes: ICreateTaskRes;
  }
}

export interface IAddingTaskFailedAction {
  type: TaskActionTypes.ADDING_TASK_FAILED;
}





export type TaskAction = IAddingTaskAction | IAddedTaskAction | IAddingTaskFailedAction | IAddTaskAction