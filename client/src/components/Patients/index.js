import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Table, message, Button } from 'antd';
import axios from 'axios';
import './style.css';

import CustomTitle from '../common/Title';
import SearchComponent from '../CalendarSearch';
import Loading from '../common/Loading';

const Patients = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { state } = useLocation();
  let params;
  let getPatientsData = () => axios.get(`/api/v1/patients`);
  if (state) {
    params = state.params;
    getPatientsData = () => axios.get('/api/v1/patients/search', { params });
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
  const fetchPatients = async () => {
    const hideLoadingMessage = message.loading('Action in progress..', 0.5);
    try {
      setLoading(true);
      const {
        data: { data },
      } = await getPatientsData();
      setDataSource(data);
      setLoading(false);
      return hideLoadingMessage.then(() => successMessage(data.length));
    } catch (error) {
      setLoading(false);
      return hideLoadingMessage.then(() =>
        failedMessage(
          error.response.data.message
            ? error.response.data.message
            : error.response.data
        )
      );
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchPatients();
    return () => {
      source.cancel('clean up axios');
    };
  }, [params]);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
  ];

  return (
    <div className="patients-container">
      <CustomTitle text="Patients" />
      {loading ? (
        <Loading size="large" />
      ) : (
        <>
          <SearchComponent searchFor="Patients" />
          <Button
            type="primary"
            style={{ margin: '1rem 0' }}
            onClick={() => history.push(`/dashboard/patients`)}
          >
            Get All Patients
          </Button>
          <Table
            scroll={{ x: 900 }}
            size="small"
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => history.push(`patients/${record.id}`),
            })}
          />
        </>
      )}
    </div>
  );
};

export default Patients;
