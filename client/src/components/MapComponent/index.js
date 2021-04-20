/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import React, { useEffect, useRef } from 'react';
import { Popover, Button } from 'antd';

import {
  objectOf,
  number,
  arrayOf,
  shape,
  oneOfType,
  string,
  element,
} from 'prop-types';
import List from '../common/List';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFzc2FuZWxuYWpqYXIiLCJhIjoiY2ttYnIwaXEwMXBmaDJ2bGFmamV2bTZscCJ9.4TZoRxt7UnuMOJMPUaSkqg';

const CustomList = ({ info }) => (
  <List
    className="map-container-card-list"
    size="small"
    itemLayout="vertical"
    bordered
    dataSource={info}
  />
);

CustomList.propTypes = {
  info: arrayOf(objectOf(oneOfType([element, string]))).isRequired,
};
const MapComponent = ({ mapInfo }) => {
  const {
    geolocation: { lat, long, zoom },
    info,
  } = mapInfo;
  const mapContainer = useRef();
  const map = useRef();

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [long, lat],
      zoom,
      interactive: false,
    });
    new mapboxgl.Marker().setLngLat([long, lat]).addTo(map.current);
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    return () => map.current.remove();
  }, [lat, long, zoom]);
  return (
    <div className="map-container-div" id="map">
      <div className="map-container" ref={mapContainer} />
      <div className="map-container-card">
        <CustomList info={info} />
      </div>
      <Popover
        className="map-button"
        title="Contact Info"
        content={<CustomList info={info} />}
        trigger="click"
      >
        <Button type="primary">More Details</Button>
      </Popover>
    </div>
  );
};

MapComponent.propTypes = {
  mapInfo: shape({
    geolocation: shape({
      lat: number.isRequired,
      long: number.isRequired,
      zoom: number.isRequired,
    }).isRequired,
    info: arrayOf(objectOf(oneOfType([element, string]))),
  }).isRequired,
};
export default MapComponent;
