import produce from 'immer';
import { ApiStatus } from '../../types/apiStatus';
import { IShowTaskDetailRes } from '../../types/showTaskDetailRes';
import { TaskDetailActionTypes } from '../actions/taskDetailActions';
import { TaskDetailAction } from '../actions/taskDetailActions';

export const initialTaskDetailState: ITaskDetailState = {
  loadingStatus: ApiStatus.LOADING,
  addingStatus: ApiStatus.LOADED,
}

export default function todosReducer(state: ITaskDetailState = initialTaskDetailState, action: TaskDetailAction) {
  return produce(state, draft => {
    switch (action.type) {
      case TaskDetailActionTypes.LOAD_TASKDETAIL:
        //console.log("TaskDetailActionTypes.ADD_TASK");
        break;
      case TaskDetailActionTypes.LOADING_TASKDETAIL:
        draft.loadingStatus = ApiStatus.LOADING;
        break;

      case TaskDetailActionTypes.LOAD_TASKDETAIL_FAILED:
        draft.loadingStatus = ApiStatus.FAILED;
        break;

      case TaskDetailActionTypes.LOADED_TASKDETAIL:
        console.log("TaskDetailActionTypes.ADDED_TASK")
        // console.log(action.payload)
        draft.loadingStatus = ApiStatus.LOADED;
        draft.taskDetail = action.payload.showTaskDetailRes;
        let myArr: IShowTaskDetailRes[] = [];
        myArr.push(draft.taskDetail);
        draft.taskDetails = myArr;
        break;
    }
  });
}

export interface ITaskDetailState {
  loadingStatus: ApiStatus;
  addingStatus: ApiStatus;
  taskDetail?: IShowTaskDetailRes;
  taskDetails?: IShowTaskDetailRes[];
}