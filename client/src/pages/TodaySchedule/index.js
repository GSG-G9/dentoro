import React from 'react';
import ADayScheduleTable from '../../components/ADayScheduleTable';
import CustomTitle from '../../components/common/Title';

const TodaySchedule = () => (
  <div>
    <CustomTitle text="Today Schedule" />
    <ADayScheduleTable />
  </div>
);
export default TodaySchedule;
