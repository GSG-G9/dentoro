import React from 'react';
import {
  BellOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  SendOutlined,
} from '@ant-design/icons';

const addressInfo = ({ iconClassName }) => ({
  geolocation: { lat: 31.342831483037518, long: 34.30525274373743, zoom: 15 },
  info: [
    {
      title: 'Visit our location Palestine',
      description: 'Gaza - Jalal St.',
      icon: <EnvironmentOutlined className={iconClassName} />,
    },
    {
      title: 'Give us a call',
      description: '+972 59 701 0101',
      icon: <PhoneOutlined className={iconClassName} />,
    },
    {
      title: 'Openings Hours',
      description: 'From 8 AM to 6 PM',
      icon: <BellOutlined className={iconClassName} />,
    },
    {
      title: 'Email',
      description: 'info@dentoro.com',
      icon: <SendOutlined className={iconClassName} />,
    },
  ],
});

export default addressInfo;
