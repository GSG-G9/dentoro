import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Patients from '../components/Patients';
import LoginPage from '../pages/logIn';
import IsAuthContext from '../Context/isAuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const TodaySchedule = () => <h3>Today Schedule</h3>;
const Calender = () => <h3>Calender</h3>;

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  console.log(isAuth);

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
            <Header />
          </Route>
          <Route exact path="/login">
            <LoginPage />
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
                <Redirect to="/404" />
              </Switch>
            </Sidebar>
          </Route>
          <Route>
            <h1>Error 404 Not Found !!</h1>
          </Route>
        </Switch>
      </IsAuthContext.Provider>
    </div>
  );
};

export default App;
