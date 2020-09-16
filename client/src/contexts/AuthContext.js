import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
  };

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
