import React from 'react';
import PropTypes from 'prop-types';

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

ServesCard.propTypes = {
  coverIcon: PropTypes.element.isRequired,
  servesTitle: PropTypes.string.isRequired,
  servesDescription: PropTypes.string.isRequired,
};

export default ServesCard;
