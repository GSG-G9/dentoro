import React, { useState } from 'react';
import './style.css';

import { Calendar, Alert } from 'antd';
import moment from 'moment';

const Calender = () => {
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());

  const onSelect = (date) => {
    setValue(date);
    setSelectedValue(date);
  };

  const onPanelChange = (date) => {
    setValue(date);
  };

  return (
    <div>
      <Alert
        message={`You selected date: ${
          selectedValue && selectedValue.format('YYYY-MM-DD')
        }`}
      />
      <Calendar
        fullscreen={false}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default Calender;
