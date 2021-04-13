/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import React, { useEffect, useRef, useState } from 'react';

import { List } from 'antd';
import {
  BellOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  SendOutlined,
} from '@ant-design/icons';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFzc2FuZWxuYWpqYXIiLCJhIjoiY2ttYnIwaXEwMXBmaDJ2bGFmamV2bTZscCJ9.4TZoRxt7UnuMOJMPUaSkqg';

const data = [
  {
    title: 'Visit our location Palestine',
    description: 'Gaza - Jalal St.',
    icon: <EnvironmentOutlined className="map-icon-top" />,
  },
  {
    title: 'Give us a call',
    description: '+972 59 701 0101',
    icon: <PhoneOutlined className="map-icon-top" />,
  },
  {
    title: 'Openings Hours',
    description: 'From 8 AM to 6 PM',
    icon: <BellOutlined className="map-icon-top" />,
  },
  {
    title: 'Email',
    description: 'info@dentoro.com',
    icon: <SendOutlined className="map-icon-top" />,
  },
];

const MapComponent = () => {
  const mapContainer = useRef();
  const map = useRef();
  const [lat] = useState(31.342831483037518);
  const [lng] = useState(34.30525274373743);
  const [zoom] = useState(15);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });
    new mapboxgl.Marker()
      .setLngLat([34.30525274373743, 31.342831483037518])
      .addTo(map.current);
    return () => map.current.remove();
  }, [lat, lng, zoom]);
  return (
    <div className="map-container-div">
      <div className="map-container" ref={mapContainer} />
      <div className="map-container-card">
        <List
          className="map-container-card-list"
          size="small"
          itemLayout="vertical"
          bordered
          dataSource={data}
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
      </div>
    </div>
  );
};

export default MapComponent;
