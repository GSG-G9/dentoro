import React, { useState } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';

import { Calendar } from 'antd';
import moment from 'moment';

const CalendarComponent = () => {
  const [value, setValue] = useState(moment());
  const history = useHistory();

  const onSelect = (date) => {
    setValue(date);
    history.push(`/dashboard/calendar/${date.format('YYYY-MM-DD')}`);
  };

  const onPanelChange = (date) => {
    setValue(date);
  };

  return (
    <div>
      <Calendar
        fullscreen={false}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CalendarComponent;
