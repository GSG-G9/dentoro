import React from 'react';
import moment from 'moment';
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { patch } from 'axios';
import './style.css';
import { number, objectOf, oneOfType, string } from 'prop-types';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 90,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 50,
  },
};

// eslint-disable-next-line react/prop-types
const PatientDetailsForm = ({ profileData, patientId }) => {
  const {
    firstname: firstName,
    birthday,
    diseases,
    lastname: lastName,
    phone,
  } = profileData;

  const [form] = Form.useForm();
  const onFinish = async (event) => {
    const { birthday: bb } = event;
    console.log(bb);
    console.log(bb.toDate());
    try {
      await patch(`/api/v1/patients/${patientId}`, {
        ...event,
        birthday: bb.format('YYYY/MM/DD'),
      });
      console.log(event);
    } catch (error) {
      console.log(error.response);
    }

    //
  };

  form.setFieldsValue({
    firstName,
    lastName,
    diseases,
    phone,
    birthday: moment(new Date(birthday).toLocaleDateString(), 'DD/MM/YYYY'),
  });
  const onFinishFailed = () => {
    // failed
  };
  return (
    <Form
      form={form}
      style={{ width: '100%' }}
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div style={{ display: 'flex' }}>
        <Form.Item
          style={{ width: '50%' }}
          label="First Name"
          name="firstName"
          initialValue={firstName}
          rules={[
            {
              required: true,
              message: 'Please input Name!',
            },
          ]}
        >
          <Input className="input-background-border-hidden" />
        </Form.Item>
        <Form.Item
          style={{ width: '50%' }}
          label="Last Name"
          name="lastName"
          initialValue={lastName}
          rules={[
            {
              required: true,
              message: 'Please input Name!',
            },
          ]}
        >
          <Input className="input-background-border-hidden" />
        </Form.Item>
      </div>

      <div style={{ display: 'flex' }}>
        <Form.Item
          style={{ width: '50%' }}
          label="Birthday"
          name="birthday"
          initialValue={moment()}
          rules={[
            {
              required: true,
              message: 'Please input Birthday!',
            },
          ]}
        >
          <DatePicker
            format="YYYY/MM/DD"
            className="input-background-border-hidden"
          />
        </Form.Item>
        <Form.Item
          style={{ width: '50%' }}
          label="Phone"
          name="phone"
          initialValue={phone}
          rules={[
            {
              required: true,
              message: 'Please input Phone!',
            },
          ]}
        >
          <Input className="input-background-border-hidden" />
        </Form.Item>
      </div>
      <div style={{ display: 'flex' }}>
        <Form.Item
          style={{ width: '50%' }}
          label="Diseases"
          name="diseases"
          initialValue={diseases}
          rules={[
            {
              required: true,
              message: 'Please input Disease!',
            },
          ]}
        >
          <Input.TextArea className="input-background-border-hidden" />
        </Form.Item>
        <Form.Item
          style={{ width: '50%' }}
          label="Balance"
          name="balance"
          rules={[
            {
              required: true,
              message: 'Please input Balance!',
            },
          ]}
        >
          <InputNumber value={0} className="input-background-border-hidden" />
        </Form.Item>
      </div>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

PatientDetailsForm.propTypes = {
  profileData: objectOf(oneOfType([number, string])).isRequired,
};
export default PatientDetailsForm;
