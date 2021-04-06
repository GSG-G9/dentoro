import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/logIn';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
