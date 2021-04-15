import React from 'react';

import NavBar from '../../components/NavBar';
import BookingForm from '../../components/BookingForm';
import Header from '../../components/header';
import Map from '../home/Map';

const LandingPage = () => (
  <div>
    <NavBar />
    <Header />
    <BookingForm />
    <Map />;
  </div>
);

export default LandingPage;
