import React from 'react';
import { string, bool } from 'prop-types';
import PatientSearchDateTable from '../../../components/PatientSearchDateTable';
import Title from '../../../components/common/Title';

const PatientsAppointmentTable = ({ pageTitle, showSearchBar }) => (
  <div>
    <Title text={pageTitle} />
    <PatientSearchDateTable showSearchBar={showSearchBar} />
  </div>
);

PatientsAppointmentTable.defaultProps = {
  showSearchBar: true,
};

PatientsAppointmentTable.propTypes = {
  pageTitle: string.isRequired,
  showSearchBar: bool,
};
export default PatientsAppointmentTable;
