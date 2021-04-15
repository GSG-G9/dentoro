import React from 'react';

import NavBar from '../../components/NavBar';
import BookingForm from '../../components/BookingForm';
import ServesDisplay from '../../components/ServesDisplay';

const LandingPage = () => (
  <div>
    <NavBar />
    <ServesDisplay />
    <BookingForm />
  </div>
);

export default LandingPage;
