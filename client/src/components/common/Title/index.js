import React from 'react';
import { Typography } from 'antd';

import './style.css';
import { string } from 'prop-types';

const { Title } = Typography;

const CustomTitle = ({ text }) => (
  <Title className="custom-title" level={2}>
    {text}
  </Title>
);

CustomTitle.propTypes = {
  text: string.isRequired,
};
export default CustomTitle;
