import React from 'react';
import moment from 'moment';
import { Form, Input, Button, InputNumber, DatePicker, message } from 'antd';
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

const successMessage = () => {
  message.success({
    content: 'Success! Your Patient Data has been updated ',
  });
};

const failedMessage = (errorMessage = '') => {
  message.error({
    content: `Failed! Your Patient Data not updated ${
      errorMessage ? `because ${errorMessage}` : errorMessage
    }`,
  });
};

// eslint-disable-next-line react/prop-types
const PatientDetailsForm = ({ profileData, patientId, setUpdateDate }) => {
  const {
    firstname: firstName,
    birthday,
    diseases,
    lastname: lastName,
    phone,
    balance,
  } = profileData;

  const [form] = Form.useForm();
  const onFinish = async (event) => {
    const { birthday: eventBirthday } = event;
    try {
      await patch(`/api/v1/patients/${patientId}`, {
        ...event,
        birthday: eventBirthday.format('YYYY-MM-DD'),
      });
      successMessage();
      return setUpdateDate((x) => x + 1);
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        return failedMessage(data.message);
      }
      return failedMessage();
    }
  };
  form.setFieldsValue({
    firstName,
    lastName,
    diseases,
    phone,
    balance,
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
          <Input bordered={false} className="input-background-border-hidden" />
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
          <Input bordered={false} className="input-background-border-hidden" />
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
            bordered={false}
            format="YYYY-MM-DD"
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
          <Input bordered={false} className="input-background-border-hidden" />
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
          <Input.TextArea
            bordered={false}
            className="input-background-border-hidden"
          />
        </Form.Item>
        <Form.Item
          style={{ width: '50%' }}
          label="Balance"
          name="balance"
          initialValue={balance}
          rules={[
            {
              required: true,
              message: 'Please input Balance!',
            },
          ]}
        >
          <InputNumber
            readOnly
            bordered={false}
            className="input-background-border-hidden"
          />
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
