import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Sidebar from '../components/Sidebar';

const TodaySchedule = () => <h3>Today Schedule</h3>;
const Patients = () => <h3>Patients</h3>;
const Calender = () => <h3>Calender</h3>;

const options = [<TodaySchedule />, <Patients />, <Calender />];

const App = () => (
  <Switch>
    <Route exact path="/">
      Home
    </Route>
    <Route exact path="/dashboard">
      <Sidebar contentComponents={options} />;
    </Route>
    <Route>
      <h1>Error 404 Not Found !!</h1>
    </Route>
  </Switch>
);

export default App;
