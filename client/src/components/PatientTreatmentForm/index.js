import React from 'react';
import './style.css';
import { post } from 'axios';
import { Form, Input, Button, InputNumber, message } from 'antd';

import { number, func } from 'prop-types';

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 100,
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
    content: 'Success! Your Patient Data has been saved ',
  });
};

const failedMessage = (errorMessage = '') => {
  message.error({
    content: `Failed! Your Patient Data not updated ${
      errorMessage ? `because ${errorMessage}` : errorMessage
    }`,
  });
};

const PatientTreatmentForm = ({ patientId, setUpdateDate }) => {
  const [form] = Form.useForm();
  const onFinish = async (event) => {
    const hideLoadingMessage = message.loading('Action in progress..', 1);
    try {
      await post(`/api/v1/patients/${patientId}/history`, { ...event });
      hideLoadingMessage.then(() => successMessage());
      form.resetFields();

      return setUpdateDate((update) => update + 1);
    } catch (err) {
      if (err.response) {
        const {
          response: {
            data: { message: serverErrorMessage },
          },
        } = err;
        return hideLoadingMessage.then(() => failedMessage(serverErrorMessage));
      }
      return hideLoadingMessage.then(failedMessage);
    }
  };

  return (
    <Form
      form={form}
      style={{ width: '100%' }}
      layout="vertical"
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ width: '100%' }}>
          <Form.Item
            style={{ display: 'flex' }}
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input Description!',
              },
            ]}
          >
            <Input.TextArea rows={3} style={{ width: '100%' }} />
          </Form.Item>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Form.Item
            label="Price"
            name="price"
            initialValue={0}
            rules={[
              {
                required: true,
                message: 'Please input price!',
              },
            ]}
          >
            <InputNumber
              formatter={(value) => `${parseFloat(value).toFixed(2)} ₪`}
            />
          </Form.Item>
          <Form.Item
            label="Payment"
            name="payment"
            initialValue={0}
            rules={[
              {
                required: true,
                message: 'Please input payment!',
              },
            ]}
          >
            <InputNumber
              formatter={(value) => `${parseFloat(value).toFixed(2)} ₪`}
            />
          </Form.Item>
        </div>
      </div>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

PatientTreatmentForm.propTypes = {
  patientId: number.isRequired,
  setUpdateDate: func.isRequired,
};

export default PatientTreatmentForm;
