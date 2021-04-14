import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoutes, LoggedOutRoutes } from './Routes';
import Sidebar from '../components/Sidebar';
import TodaySchedule from '../pages/TodaySchedule';
import PatientProfile from '../pages/admin/PatientProfile';
import Patients from '../components/Patients';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/logIn';
import './App.css';

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
              <TodaySchedule />
            </Route>
            <Route exact path="/dashboard/calender">
              <h1>Calender</h1>
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
