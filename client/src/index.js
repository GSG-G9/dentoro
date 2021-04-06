import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

import Sidebar from './components/Sidebar';

const TodaySchedule = () => <h3>Today Schedule</h3>;
const Patients = () => <h3>Patients</h3>;
const Calender = () => <h3>Calender</h3>;

const options = [<TodaySchedule />, <Patients />, <Calender />];

ReactDOM.render(
  <React.StrictMode>
    <Sidebar contentComponents={options} />
  </React.StrictMode>,
  document.getElementById('root')
);
