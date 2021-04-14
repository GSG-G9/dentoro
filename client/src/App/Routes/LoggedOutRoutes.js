import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from '../../Context/isAuthContext';

const LoggedOutRoutes = ({ children, ...otherProps }) => {
  const [isAuth] = useAuth();

  if (!isAuth) {
    return <Route {...otherProps}>{children}</Route>;
  }
  return <Redirect to="/" />;
};

LoggedOutRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoggedOutRoutes;
