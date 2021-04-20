import React from 'react';
import { arrayOf, objectOf, oneOfType, number, string } from 'prop-types';
import { Table } from 'antd';
import './style.css';

const columns = ['Description', 'Price', 'Payment', 'Remaining', 'Time'].map(
  (column) => ({
    title: column,
    dataIndex: column,
    key: column,
  })
);

const PatientHistory = ({ historyData }) => {
  const data = historyData.map(
    ({ description, payment, price, log_date: Time }, index) => ({
      key: `${index + 1}`,
      Description: description,
      Payment: payment,
      Price: price,
      Time: new Date(Time).toLocaleDateString(),
      Remaining: (price - payment).toFixed(2),
    })
  );
  return (
    <div className="history-table-container">
      <Table columns={columns} dataSource={data} scroll={{ x: 900 }} />
    </div>
  );
};

PatientHistory.propTypes = {
  historyData: arrayOf(objectOf(oneOfType([number, string]))).isRequired,
};

export default PatientHistory;
