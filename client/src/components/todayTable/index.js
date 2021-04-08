/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const srvData = [
  {
    key: 1,
    appointmentDateTime: '2021-12-02 08:00:00',
    is_done: false,
    firstName: 'Alexie',
    lastName: 'Jenkins',
    age: '1946',
  },
  {
    key: 3,
    appointmentDateTime: '2021-12-02 10:00:00',
    is_done: false,
    firstName: 'Minerva',
    lastName: 'Abernathy',
    age: '1996',
  },
  {
    key: 7,
    appointmentDateTime: '2021-12-02 15:00:00',
    is_done: false,
    firstName: 'Izabella',
    lastName: 'Hoppe',
    age: '1996',
  },
  {
    key: 6,
    appointmentDateTime: '2021-12-02 12:00:00',
    is_done: false,
    firstName: 'Izabella',
    lastName: 'Hoppe',
    age: '1996',
  },
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TodayTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(srvData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      appointmentDateTime: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      console.log(row);
      if (index > -1) {
        const [
          appointmentDate,
          appointmentTime,
        ] = row.appointmentDateTime.split(' ');
        console.log({ appointmentDate, appointmentTime });
        const res = await axios.patch(`/api/v1/appointments/${key}/time`, {
          appointmentDate,
          appointmentTime,
          isDone: data[index].is_done,
        });
        console.log(res);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log(errInfo);
    }
  };

  const deleteCell = async (key) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const res = await axios.patch(`/api/v1/appointments/${key}`);
        console.log(res);
        newData.splice(index, 1);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'first Name',
      dataIndex: 'firstName',
      width: '20%',
      editable: false,
    },
    {
      title: 'last Name',
      dataIndex: 'lastName',
      width: '20%',
      editable: false,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '5%',
      editable: false,
    },
    {
      title: 'Appointment',
      dataIndex: 'appointmentDateTime',
      width: '30%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <CheckOutlined
                  style={{ color: 'red', fontSize: '21px', margin: '0 10px' }}
                  onClick={() => save(record.key)}
                />

                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
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
                onClick={() => edit(record)}
              />
            )}
            <Popconfirm
              title="Sure to Delete?"
              onConfirm={() => deleteCell(record.key)}
            >
              <DeleteOutlined
                style={{ color: 'red', fontSize: '21px', margin: '0 10px' }}
                disabled={editingKey !== ''}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        style={{
          width: '60%',
        }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default TodayTable;
