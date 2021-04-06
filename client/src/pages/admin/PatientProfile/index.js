import React, { useEffect, useState } from 'react';
import { get } from 'axios';
import { number } from 'prop-types';

import PatientHistory from '../../../components/PatientHistory';

function PatientProfile({ patientId }) {
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    const getPatientHistory = async () => {
      const {
        data: { data },
      } = await get(`/api/v1/patients/${patientId}`);
      setHistoryData(data.history);
    };
    getPatientHistory();
  }, [patientId]);
  return (
    <div>
      <PatientHistory historyData={historyData} />
    </div>
  );
}

PatientProfile.propTypes = {
  patientId: number.isRequired,
};

export default PatientProfile;
