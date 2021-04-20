/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import {
  message,
  Table,
  Popconfirm,
  DatePicker,
  TimePicker,
  Checkbox,
} from 'antd';

import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import './style.css';

import moment from 'moment';
import { arrayOf, shape, string, number, func, bool } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../common/Loading';
import AlertMessage from '../common/AlertMessage';

const successMessage = () => {
  message.success({
    content: 'Success!',
  });
};

const failedMessage = (errorMessage = '') => {
  message.error({
    content: `Failed! ${errorMessage}`,
  });
};

const PatientSearchTable = ({
  appointmentsData,
  setUpdate,
  loading,
  error,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [editingKey, setEditingKey] = useState('');
  const [checked, setChecked] = useState('false');
  const history = useHistory();

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
    const hideLoadingMessage = message.loading('Action in progress..', 0.5);
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
        hideLoadingMessage.then(() => successMessage());
      }
    } catch (errInfo) {
      hideLoadingMessage.then(() =>
        failedMessage(
          errInfo.response.data.message
            ? errInfo.response.data.message
            : errInfo.response.data
        )
      );
    }
  };

  const check = async (key) => {
    const hideLoadingMessage = message.loading('Action in progress..', 0.5);
    try {
      const index = appointmentsData.findIndex((item) => key === item.key);

      if (index > -1) {
        await axios.patch(`/api/v1/appointments/${key}/status`, {
          isDone: appointmentsData[index].isDone,
        });
        setUpdate((update) => !update);
        hideLoadingMessage.then(() => successMessage());
      }
    } catch (errInfo) {
      hideLoadingMessage.then(() =>
        failedMessage(
          errInfo.response.data.message
            ? errInfo.response.data.message
            : errInfo.response.data
        )
      );
    }
  };

  const deleteCell = async (key) => {
    const hideLoadingMessage = message.loading('Action in progress..', 0.5);
    try {
      await axios.delete(`/api/v1/appointments/${key}`);
      setUpdate((update) => !update);
      setEditingKey('');
      hideLoadingMessage.then(() => successMessage());
    } catch (errInfo) {
      hideLoadingMessage.then(() =>
        failedMessage(
          errInfo.response.data.message
            ? errInfo.response.data.message
            : errInfo.response.data
        )
      );
    }
  };

  const columns = [
    {
      title: 'Status',
      dataIndex: 'isDone',
      defaultSortOrder: 'ascend',
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
            className="patient-search-table-status"
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
      render: (_, { firstName, patientId }) => (
        <Link
          className="row-click-pointer"
          onClick={() => history.push(`/dashboard/patients/${patientId}`)}
        >
          {firstName}
        </Link>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      render: (_, { lastName, patientId }) => (
        <Link
          className="row-click-pointer"
          onClick={() => history.push(`/dashboard/patients/${patientId}`)}
        >
          {lastName}
        </Link>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointmentDate',
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
    <div className="patient-search-table">
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
          scroll={{ x: 800 }}
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
  loading: bool.isRequired,
  error: string.isRequired,
};

export default PatientSearchTable;
