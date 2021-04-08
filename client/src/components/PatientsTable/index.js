import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, message, Spin } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const { Search } = Input;
const { Title } = Typography;

const PatientsTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchPatients = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`/api/v1/patients`);
      return data;
    } catch {
      return message.error('Sever error, please try again later');
    }
  };

  const initPatientList = async () => {
    setLoading(true);
    const data = await fetchPatients();
    setDataSource(data);
    setLoading(false);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    initPatientList();
    return () => {
      source.cancel('clean up axios');
    };
  }, []);

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
    {
      title: 'Diseases',
      dataIndex: 'diseases',
    },
  ];

  return (
    <div>
      <Title level={3}>Patients</Title>
      <Search
        placeholder="Search for patients ..."
        style={{ width: 300, float: 'right', paddingRight: '100px' }}
      />
      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => history.push(`patients/${record.id}`),
          })}
        />
      )}
    </div>
  );
};

export default PatientsTable;