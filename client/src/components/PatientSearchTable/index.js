import React, { useState } from 'react';
import axios from 'axios';

import { Table, Popconfirm, DatePicker, TimePicker, Checkbox } from 'antd';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import './style.css';

import moment from 'moment';
import { arrayOf, shape, string, number, func, bool } from 'prop-types';
import Loading from '../common/Loading';
import AlertMessage from '../common/AlertMessage';

const PatientSearchTable = ({
  appointmentsData,
  setUpdate,
  setError,
  loading,
  error,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [editingKey, setEditingKey] = useState('');
  const [checked, setChecked] = useState('false');

  const isEditing = (record) => record.key === editingKey;

  const onDateChange = (_, dateStr) => {
    setDate(dateStr);
  };

  const onTimeChange = (_, dateStr) => {
    setTime(dateStr);
  };

  const edit = (record) => {
    setEditingKey(record.key);
    setDate(record.appointmentDate);
    setTime(record.appointmentTime);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const index = appointmentsData.findIndex((item) => key === item.key);
      if (index > -1) {
        await axios.patch(`/api/v1/appointments/${key}/time`, {
          appointmentDate: date,
          appointmentTime: time,
          isDone: appointmentsData[index].isDone,
        });

        setUpdate((update) => !update);
        setEditingKey('');
      }
    } catch (errInfo) {
      setError(
        errInfo.response
          ? errInfo.response.data.message
          : `Something went wrong`
      );
    }
  };

  const check = async (key) => {
    try {
      const index = appointmentsData.findIndex((item) => key === item.key);

      if (index > -1) {
        await axios.patch(`/api/v1/appointments/${key}/status`, {
          isDone: appointmentsData[index].isDone,
        });
        setUpdate((update) => !update);
      }
    } catch (errInfo) {
      setError(
        errInfo.response
          ? errInfo.response.data.message
          : `Something went wrong`
      );
    }
  };

  const deleteCell = async (key) => {
    try {
      await axios.delete(`/api/v1/appointments/${key}`);
      setUpdate((update) => !update);
      setEditingKey('');
    } catch (errInfo) {
      setError(
        errInfo.response
          ? errInfo.response.data.message
          : `Something went wrong`
      );
    }
  };

  const columns = [
    {
      title: 'Status',
      dataIndex: 'isDone',
      defaultSortOrder: 'ascend',
      width: '5%',
      sorter: {
        compare: (a, b) => a.isDone - b.isDone,
        multiple: 3,
      },
      render: (_, { key, isDone }) => (
        <Popconfirm
          disabled={isDone}
          title="Sure to check?"
          onConfirm={() => {
            check(key);
          }}
          onCancel={() => {
            setChecked(false);
          }}
        >
          <Checkbox
            disabled={isDone}
            checked={isDone && checked}
            onChange={() => {
              setChecked(true);
            }}
          />
        </Popconfirm>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      width: '15%',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      width: '15%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: '5%',
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointmentDate',
      width: '17%',
      sorter: {
        compare: (a, b) => a.age - b.age,
        multiple: 3,
      },
      render: (text, { key, appointmentDate }) => {
        if (editingKey && editingKey === key) {
          return (
            <DatePicker
              defaultValue={moment(appointmentDate, 'YYYY-MM-DD')}
              format="YYYY-MM-DD"
              onChange={onDateChange}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Appointment time',
      dataIndex: 'appointmentTime',
      width: '17%',
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a, b) =>
          moment(a.appointmentTime, 'hh:mm:ss') -
          moment(b.appointmentTime, 'hh:mm:ss'),
        multiple: 3,
      },
      render: (text, { key, appointmentTime }) => {
        if (editingKey && editingKey === key) {
          return (
            <TimePicker
              defaultValue={moment(appointmentTime, 'hh:mm:ss')}
              onChange={onTimeChange}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '15%',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div>
            <Popconfirm
              title="Sure to Delete?"
              disabled={record.isDone}
              onConfirm={() => deleteCell(record.key)}
            >
              <DeleteOutlined
                className="delete-icon icon"
                disabled={editingKey !== ''}
              />
            </Popconfirm>
            {editable ? (
              <span>
                <CheckOutlined
                  className="confirm-edit-icon icon"
                  onClick={() => save(record.key)}
                />

                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <CloseOutlined className="cancel-edit-icon icon" />
                </Popconfirm>
              </span>
            ) : (
              <EditOutlined
                className="icon"
                style={{ fontSize: '21px', margin: '0 10px' }}
                onClick={() => (record.isDone ? null : edit(record))}
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {loading ? (
        <Loading size="large" />
      ) : error ? (
        <AlertMessage
          message="Error"
          type="error"
          description={error}
          showIcon
        />
      ) : (
        <Table
          style={{
            width: '60%',
          }}
          bordered
          dataSource={appointmentsData}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      )}
    </div>
  );
};

PatientSearchTable.propTypes = {
  appointmentsData: arrayOf(
    shape({
      key: number.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired,
      appointmentDate: string.isRequired,
      appointmentTime: string.isRequired,
      age: number,
    }).isRequired
  ).isRequired,
  setUpdate: func.isRequired,
  setError: func.isRequired,
  loading: bool.isRequired,
  error: string.isRequired,
};

export default PatientSearchTable;
