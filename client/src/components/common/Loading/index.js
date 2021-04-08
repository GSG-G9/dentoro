import React from 'react';
import { Spin } from 'antd';
import { string } from 'prop-types';

const Loading = ({ size }) => <Spin size={size} />;

Loading.propTypes = {
  size: string.isRequired,
};
export default Loading;
