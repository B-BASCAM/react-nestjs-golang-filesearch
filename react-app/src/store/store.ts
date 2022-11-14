import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { appReducer } from './reducers';
import epicMiddleware, { rootEpic } from './epics';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const composeEnhancer = composeWithDevTools({
  name: 'React Clean Architecture'
});


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);
export const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(epicMiddleware))

);
export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);