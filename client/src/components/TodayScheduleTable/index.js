import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './style.css';
// import PropTypes from 'prop-types';
import {
  Table,
  Popconfirm,
  Form,
  DatePicker,
  TimePicker,
  Checkbox,
  Alert,
} from 'antd';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const TodayScheduleTable = () => {
  // console.log(srvData, 'hi');
  const [form] = Form.useForm();
  const [srvData, setSrvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [checked, setChecked] = useState('false');
  const [error, setError] = useState('');

  const today = '2021-12-02';

  const isEditing = (record) => record.key === editingKey;
  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();
    axios
      .get(`/api/v1/appointments/${today}`)
      .then(({ data: { data } }) => {
        if (!unmounted) {
          const newData = data.map((item) => ({
            key: item.appointments_id,
            appointmentDate: item.appointment_date.slice(0, 10),
            appointmentTime: item.appointment_time,
            firstName: item.firstname,
            lastName: item.lastname,
            isDone: item.is_done,
            age:
              parseInt(today.slice(0, 4), 10) -
              parseInt(item.birthday.slice(0, 4), 10),
          }));
          setSrvData(newData);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!unmounted) {
          setError(e.message);
          // setErrorMessage(e.message);
          setLoading(false);
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
  }, []);

  // useEffect(() => {
  //   setDate(srvData);
  // }, [srvData]);

  const onDateChange = (_, dateStr) => {
    setDate(dateStr);
  };

  const onTimeChange = (_, dateStr) => {
    setTime(dateStr);
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      appointmentTime: '',
      appointmentDate: '',
      ...record,
    });
    setEditingKey(record.key);
    setDate(record.appointmentDate);
    setTime(record.appointmentTime);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = { appointmentDate: date, appointmentTime: time };
      const newData = [...srvData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const { appointmentDate, appointmentTime } = row;
        const res = await axios.patch(`/api/v1/appointments/${key}/time`, {
          appointmentDate,
          appointmentTime,
          isDone: srvData[index].isDone,
        });
        console.log(res);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setSrvData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setSrvData(newData);
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
      const newData = [...srvData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        await axios.patch(`/api/v1/appointments/${key}/status`, {
          isDone: srvData[index].isDone,
        });
        const item = newData[index];
        newData.splice(index, 1);
        newData.push({ ...item, ...{ isDone: true } });
        setSrvData(newData);
      } else {
        setSrvData(newData);
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
      const newData = [...srvData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        await axios.delete(`/api/v1/appointments/${key}`);
        newData.splice(index, 1);
        // setSrvData(newData);
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

  const columns = [
    {
      title: 'Stats',
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
          title="Sure to cancel?"
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
      title: 'first Name',
      dataIndex: 'firstName',
      width: '15%',
    },
    {
      title: 'last Name',
      dataIndex: 'lastName',
      width: '15%',
    },
    {
      title: 'age',
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
      title: 'operation',
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
                style={{ color: 'red', fontSize: '21px', margin: '0 10px' }}
                disabled={editingKey !== ''}
              />
            </Popconfirm>
            {editable ? (
              <span>
                <CheckOutlined
                  style={{ color: 'red', fontSize: '21px', margin: '0 10px' }}
                  onClick={() => save(record.key)}
                />

                <Popconfirm title="Sure to check?" onConfirm={cancel}>
                  <CloseOutlined
                    style={{
                      color: 'green',
                      fontSize: '21px',
                      margin: '0 10px',
                    }}
                  />
                </Popconfirm>
              </span>
            ) : (
              <EditOutlined
                style={{ fontSize: '21px', margin: '0 10px' }}
                onClick={() => (record.isDone ? null : edit(record))}
              />
            )}
          </div>
        );
      },
    },
  ];
  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }

  //   return {
  //     // ...col,
  //     // onCell: (record) => ({
  //     //   record,
  //     //   inputType: col.dataIndex === 'age' ? 'number' : 'text',
  //     //   dataIndex: col.dataIndex,
  //     //   title: col.title,
  //     //   editing: isEditing(record),
  //     // }),
  //   };
  // });
  return (
    <Form form={form} component={false}>
      {loading ? <h1>loading</h1> : null}
      {error && <Alert message={error} type="error" showIcon />}
      <Table
        style={{
          width: '60%',
        }}
        bordered
        dataSource={srvData}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

// TodayScheduleTable.propTypes = {
//   srvData: PropTypes.arrayOf(
//     PropTypes.shape({
//       key: PropTypes.number.isRequired,
//       firstName: PropTypes.string.isRequired,
//       lastName: PropTypes.string.isRequired,
//       appointmentDate: PropTypes.string.isRequired,
//       appointmentTime: PropTypes.string.isRequired,
//       age: PropTypes.number,
//     }).isRequired
//   ).isRequired,
// };

export default TodayScheduleTable;
