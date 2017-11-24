import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container center-align">
    <h1>Sorry, we are lost...</h1>
    <p className="flow-text">
      We could not find the page you requested.
    </p>
    <p className="flow-text">
      <Link to="/">Back to home</Link>
    </p>
  </div>
);

export default NotFound;
