import React from 'react';
import { Typography } from 'antd';
import TodayScheduleTable from '../../components/TodayScheduleTable';
import './style.css';

const { Title } = Typography;

const TodaySchedule = () => (
  <div className="loginBody">
    <Title level={2}>Today Schedule</Title>
    <TodayScheduleTable />
  </div>
);
export default TodaySchedule;
