import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';
import ContactsContextProvider from './contexts/ContactsContext';
import AlertContextProvider from './contexts/AlertContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContactsContextProvider>
        <AlertContextProvider>
          <App />
        </AlertContextProvider>
      </ContactsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
