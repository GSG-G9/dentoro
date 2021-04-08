import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import IsAuthContext from './context/isAuthContext';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 25,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LoginForm = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { setIsAuth } = useContext(IsAuthContext);

  const history = useHistory();
  const onFinish = async ({ email, password }) => {
    try {
      setIsLoading(true);
      await axios.post('/api/v1/login', {
        email,
        password,
      });
      setIsAuth(true);
      setIsLoading(false);
      history.push('/dashboard');
    } catch (srvError) {
      setError(srvError.response.data.message || `Something went wrong`);
      setIsLoading(false);
    }
  };

  return (
    <Form
      {...layout}
      layout="vertical"
      className="loginFormStyle"
      name="login"
      size="large"
      onFinish={onFinish}
    >
      {error && <Alert message={error} type="error" showIcon />}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            type: 'email',
            message: 'Enter a valid email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters.',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
