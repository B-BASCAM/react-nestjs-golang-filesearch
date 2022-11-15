import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './ui/components/App';
import { persistor, store } from './store/store';
import reportWebVitals from './reportWebVitals';
import KeyCloakService from './service/security/KeycloakService';
import HttpService from './service/HttpService';




const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);

const renderApp = () =>
  root.render(

    <React.StrictMode>

      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>

    </React.StrictMode >
  );

KeyCloakService.CallLogin(renderApp);
HttpService.configure();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
