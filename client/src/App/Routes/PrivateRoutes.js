import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from '../../Context/isAuthContext';
import Loading from '../../components/common/Loading';

const PrivateRoutes = ({ children, ...otherProps }) => {
  const [isAuth] = useAuth();

  if (isAuth) {
    return <Route {...otherProps}>{children}</Route>;
  }
  if (isAuth === false) {
    return <Redirect to="/login" />;
  }
  return <Loading size="large" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
