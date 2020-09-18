import React, { Fragment, useEffect } from 'react';

import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ContactsContextProvider from './contexts/ContactsContext';
import Contacts from './contacts/Contacts';
import AuthContextProvider from './contexts/AuthContext';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertContextProvider from './contexts/AlertContext';
import Alert from './components/Alert';
import setAuthToken from './utility/authToken';
import PrivateRoute from './components/routing/PrivateRoute';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

function App() {
  return (
    <AuthContextProvider>
      <ContactsContextProvider>
        <AlertContextProvider>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route path="/register" exact>
                    <Register />
                  </Route>
                  <Route path="/login" exact>
                    <Login />
                  </Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertContextProvider>
      </ContactsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
