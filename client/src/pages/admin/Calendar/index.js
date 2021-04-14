import React from 'react';
import './style.css';
import CalendarComponent from '../../../components/Calendar';
import Title from '../../../components/common/Title';
import CalendarSearch from '../../../components/CalendarSearch';

const Calendar = () => (
  <div className="calendar-page-container">
    <Title text="Calendar" />
    <CalendarSearch />
    <CalendarComponent />
  </div>
);

export default Calendar;
