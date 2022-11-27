import { combineEpics, createEpicMiddleware } from 'redux-observable';
import todoEpics from './todoEpics';
import taskEpics  from './taskEpics';
import { IState } from '../reducers';
import { Action } from 'redux';

export const rootEpic = combineEpics(todoEpics);
export const rootEpic2 = combineEpics(taskEpics);

export default createEpicMiddleware<Action, Action, IState>();