import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';

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

  const history = useHistory();
  // eslint-disable-next-line consistent-return
  const onFinish = async ({ email, password }) => {
    try {
      await axios.post('/api/v1/login', {
        email,
        password,
      });
      history.push('/');
    } catch (srvError) {
      setError(srvError.res);
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
            type: 'email',
            message: 'Please input your email!',
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
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
