import React from 'react';
import ADayScheduleTable from '../../components/ADayScheduleTable';
import CustomTitle from '../../components/common/Title';

const TodaySchedule = () => (
  <div>
    <CustomTitle text="Today Schedule" />
    <ADayScheduleTable dayDate="2021-12-02" />
  </div>
);
export default TodaySchedule;
