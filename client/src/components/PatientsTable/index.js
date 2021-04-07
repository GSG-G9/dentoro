import React, { useState, useEffect } from 'react';
import { Table, Typography, Input } from 'antd';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Title } = Typography;
const { Column } = Table;

const fetchPatients = async () => {
  const {
    data: { data },
  } = await axios.get(`/api/v1/patients`);
  return data;
};

const PatientsTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Title level={3}>Patients</Title>
      <Search
        placeholder="Search for patients ..."
        style={{ width: 300, float: 'right', paddingRight: '100px' }}
      />
      {loading ? (
        'loading'
      ) : (
        <Table dataSource={dataSource} key="id">
          <Column title="First Name" dataIndex="firstname" />
          <Column title="Last Name" dataIndex="lastname" />
          <Column key="id" title="Age" dataIndex="birthday" />
          <Column title="Registration Date" dataIndex="address" />
          <Column title="Options" render={() => <EditOutlined />} />
        </Table>
      )}
    </>
  );
};

export default PatientsTable;
