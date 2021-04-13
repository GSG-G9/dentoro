import React from 'react';
import { Form, Input, Button, Row, Typography } from 'antd';
import axios from 'axios';
import './style.css';

const { Title } = Typography;

const onFinish = async ({
  firstName,
  lastName,
  email,
  birthday,
  phone,
  diseases,
  appointmentDate,
  appointmentTime,
  complaints,
}) => {
  await axios.post('/api/v1/appointments', {
    firstName,
    lastName,
    email,
    birthday,
    phone,
    diseases,
    appointmentDate,
    appointmentTime,
    complaints,
  });
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const BookingForm = () => (
  <div className="booking">
    <Form
      style={{ marginLeft: '20rem' }}
      {...layout}
      onFinish={onFinish}
      name="basic"
    >
      <Title color="#fff"> Book an appointment</Title>
      <Row>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            placeholder="First Name"
            style={{ width: '12rem', marginRight: '1rem' }}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Last Name" style={{ width: '12rem' }} />
        </Form.Item>
      </Row>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="birthday"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Birthday" />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Phone" />
      </Form.Item>

      <Form.Item
        name="appointmentDate"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="Appointment date" />
      </Form.Item>
      <Form.Item
        name="appointmentTime"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="Appointment time" />
      </Form.Item>
      <Form.Item
        name="diseases"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="Diseases" style={{ height: '5rem' }} />
      </Form.Item>
      <Form.Item
        name="complaints"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="Complaints" style={{ height: '5rem' }} />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked" />

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Confirm
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default BookingForm;
