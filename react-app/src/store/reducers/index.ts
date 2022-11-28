import { combineReducers } from 'redux';
import todosReducer, { ITodoState, initialTodoState } from './todosReducer';
import taskReducer, { ITaskState, initialTaskState } from './taskReducer';
import taskDetailReducer, { ITaskDetailState, initialTaskDetailState } from './taskDetailReducer';

export interface IState {
  todos: ITodoState;
  task: ITaskState;
  taskDetail: ITaskDetailState;
}

export const initialState: IState = {
  todos: initialTodoState,
  task: initialTaskState,
  taskDetail: initialTaskDetailState,
};

export const appReducer = combineReducers<IState>({
  todos: todosReducer,
  task: taskReducer,
  taskDetail: taskDetailReducer,
});