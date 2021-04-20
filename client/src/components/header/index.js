import React from 'react';
import { Typography } from 'antd';

import Services from './data';
import './style.css';

const { Title, Text } = Typography;

const Header = () => (
  <div className="Service-display" id="home">
    <div className="container">
      <div className="content">
        <div className="content-div">
          <Title level={4} className="header-subtitle">
            Innovative Technology
          </Title>
          <Title className="header-title">Certified dentist</Title>
          <Text className="description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
            necessitatibus quidem nesciunt dolor
          </Text>
          <a className="read-more-button" type="button" href="#about-us">
            Read More
          </a>
        </div>
      </div>
      <div className="Service-container">{Services}</div>
    </div>
  </div>
);
export default Header;
