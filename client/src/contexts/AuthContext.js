import React, { Component, createContext } from 'react';
import axios from 'axios';
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
      console.log('Res', res);
      localStorage.setItem('token', res.data.token);
      this.setState({
        isAuthenticated: true,
        loading: false,
        token: res.data.token,
      });
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

  //loading User
  loadUser = async () => {
    //Header Configuration
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          register: this.register,
          clearError: this.clearError,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
