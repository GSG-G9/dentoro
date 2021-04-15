import React from 'react';
import NavBar from '../../components/NavBar';
import BookingForm from '../../components/BookingForm';
import Map from '../home/Map';
import Footer from '../../components/Footer';

const LandingPage = () => (
  <div>
    <NavBar />
    <BookingForm />
    <Map />
    <Footer />
  </div>
);

export default LandingPage;
