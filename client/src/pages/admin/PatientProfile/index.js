import React, { useEffect, useState } from 'react';
import { get } from 'axios';
import './style.css';
import { useParams } from 'react-router-dom';

import Title from '../../../components/common/Title';
import PatientDetailsForm from '../../../components/PatientDetailsForm';
import PatientTreatmentForm from '../../../components/PatientTreatmentForm';
import PatientHistory from '../../../components/PatientHistory';
import Loading from '../../../components/common/Loading';

function PatientProfile() {
  const [historyData, setHistoryData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [updateDate, setUpdateDate] = useState(0);
  const [balanceValue, setBalanceValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const { patientId } = useParams();
  useEffect(() => {
    const getPatientHistory = async () => {
      const {
        data: {
          data: { profile, history, balance },
        },
      } = await get(`/api/v1/patients/${patientId}`);
      setLoading(false);
      setHistoryData(history);
      setProfileData(profile);
      setBalanceValue(balance);
    };
    getPatientHistory();
  }, [patientId, updateDate]);
  return (
    <div className="profile-page-container">
      {loading ? (
        <Loading className="patient-profile-loading" size="large" />
      ) : (
        <>
          <Title text="Patient Profile" />
          <PatientDetailsForm
            profileData={{ ...profileData, balance: balanceValue }}
            patientId={patientId}
            setUpdateDate={setUpdateDate}
          />
          <PatientTreatmentForm
            patientId={patientId}
            setUpdateDate={setUpdateDate}
          />
          <PatientHistory historyData={historyData} patientId={patientId} />
        </>
      )}
    </div>
  );
}

export default PatientProfile;
