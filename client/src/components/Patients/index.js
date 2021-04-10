import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, message, Spin } from 'antd';
import axios from 'axios';
import './style.css';
import { useHistory } from 'react-router-dom';
import { differenceInCalendarYears, parse } from 'date-fns';

const { Search } = Input;
const { Title } = Typography;

const Patients = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const buildUrlQuery = (params) => {
    const usp = new URLSearchParams();
    const newParams = params || {};
    Object.keys(newParams).forEach((key) => {
      const value = newParams[key];
      if (value) usp.set(key, value);
    });
    return usp.toString();
  };

  const fetchPatients = async (searchQuery) => {
    try {
      setLoading(true);
      if (typeof searchQuery === 'string' && searchQuery.trim().length) {
        setLoading(true);
        const {
          data: { data },
        } = await axios.get(
          `/api/v1/patients/search?${buildUrlQuery({
            firstName: searchQuery,
            LastName: searchQuery,
            phone: searchQuery,
          })}`
        );
        setDataSource(data);
        setLoading(false);
        return data;
      }
      const {
        data: { data },
      } = await axios.get(`/api/v1/patients`);
      setLoading(false);
      setDataSource(data);
      return data;
    } catch {
      setLoading(false);
      return message.error('Sever error, please try again later');
    }
  };

  const onSearch = async (value) => {
    setLoading(true);
    const patients = await fetchPatients(value);
    setDataSource(patients);
    setLoading(false);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchPatients();
    return () => {
      source.cancel('clean up axios');
    };
  }, []);

  const columns = [
    {
      title: 'Name',
      children: [
        {
          title: 'First Name',
          dataIndex: 'firstname',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastname',
        },
      ],
      responsive: ['xs', 'sm'],
    },
    {
      title: 'Age',
      dataIndex: 'birthday',

      render: (record) => (
        <>
          {differenceInCalendarYears(
            new Date(),
            parse(`${record}`.substring(0, 10), 'yyyy-MM-dd', new Date())
          )}
        </>
      ),
      responsive: ['sm'],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      responsive: ['xs', 'sm'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      responsive: ['md'],
    },
  ];

  return (
    <div className="patients-container">
      <div className="head">
        <Title level={3}>Patients</Title>
        <Search placeholder="Search for patients ..." onSearch={onSearch} />
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Table
          responsive
          size="small"
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

export default Patients;
