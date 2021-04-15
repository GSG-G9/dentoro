/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'antd';

import './style.css';

const { Meta } = Card;

const ServesCard = ({ coverIcon, servesTitle, servesDescription }) => (
  <div>
    <Card
      hoverable
      className="servesCard"
      style={{
        width: 240,
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column',
        border: 0,
      }}
      cover={coverIcon}
    >
      <Meta title={servesTitle} description={servesDescription} />
    </Card>
    ,
  </div>
);

export default ServesCard;
