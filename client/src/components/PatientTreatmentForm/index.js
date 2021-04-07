import React from 'react';
import './style.css';
import { post } from 'axios';
import { Form, Input, Button, InputNumber } from 'antd';

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const PatientTreatmentForm = () => {
  const onFinish = async (event) => {
    await post('/api/v1/patients/patientId', { ...event });
    // success
  };

  const onFinishFailed = () => {
    // failed
  };

  return (
    <Form
      style={{ width: '100%' }}
      layout="horizontal"
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
            <Input.TextArea rows={5} style={{ width: '100%' }} />
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
            rules={[
              {
                required: true,
                message: 'Please input price!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Payment"
            name="payment"
            rules={[
              {
                required: true,
                message: 'Please input payment!',
              },
            ]}
          >
            <InputNumber />
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

export default PatientTreatmentForm;
