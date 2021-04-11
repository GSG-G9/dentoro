import React, { useState } from 'react';
import { Input, message, Select, Button, Form } from 'antd';
import { get } from 'axios';
import { useHistory } from 'react-router-dom';
import './style.css';

const { Option } = Select;

const successMessage = (dataCount) => {
  message.success({
    content: `Success! Result Count : ${dataCount}`,
  });
};

const failedMessage = (errorMessage = '') => {
  message.error({
    content: `Failed! ${errorMessage ? `${errorMessage}` : errorMessage}`,
  });
};

const CalendarSearch = () => {
  const history = useHistory();
  const [selectOption, setSelectOption] = useState('name');
  const searchFunction = async (params) => {
    const hideLoadingMessage = message.loading('Action in progress..', 1);
    try {
      const {
        data: { data },
      } = await get('/api/v1/appointments/search', {
        params,
      });
      hideLoadingMessage.then(() => successMessage(data.length));
      return (
        data.length &&
        history.push('/dashboard/calendar/appointmentsearch', { state: data })
      );
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        return hideLoadingMessage.then(() =>
          failedMessage(data.message ? data.message : data)
        );
      }
      return hideLoadingMessage.then(() => failedMessage());
    }
  };
  return (
    <Form
      requiredMark={false}
      onFinish={searchFunction}
      layout="inline"
      className="calendar-search-form"
    >
      <Form.Item>
        <Select defaultValue="Name" onChange={setSelectOption}>
          <Option value="name">Name</Option>
          <Option value="phone">Phone</Option>
        </Select>
      </Form.Item>
      {selectOption === 'name' ? (
        <div className="calendar-search-inputs-div">
          <Form.Item
            className="calendar-search-input-half-width"
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please input First Name!',
              },
            ]}
          >
            <Input placeholder="Enter first name ..." />
          </Form.Item>
          <Form.Item
            className="calendar-search-input-half-width"
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please input Last Name!',
              },
            ]}
          >
            <Input placeholder="Enter last name ..." />
          </Form.Item>
        </div>
      ) : (
        <div className="calendar-search-inputs-div">
          <Form.Item
            className="calendar-search-input-full-width"
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input Phone !',
              },
            ]}
          >
            <Input placeholder="Please Enter phone number like 0599010101 ..." />
          </Form.Item>
        </div>
      )}

      <div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CalendarSearch;
