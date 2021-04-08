import React, { useState } from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  message,
  Switch,
} from 'antd';
import { patch } from 'axios';
import './style.css';
import { number, objectOf, oneOfType, string, func } from 'prop-types';
import { CloseOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 80,
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

const PatientDetailsForm = ({ profileData, patientId, setUpdateDate }) => {
  const {
    firstname: firstName,
    birthday,
    diseases,
    lastname: lastName,
    phone,
    balance,
  } = profileData;

  const [isEditable, setIsEditable] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (event) => {
    if (!isEditable) return;
    const { birthday: eventBirthday } = event;
    try {
      await patch(`/api/v1/patients/${patientId}`, {
        ...event,
        birthday: eventBirthday.format('YYYY-MM-DD'),
      });
      setIsEditable(false);
      successMessage();
      setUpdateDate((x) => x + 1);
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        failedMessage(data.message);
      }
      failedMessage();
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
  return (
    <Form
      form={form}
      className="patient-details-form"
      style={{ width: '100%' }}
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <EditOutlined style={{ fontSize: '1.5rem', color: '#0797DA' }} />
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={false}
          checked={isEditable}
          onChange={(e) => {
            setIsEditable(e);
          }}
        />
      </div>
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
          <Input
            readOnly={!isEditable}
            bordered={isEditable}
            className="input-background-border-hidden"
          />
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
          <Input
            readOnly={!isEditable}
            bordered={isEditable}
            className="input-background-border-hidden"
          />
        </Form.Item>
      </div>

      <div className="date-picker-div" style={{ display: 'flex' }}>
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
            disabled={!isEditable}
            inputReadOnly={!isEditable}
            bordered={isEditable}
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
          <Input
            readOnly={!isEditable}
            bordered={isEditable}
            className="input-background-border-hidden"
          />
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
            readOnly={!isEditable}
            bordered={isEditable}
            className="input-background-border-hidden"
          />
        </Form.Item>
        <Form.Item
          style={{ width: '50%' }}
          label="Balance"
          name="balance"
          initialValue={balance}
        >
          <InputNumber
            readOnly
            bordered={false}
            className="input-background-border-hidden"
          />
        </Form.Item>
      </div>

      <Form.Item {...tailLayout}>
        <Button
          style={{ visibility: isEditable ? 'visible' : 'hidden' }}
          type="primary"
          htmlType="submit"
        >
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};
PatientDetailsForm.propTypes = {
  profileData: objectOf(oneOfType([number, string])).isRequired,
  patientId: number.isRequired,
  setUpdateDate: func.isRequired,
};
export default PatientDetailsForm;
