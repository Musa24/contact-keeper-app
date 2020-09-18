import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertContext } from '../../contexts/AlertContext';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  const history = useHistory();
  const { setAlert } = useContext(AlertContext);
  const { login, isAuthenticated, error, clearError } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearError();
    }
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
}

export default Login;
