import React from 'react';
import { List } from 'antd';

const customList = ({ dataSource, ...otherProps }) => (
  <List
    {...otherProps}
    dataSource={dataSource}
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

export default customList;
