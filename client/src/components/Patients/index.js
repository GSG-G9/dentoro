import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, message, Spin } from 'antd';
import axios from 'axios';
import './style.css';
import { useHistory } from 'react-router-dom';

const { Search } = Input;
const { Title } = Typography;

const Patients = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(`/api/v1/patients`);
      setDataSource(data);
      setLoading(false);
      return data;
    } catch {
      return message.error('Sever error, please try again later');
    }
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
      <Title level={3}>Patients</Title>
      <Search placeholder="Search for patients ..." />
      {loading ? (
        <Spin />
      ) : (
        <Table
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
