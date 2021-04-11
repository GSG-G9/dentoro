import React from 'react';

import CalendarComponent from '../../../components/Calender';
import Tile from '../../../components/common/Title';
import CalenderSearch from '../../../components/CalenderSearch';

const Calender = () => (
  <div style={{ width: '80%' }}>
    <Tile text="Calender" />
    <CalenderSearch />
    <CalendarComponent />
  </div>
);

export default Calender;
