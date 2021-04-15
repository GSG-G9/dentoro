import React from 'react';

import NavBar from '../../components/NavBar';
import BookingForm from '../../components/BookingForm';
import ServesDisplay from '../../components/ServesDisplay';
import Map from '../home/Map';

const LandingPage = () => (
  <div>
    <NavBar />
    <ServesDisplay />
    <BookingForm />
    <Map />;
  </div>
);

export default LandingPage;
