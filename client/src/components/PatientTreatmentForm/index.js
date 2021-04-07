import React from 'react';
import './style.css';
import { Form, Input, Button, InputNumber } from 'antd';

const layout = {
  labelCol: {
    span: 8,
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
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ border: '1px solid black', width: '300px' }}>
          <Form.Item
            style={{ border: '2px solid red', display: 'flex' }}
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input Description!',
              },
            ]}
          >
            <Input.TextArea
              rows={5}
              cols={20}
              style={{ border: '5px solid blue', width: '100%' }}
            />
          </Form.Item>
        </div>
        <div style={{ border: '1px solid black', width: '300px' }}>
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
