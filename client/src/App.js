import React, { Fragment } from 'react';

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

function App() {
  return (
    <AuthContextProvider>
      <ContactsContextProvider>
        <Router>
          <Fragment>
            <Navbar />

            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
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
      </ContactsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
