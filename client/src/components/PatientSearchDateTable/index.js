import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { bool } from 'prop-types';
import { message } from 'antd';
import PatientSearchTable from '../PatientSearchTable';

const CalendarSearch = () => <h1>Search</h1>;
const PatientSearchDateTable = ({ showSearchBar }) => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [update, setUpdate] = useState(false);

  let getPatientsData = () =>
    axios.get(`/api/v1/appointments/${moment().format('YYYY-MM-DD')}`);
  let params;
  const { state } = useLocation();
  if (state) {
    const dayDate = state.date;
    params = state.params;

    if (dayDate) {
      getPatientsData = () => axios.get(`/api/v1/appointments/${dayDate}`);
    } else if (params) {
      getPatientsData = () =>
        axios.get('/api/v1/appointments/search', { params });
    }
  }

  const successMessage = (dataCount) => {
    message.success({
      content: `Success! Result Count : ${dataCount}`,
    });
  };

  const failedMessage = (errorMessage = '') => {
    message.error({
      content: `Failed! ${errorMessage ? `${errorMessage}` : errorMessage}`,
    });
  };
  useEffect(() => {
    const hideLoadingMessage = message.loading('Action in progress..', 0.5);
    let unmounted = false;
    const source = axios.CancelToken.source();
    getPatientsData()
      .then(({ data: { data } }) => {
        if (!unmounted) {
          const newData = data.map((item) => ({
            key: item.appointment_id,
            appointmentDate: moment(item.appointment_date).format('YYYY-MM-DD'),
            appointmentTime: item.appointment_time,
            firstName: item.firstname,
            lastName: item.lastname,
            isDone: item.is_done || false,
            age: moment().format('YYYY') - moment(item.birthday).format('YYYY'),
          }));
          setAppointmentsData(newData);
          setLoading(false);
          setUpdate(false);
          hideLoadingMessage.then(() => successMessage(data.length));
        }
      })
      .catch((e) => {
        if (!unmounted) {
          setError(e.message);
          setLoading(false);
          hideLoadingMessage.then(() => failedMessage());
          if (axios.isCancel(e)) {
            console.log(`request cancelled:${e.message}`);
          } else {
            console.log(`another error happened:${e.message}`);
          }
        }
      });
    return () => {
      unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, [update, params]);

  return (
    <div style={{ width: '100%' }}>
      {showSearchBar && <CalendarSearch />}
      <PatientSearchTable
        appointmentsData={appointmentsData}
        setUpdate={setUpdate}
        error={error}
        setError={setError}
        loading={loading}
      />
    </div>
  );
};

PatientSearchDateTable.propTypes = {
  showSearchBar: bool,
};

PatientSearchDateTable.defaultProps = {
  showSearchBar: true,
};

export default PatientSearchDateTable;
