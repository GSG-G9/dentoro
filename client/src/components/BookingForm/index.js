import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Typography,
  DatePicker,
  TimePicker,
  Result,
  Alert,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import './style.css';

const dateFormate = 'YYYY-MM-DD';
const timeFormate = 'HH:mm';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const BookingForm = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const onDate = (_, dateString) => {
    setDate(JSON.stringify(dateString));
  };

  const onTime = (_, timeString) => {
    setTime(JSON.stringify(timeString));
  };

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
    try {
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
      setSuccess(true);
    } catch (err) {
      let e;
      if (err.response.data.error === 'Unavailable Time') {
        e = 'please choose another appointment time';
      } else if (err.response.data.error === 'Validation Error') {
        e = err.response.data.message;
      } else if (err.response.data.error === 'RangeError') {
        e = 'Input valid date in form YYYY-MM-DD or time hh:mm:ss ';
      } else {
        e = 'Sever error, please try again later';
      }
      setError(e);
    }
  };

  return (
    <div className="booking">
      <Form {...layout} onFinish={onFinish} name="basic">
        <Title color="#fff"> Book an appointment</Title>
        {error && (
          <Alert
            className="err"
            id="alert"
            message={error}
            type="error"
            showIcon
          />
        )}
        <Row>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please input first Name!' }]}
          >
            <Input className="first-name" placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input className="last-name" placeholder="Last Name" />
          </Form.Item>
        </Row>
        <Form.Item name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="birthday">
          <Input placeholder="Birthday" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item
          name="appointmentDate"
          rules={[
            { required: true, message: 'Please input your appointment date!' },
          ]}
        >
          <DatePicker
            value={date}
            onChange={onDate}
            defaultValue={moment('2015-01-01', dateFormate)}
            format={dateFormate}
          />
        </Form.Item>
        <Form.Item
          name="appointmentTime"
          rules={[
            { required: true, message: 'Please input appointment time!' },
          ]}
        >
          <TimePicker
            value={time}
            onChange={onTime}
            defaultValue={moment('00:00', timeFormate)}
            format={timeFormate}
          />
        </Form.Item>
        <Form.Item name="diseases">
          <Input.TextArea placeholder="Diseases" className="input-height" />
        </Form.Item>
        <Form.Item name="complaints">
          <Input.TextArea placeholder="Complaints" className="input-height" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
      {success && <Result status="success" title="Booked successfully" />}
    </div>
  );
};

export default BookingForm;
