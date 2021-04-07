import React, { useEffect, useState } from 'react';
import { get } from 'axios';
import { number } from 'prop-types';

import PatientDetailsForm from '../../../components/PatientDetailsForm';
import PatientTreatmentForm from '../../../components/PatientTreatmentForm';
import PatientHistory from '../../../components/PatientHistory';

function PatientProfile({ patientId }) {
  const [historyData, setHistoryData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    const getPatientHistory = async () => {
      const {
        data: {
          data: { profile, history },
        },
      } = await get(`/api/v1/patients/${patientId}`);
      setHistoryData(history);
      setProfileData(profile);
    };
    getPatientHistory();
  }, [patientId]);
  return (
    <div style={{ width: '500px' }}>
      <PatientDetailsForm profileData={profileData} />
      <PatientTreatmentForm />
      <PatientHistory historyData={historyData} />
    </div>
  );
}

PatientProfile.propTypes = {
  patientId: number.isRequired,
};

export default PatientProfile;
