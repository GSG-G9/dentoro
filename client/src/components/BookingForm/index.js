import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  DatePicker,
  TimePicker,
  Result,
  Alert,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import Image from '../common/Image';
import './style.css';
import bookingFormImage from '../../assets/images/undraw_Booking_re_gw4j.svg';
import socket from '../../App/socket';

const { Title } = Typography;

const BookingForm = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const disabledDate = (current) =>
    current && current < moment().startOf('day');

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
      socket.emit(
        'add appointment',
        moment(appointmentDate).format('YYYY-MM-DD')
      );
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
    <div className="booking" id="booking-form">
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
        <div className="booking-form-form-container">
          <Form onFinish={onFinish} name="basic" className="booking-form-form">
            <Title level={3} className="booking-form-title">
              Book an appointment
            </Title>
            {error && (
              <Alert
                className="err"
                id="alert"
                message={error}
                type="error"
                showIcon
              />
            )}
            <div className="booking-form-row">
              <Form.Item
                className="booking-form-item"
                name="firstName"
                rules={[
                  { required: true, message: 'Please input first Name!' },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                className="booking-form-item"
                name="lastName"
                rules={[{ required: true, message: 'Please input last name!' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
            <div className="booking-form-row">
              <Form.Item
                className="booking-form-item"
                name="email"
                rules={[{ type: 'email' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                className="booking-form-item"
                name="birthday"
                placeholder="Birthday"
              >
                <DatePicker placeholder="Birthday" />
              </Form.Item>
            </div>

            <Form.Item
              className="booking-form-item-phone"
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
            <div className="booking-form-row">
              <Form.Item
                className="booking-form-item"
                name="appointmentDate"
                rules={[
                  {
                    required: true,
                    message: 'Please input your appointment date!',
                  },
                ]}
              >
                <DatePicker
                  disabledDate={disabledDate}
                  placeholder="Appointment date"
                />
              </Form.Item>
              <Form.Item
                className="booking-form-item"
                name="appointmentTime"
                rules={[
                  { required: true, message: 'Please input appointment time!' },
                ]}
              >
                <TimePicker
                  placeholder="Appointment time"
                  format="HH"
                  disabledHours={() => [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    19,
                    20,
                    21,
                    22,
                    23,
                  ]}
                  hideDisabledOptions
                  showNow={false}
                />
              </Form.Item>
            </div>
            <div className="booking-form-row">
              <Form.Item name="diseases" className="booking-form-item">
                <Input.TextArea
                  placeholder="Do you have any chronic diseases ?"
                  className="input-height"
                />
              </Form.Item>
              <Form.Item className="booking-form-item" name="complaints">
                <Input.TextArea
                  placeholder="What are you suffering from ?"
                  className="input-height"
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Confirm
              </Button>
            </Form.Item>
          </Form>
          <div className="booking-form-image-container">
            <Image
              src={bookingFormImage}
              alt=""
              className="booking-form-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
