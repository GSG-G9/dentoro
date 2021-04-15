import React from 'react';
import NavBar from '../../components/NavBar';
import BookingForm from '../../components/BookingForm';
import Map from '../home/Map';
import AboutUs from '../home/AboutUs';
import Header from '../../components/header';
import OurServices from '../../components/OurServices';
import './style.css';

const LandingPage = () => (
  <div className="landing-page-container">
    <div className="landing-page-content">
      <NavBar />
      <Header />
      <AboutUs />
      <BookingForm />
      <OurServices />
      <Map />;
    </div>
  </div>
);

export default LandingPage;
