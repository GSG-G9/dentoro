import React, { useState, useEffect } from 'react';
import { Table, Typography, Input } from 'antd';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
// import { parse, differenceInCalendarYears } from 'date-fns';

const { Search } = Input;
const { Title } = Typography;
const { Column } = Table;

function buildUrlQuery(params) {
  const usp = new URLSearchParams();
  const newParams = params || {};
  Object.keys(newParams).forEach((key) => {
    const value = newParams[key];
    if (value) usp.set(key, value);
  });
  return usp.toString();
}

const fetchPatients = async (searchQuery) => {
  if (typeof searchQuery === 'string' && searchQuery.trim().length) {
    const {
      data: { data },
    } = await axios.get(
      `/api/v1/patients/search?${buildUrlQuery({
        firstName: searchQuery,
        LastName: searchQuery,
        phone: searchQuery,
      })}`
    );
    return data;
  }

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

  const onSearch = async (value) => {
    setLoading(true);
    const data = await fetchPatients(value);
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

  // const date = {
  //   birthday: differenceInCalendarYears(
  //     new Date(),
  //     parse('birthday'.substring(0, 10), 'yyyy-MM-dd', new Date())
  //   ),
  // };

  return (
    <>
      <Title level={3}>Patients</Title>
      <Search
        placeholder="input search text"
        style={{ width: 300, float: 'right', paddingRight: '100px' }}
        onSearch={onSearch}
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
