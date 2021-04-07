import React from 'react';
import { number, arrayOf, objectOf, oneOfType, string } from 'prop-types';

const PatientDetailsForm = ({ profileData }) => <div>{profileData}</div>;

PatientDetailsForm.propTypes = {
  profileData: arrayOf(objectOf(oneOfType([number, string]))).isRequired,
};
export default PatientDetailsForm;
