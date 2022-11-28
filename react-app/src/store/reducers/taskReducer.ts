import produce from 'immer';
import { ApiStatus } from '../../types/apiStatus';
import { ICreateTaskRes } from '../../types/createTaskRes';
import { TaskAction, TaskActionTypes } from '../actions/taskActions';

export const initialTaskState: ITaskState = {
  loadingStatus: ApiStatus.LOADING,
  addingStatus: ApiStatus.LOADED,
}

export default function todosReducer(state: ITaskState = initialTaskState, action: TaskAction) {
  return produce(state, draft => {
    switch (action.type) {
      case TaskActionTypes.ADD_TASK:
        //console.log("TaskActionTypes.ADD_TASK");
        break;
      case TaskActionTypes.ADDING_TASK:
        draft.loadingStatus = ApiStatus.LOADING;
        break;

      case TaskActionTypes.ADDING_TASK_FAILED:
        draft.loadingStatus = ApiStatus.FAILED;
        break;

      case TaskActionTypes.ADDED_TASK:
        console.log("TaskActionTypes.ADDED_TASK")
        console.log(action.payload)
        draft.loadingStatus = ApiStatus.LOADED;
        draft.task = action.payload.createTaskRes;
        let myArr: ICreateTaskRes[] = [];
        myArr.push(draft.task);
        draft.tasks = myArr;
        break;
    }
  });
}

export interface ITaskState {
  loadingStatus: ApiStatus;
  addingStatus: ApiStatus;
  task?: ICreateTaskRes;
  tasks?: ICreateTaskRes[];
}