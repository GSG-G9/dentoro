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

const { Title } = Typography;

const BookingForm = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const onDate = (_, dateString) => {
    setDate(dateString);
  };

  const onTime = (_, timeString) => {
    setTime(timeString);
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
      setLoading(true);
      await axios.post('/api/v1/appointments', {
        firstName,
        lastName,
        email,
        birthday: moment(birthday).format('YYYY-MM-DD'),
        phone,
        diseases,
        appointmentDate: moment(appointmentDate).format('YYYY-MM-DD'),
        appointmentTime: moment(appointmentTime).format('HH:mm:ss'),
        complaints,
      });
      setSuccess(true);
      setError(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let e;
      if (err.response.data.error === 'Unavailable Time') {
        e = 'please choose another appointment time';
      } else if (err.response.data.error === 'Validation Error') {
        e = err.response.data.message;
      } else {
        e = 'Sever error, please try again later';
      }
      setError(e);
    }
  };

  return (
    <div className="booking">
      {success ? (
        <div className="success">
          <Result status="success" title="Booked successfully" />
          <Button
            value={success}
            type="primary"
            onClick={() => setSuccess(false)}
          >
            Book again
          </Button>
        </div>
      ) : (
        <Form onFinish={onFinish} name="basic">
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
          <Form.Item name="email" rules={[{ type: 'email' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="birthday" placeholder="Birthday">
            <DatePicker placeholder="Birthday" value={date} onChange={onDate} />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              {
                pattern: /^[0-9-]*[0-9].{9,}$/,
                message: 'Invalid phone number',
              },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="appointmentDate"
            rules={[
              {
                required: true,
                message: 'Please input your appointment date!',
              },
            ]}
          >
            <DatePicker
              placeholder="Appointment date"
              value={date}
              onChange={onDate}
            />
          </Form.Item>
          <Form.Item
            name="appointmentTime"
            rules={[
              { required: true, message: 'Please input appointment time!' },
            ]}
          >
            <TimePicker
              placeholder="Appointment time"
              value={time}
              onChange={onTime}
              format="HH"
              disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 19, 20, 21, 22, 23]}
              hideDisabledOptions
              showNow={false}
            />
          </Form.Item>
          <Form.Item name="diseases">
            <Input.TextArea placeholder="Diseases" className="input-height" />
          </Form.Item>
          <Form.Item name="complaints">
            <Input.TextArea placeholder="Complaints" className="input-height" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default BookingForm;
