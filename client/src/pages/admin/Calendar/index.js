import React from 'react';
import './style.css';
import CalendarComponent from '../../../components/Calendar';
import Tile from '../../../components/common/Title';
import CalendarSearch from '../../../components/CalendarSearch';

const Calendar = () => (
  <div className="calendar-page-container">
    <Tile text="Calendar" />
    <CalendarSearch />
    <CalendarComponent />
  </div>
);

export default Calendar;
