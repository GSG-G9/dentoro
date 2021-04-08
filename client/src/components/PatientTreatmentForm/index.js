import React from 'react';
import './style.css';
import { post } from 'axios';
import { Form, Input, Button, InputNumber } from 'antd';

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

const PatientTreatmentForm = ({ patientId, setUpdateDate }) => {
  const [form] = Form.useForm();
  const onFinish = async (event) => {
    await post(`/api/v1/patients/${patientId}/history`, { ...event });
    form.resetFields();
    setUpdateDate((update) => update + 1);
  };

  const onFinishFailed = () => {
    // failed
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

PatientTreatmentForm.propTypes = {
  patientId: number.isRequired,
  setUpdateDate: func.isRequired,
};

export default PatientTreatmentForm;
