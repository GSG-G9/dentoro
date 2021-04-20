import React from 'react';
import { List } from 'antd';

const CustomList = ({ ...otherProps }) => (
  <List
    {...otherProps}
    renderItem={(item) => (
      <List.Item key={item.title}>
        <List.Item.Meta
          avatar={item.icon}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

export default CustomList;
