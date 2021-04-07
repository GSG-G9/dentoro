import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css';

import Sidebar from '../components/Sidebar';

import PatientProfile from '../pages/admin/PatientProfile';

const TodaySchedule = () => <h3>Today Schedule</h3>;
const Patients = () => (
  <h3>
    <Link to="/dashboard/patients/1">Go To Patient 1</Link> Patients
  </h3>
);
const Calender = () => <h3>Calender</h3>;

const App = () => (
  <Switch>
    <Route exact path="/">
      Home
    </Route>
    <Route path="/dashboard">
      <Sidebar>
        <Switch>
          <Route exact path="/dashboard">
            <TodaySchedule />
          </Route>
          <Route exact path="/dashboard/calender">
            <Calender />
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
  </Switch>
);

export default App;
