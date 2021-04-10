import React from 'react';
import { Spin } from 'antd';
import { string } from 'prop-types';

import './style.css';

const Loading = ({ size, className }) => (
  <div className={`spin-style ${className}`}>
    <Spin size={size} />
  </div>
);

Loading.defaultProps = {
  className: '',
};
Loading.propTypes = {
  size: string.isRequired,
  className: string,
};
export default Loading;
