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
    span: 0,
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
    email,
  } = profileData;

  const [isEditable, setIsEditable] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (event) => {
    if (!isEditable) return;
    const hideLoadingMessage = message.loading('Action in progress..', 1);
    const { birthday: eventBirthday } = event;
    try {
      await patch(`/api/v1/patients/${patientId}`, {
        ...event,
        birthday: eventBirthday.format('YYYY-MM-DD'),
      });
      setIsEditable(false);
      hideLoadingMessage.then(() => successMessage());
      setUpdateDate((x) => x + 1);
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        hideLoadingMessage.then(() =>
          failedMessage(data.message ? data.message : data)
        );
      }
      hideLoadingMessage.then(() => failedMessage());
    }
  };
  form.setFieldsValue({
    firstName,
    lastName,
    diseases,
    phone,
    balance,
    email,
    birthday: moment(new Date(birthday).toLocaleDateString(), 'DD/MM/YYYY'),
  });
  return (
    <Form
      requiredMark={false}
      form={form}
      className="patient-details-form"
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className="edit-icon-container">
        <EditOutlined className="edit-icon-style" />
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={false}
          checked={isEditable}
          onChange={(e) => setIsEditable(e)}
        />
      </div>
      <div className="patient-details-form-flex-style">
        <Form.Item
          className="form-item-width"
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
            className="input-background-transparent"
          />
        </Form.Item>
        <Form.Item
          className="form-item-width"
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
            className="input-background-transparent"
          />
        </Form.Item>
      </div>

      <div className="date-picker-div">
        <Form.Item
          className="form-item-width"
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
            className="input-background-transparent"
          />
        </Form.Item>
        <Form.Item
          className="form-item-width"
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
            className="input-background-transparent"
          />
        </Form.Item>
      </div>
      <div className="patient-details-form-flex-style">
        <Form.Item
          className="form-item-width"
          label="Email"
          name="email"
          initialValue={email}
          rules={[
            {
              required: false,
              message: 'Please input email!',
            },
          ]}
        >
          <Input
            type="email"
            readOnly={!isEditable}
            bordered={isEditable}
            className="input-background-transparent"
          />
        </Form.Item>
        <Form.Item
          className="form-item-width"
          label="Balance"
          name="balance"
          initialValue={balance}
        >
          <InputNumber
            formatter={(value) => `${parseFloat(value).toFixed(2)} ₪`}
            readOnly
            bordered={false}
            className={`input-background-transparent ${
              parseFloat(balance) > 0
                ? 'balance-style-negative'
                : 'balance-style-positive'
            }`}
          />
        </Form.Item>
      </div>

      <div className="patient-details-form-diseases">
        <Form.Item
          className="form-item-full-width"
          label="Diseases"
          name="diseases"
          initialValue={diseases}
          rules={[
            {
              required: false,
              message: 'Please input Disease!',
            },
          ]}
        >
          <Input.TextArea
            readOnly={!isEditable}
            bordered={isEditable}
            className="input-background-transparent"
          />
        </Form.Item>
      </div>
      <Form.Item {...tailLayout}>
        <Button hidden={!isEditable} type="primary" htmlType="submit">
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
