import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../contexts/AlertContext';
import { AuthContext } from '../../contexts/AuthContext';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { setAlert } = useContext(AlertContext);
  const { register, error, clearError } = useContext(AuthContext);
  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearError();
    }
  }, [error]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((name === '' || email === '', password === '')) {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password does not match', 'danger');
      setUser({ name, email, password, password2: '' });
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} name="name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            value={password2}
            name="password2"
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
}

export default Register;
