import { combineEpics, createEpicMiddleware } from 'redux-observable';
import taskEpics from './taskEpics';
import taskDetailEpics from './taskDetailEpics';
import { IState } from '../reducers';
import { Action } from 'redux';


export const rootEpic2 = combineEpics(taskEpics);
export const rootEpic3 = combineEpics(taskDetailEpics);

export default createEpicMiddleware<Action, Action, IState>();