import React from 'react';
import ADayScheduleTable from '../../components/ADayScheduleTable';
import CustomTitle from '../../components/common/Title';

const dayDate = '2021-12-02';
const TodaySchedule = () => (
  <div>
    <CustomTitle text="Today Schedule" />
    <ADayScheduleTable dayDate={dayDate} />
  </div>
);
export default TodaySchedule;
