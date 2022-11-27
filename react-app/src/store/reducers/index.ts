import { combineReducers } from 'redux';
import todosReducer, { ITodoState, initialTodoState } from './todosReducer';
import taskReducer, { ITaskState, initialTaskState } from './taskReducer';

export interface IState {
  todos: ITodoState;
  task: ITaskState;
}

export const initialState: IState = {
  todos: initialTodoState,
  task: initialTaskState,
};

export const appReducer = combineReducers<IState>({
  todos: todosReducer,
  task:taskReducer,
});