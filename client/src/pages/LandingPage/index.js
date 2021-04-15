import React from 'react';
import NavBar from '../../components/NavBar';
import BookingForm from '../../components/BookingForm';
import Map from '../home/Map';

const LandingPage = () => (
  <div>
    <NavBar />
    <BookingForm />
    <Map />;
  </div>
);

export default LandingPage;
