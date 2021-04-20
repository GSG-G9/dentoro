import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Calendar } from 'antd';
import moment from 'moment';

const CalendarComponent = () => {
  const [value, setValue] = useState(moment());
  const history = useHistory();

  const onSelect = (date) => {
    setValue(date);
    const dateFormat = date.format('YYYY-MM-DD');
    history.push(`/dashboard/calendar/${dateFormat}`, {
      date: dateFormat,
    });
  };

  const onPanelChange = (date) => {
    setValue(date);
  };

  return (
    <div>
      <Calendar
        headerRender={() => {}}
        fullscreen={false}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CalendarComponent;
