import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

import Patients from '../components/Patients';
import LoginPage from '../pages/logIn';
import Sidebar from '../components/Sidebar';
import Calendar from '../pages/admin/Calendar';

import { PrivateRoutes, LoggedOutRoutes } from './Routes';
import PatientProfile from '../pages/admin/PatientProfile';
import LandingPage from '../pages/LandingPage';

import './App.css';

import PatientsAppointmentTable from '../pages/admin/PatientsAppointmentTable';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <LoggedOutRoutes exact path="/login">
        <LoginPage />
      </LoggedOutRoutes>
      <PrivateRoutes path="/dashboard">
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
      </PrivateRoutes>
      <Route>
        <h1>Error 404 Not Found !!</h1>
      </Route>
      <Redirect to="/404" />
    </Switch>
  </div>
);

export default App;
