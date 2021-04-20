import React from 'react';
import MapComponent from '../../../components/MapComponent';
import addressInfo from '../../../utils/addressInfo';

import './style.css';

const mapInfo = addressInfo({ iconClassName: 'map-icon' });
const Map = () => <MapComponent mapInfo={mapInfo} />;
export default Map;
