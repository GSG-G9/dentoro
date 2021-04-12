import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from '../../Context/isAuthContext';

const PrivateRoutes = ({ children, ...otherProps }) => {
  const [isAuth] = useAuth();

  if (isAuth) {
    return <Route {...otherProps}>{children}</Route>;
  }
  return <Redirect to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
