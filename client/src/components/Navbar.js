import React, { Fragment, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import getFirstName from '../utility/helper';

function Navbar() {
  const history = useHistory();
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  });

  //Logout user
  const handleLogout = (e) => {
    e.preventDefault();
    console.log(e);
    logout();
  };

  const loggedUserLink = (
    <Fragment>
      <li>Hello {getFirstName(user?.name)} </li>
      <li>
        <a href="/" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt "></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestUserLink = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className="fas fa-id-card-alt"></i>
        <Link to="/">Contact Keeper</Link>
      </h1>
      <ul>
        {isAuthenticated ? loggedUserLink : guestUserLink}
        {/* <li>
          <Link to="/about">About</Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Navbar;
