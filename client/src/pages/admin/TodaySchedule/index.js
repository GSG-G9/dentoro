import React from 'react';
import PatientSearchDateTable from '../../../components/PatientSearchDateTable';
import CustomTitle from '../../../components/common/Title';

const TodaySchedule = () => (
  <div>
    <CustomTitle text="Today Schedule" />
    <PatientSearchDateTable showSearchBar={false} />
  </div>
);
export default TodaySchedule;
