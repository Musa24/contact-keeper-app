import React, { Component, createContext } from 'react';
import axios from 'axios';
import setAuthToken from '../utility/authToken';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  register = async (formInputData) => {
    //Header configuration
    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formInputData, config);

      localStorage.setItem('token', res.data.token);
      this.setState({
        isAuthenticated: true,
        loading: false,
        token: res.data.token,
      });

      //Loading User
      this.loadUser();
    } catch (error) {
      localStorage.removeItem('token');
      this.setState({
        isAuthenticated: null,
        loading: false,
        user: null,
        error: error.response.data.msg,
      });
    }
  };
  //Login User
  login = async (formInputData) => {
    //Header configuration
    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    };
    //loging
    try {
      const res = await axios.post('/api/auth', formInputData, config);

      localStorage.setItem('token', res.data.token);
      this.setState({
        isAuthenticated: true,
        loading: false,
        token: res.data.token,
      });
      //Loading User
      this.loadUser();
    } catch (error) {
      localStorage.removeItem('token');
      this.setState({
        isAuthenticated: null,
        loading: false,
        user: null,
        error: error.response.data.msg,
      });
    }
  };
  //Clear Register Error
  clearError = () => {
    this.setState({ error: null });
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      isAuthenticated: null,
      loading: false,
      user: null,
      error: null,
      token: null,
    });
  };

  //loading User
  loadUser = async () => {
    console.log('Loading User ');
    //Setting token to the headers {"a-auth-token":token }
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      this.setState({ user: res.data, isAuthenticated: true });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          register: this.register,
          login: this.login,
          logout: this.logout,
          clearError: this.clearError,
          loadUser: this.loadUser,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
