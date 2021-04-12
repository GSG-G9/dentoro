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
          response: { data },
        } = err;
        return hideLoadingMessage.then(() =>
          failedMessage(data.message ? data.message : data)
        );
      }
      return hideLoadingMessage.then(failedMessage);
    }
  };

  return (
    <Form
      requiredMark={false}
      form={form}
      className="patient-treatment-form"
      layout="vertical"
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className="patient-treatment-form-div">
        <div className="patient-treatment-form-description-div">
          <Form.Item
            className="patient-treatment-form-flex"
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
              rows={3}
              className="patient-treatment-form-full-width"
            />
          </Form.Item>
        </div>
        <div className="patient-treatment-form-full-width-flex">
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
