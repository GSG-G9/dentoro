import React from 'react';
import { Typography } from 'antd';
import LoginForm from '../../components/logInForm';
import './style.css';

const { Title } = Typography;

export default function LoginPage() {
  return (
    <div className="login">
      <div className="header" />
      <div className="loginBody">
        <Title level={2}>log In</Title>
        <LoginForm />
      </div>
    </div>
  );
}
