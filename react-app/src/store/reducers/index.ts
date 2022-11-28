import { combineReducers } from 'redux';
import taskReducer, { ITaskState, initialTaskState } from './taskReducer';
import taskDetailReducer, { ITaskDetailState, initialTaskDetailState } from './taskDetailReducer';

export interface IState {
  task: ITaskState;
  taskDetail: ITaskDetailState;
}

export const initialState: IState = {
  task: initialTaskState,
  taskDetail: initialTaskDetailState,
};

export const appReducer = combineReducers<IState>({
  task: taskReducer,
  taskDetail: taskDetailReducer,
});