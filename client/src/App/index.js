import { Switch, Route, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Patients from '../components/Patients';
import LoginPage from '../pages/logIn';
import IsAuthContext from '../Context/isAuthContext';
import Sidebar from '../components/Sidebar';
import Calendar from '../pages/admin/Calendar';
import PatientProfile from '../pages/admin/PatientProfile';
import LandingPage from '../pages/LandingPage';

import './App.css';

import PatientsAppointmentTable from '../pages/admin/PatientsAppointmentTable';

const App = () => {
  const [, setIsAuth] = useState(false);

  const checkAuth = async () => {
    try {
      await axios('/api/v1/is-auth');
      setIsAuth(true);
    } catch ({ response }) {
      setIsAuth(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <IsAuthContext.Provider value={{ setIsAuth }}>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <Sidebar>
              <Switch>
                <Route exact path="/dashboard">
                  <PatientsAppointmentTable
                    showSearchBar={false}
                    pageTitle="Today's Schedule"
                  />
                </Route>
                <Route exact path="/dashboard/calendar">
                  <Calendar />
                </Route>
                <Route exact path="/dashboard/calendar/appointmentsearch">
                  <PatientsAppointmentTable pageTitle="Patients Appointment Table" />
                </Route>
                <Route exact path="/dashboard/calendar/:appointmentDate">
                  <PatientsAppointmentTable pageTitle="Patients Appointment Table" />
                </Route>
                <Route exact path="/dashboard/patients">
                  <Patients />
                </Route>
                <Route exact path="/dashboard/patients/:patientId">
                  <PatientProfile />
                </Route>
                <Redirect to="/404" />
              </Switch>
            </Sidebar>
          </Route>
          <Route>
            <h1>Error 404 Not Found !!</h1>
          </Route>
          <Redirect to="/404" />
        </Switch>
      </IsAuthContext.Provider>
    </div>
  );
};

export default App;
