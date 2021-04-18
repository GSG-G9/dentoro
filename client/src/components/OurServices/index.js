import React from 'react';
import { Typography } from 'antd';

import Services from './data';
import './style.css';

const { Title, Text } = Typography;

const OurServices = () => (
  <div className="ourService-display" id="our-services">
    <div className="ourService-container">
      <div className="ourService-content">
        <Title level={5} className="ourService-subtitle">
          Our Services
        </Title>
        <Title className="ourService-title">
          Providing specialist dental Care & training
        </Title>
        <Text className="ourService-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
          necessitatibus quidem nesciunt dolor Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Itaque necessitatibus quidem nesciunt
          dolor
        </Text>
      </div>
      <div className="ourService-Service-container">{Services}</div>
    </div>
  </div>
);

export default OurServices;
