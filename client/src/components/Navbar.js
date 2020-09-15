import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className="fas fa-id-card-alt"></i>
        <Link to="/">Contact Keeper</Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
