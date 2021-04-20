import React, { useState, useEffect } from 'react';
import { Table, Input, message, Spin } from 'antd';
import axios from 'axios';
import './style.css';
import { useHistory } from 'react-router-dom';
import CustomTitle from '../common/Title';

const { Search } = Input;

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
      setLoading(false);
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
      <CustomTitle text="Patients" />
      <Search placeholder="Search for patients ..." />
      {loading ? (
        <Spin />
      ) : (
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
      )}
    </div>
  );
};

export default Patients;
