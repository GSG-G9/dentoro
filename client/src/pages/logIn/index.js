import React from 'react';

import LoginForm from '../../components/logInForm';
import CustomTitle from '../../components/common/Title';
import './style.css';

const LoginPage = () => (
  <div className="login">
    <div className="header">
      <div className="loginBody">
        <CustomTitle text="log In" />
        <LoginForm />
      </div>
    </div>
  </div>
);

export default LoginPage;
