import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  console.log('isAuthenticated', isAuthenticated);
  console.log('loading', loading);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}

export default PrivateRoute;
