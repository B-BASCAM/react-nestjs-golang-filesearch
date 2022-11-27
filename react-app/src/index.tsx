import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import App from './components/App/App';
import { persistor, store } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <HashRouter>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root') as HTMLElement
);



