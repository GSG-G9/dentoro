import React, { useState } from 'react';
import { Input } from 'antd';

import { get } from 'axios';

const { Search } = Input;

// when press search - request to server with values from all inputs

const CalenderSearch = () => {
  const [firstName, setFirstNameValue] = useState('');
  const [lastName, setLastNameValue] = useState('');
  const [phone, setPhoneValue] = useState('');
  const params = {};
  if (firstName) params.firstName = firstName;
  if (lastName) params.lastName = lastName;
  if (phone) params.phone = phone;

  const searchFunction = async () => {
    try {
      const {
        data: { data },
      } = await get('/api/v1/appointments/search', {
        params,
      });
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <Input.Group
      compact
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Search
        onChange={(e) => setFirstNameValue(e.target.value)}
        onSearch={firstName ? searchFunction : null}
        placeholder="Search By First Name..."
        enterButton
      />
      <Search
        onChange={(e) => setLastNameValue(e.target.value)}
        onSearch={lastName ? searchFunction : null}
        placeholder="Search By Last Name..."
        enterButton
      />
      <Search
        onChange={(e) => setPhoneValue(e.target.value)}
        onSearch={phone ? searchFunction : null}
        placeholder="Search By Phone..."
        enterButton
      />
    </Input.Group>
  );
};

export default CalenderSearch;
