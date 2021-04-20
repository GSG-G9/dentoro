import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import './style.css';

const { Meta } = Card;

const ServiceCard = ({ coverIcon, ServiceTitle, ServiceDescription }) => (
  <div>
    <Card
      hoverable
      className="ServiceCard"
      style={{
        width: 240,
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column',
        border: 0,
      }}
      cover={coverIcon}
    >
      <Meta title={ServiceTitle} description={ServiceDescription} />
    </Card>
  </div>
);

ServiceCard.propTypes = {
  coverIcon: PropTypes.element.isRequired,
  ServiceTitle: PropTypes.string.isRequired,
  ServiceDescription: PropTypes.string.isRequired,
};

export default ServiceCard;
