import React, { useState, useMemo } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/logIn';
import IsAuthContext from '../components/context/isAuthContext';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth, setIsAuth]);

  return (
    <div className="App">
      <header className="App-header">
        <IsAuthContext.Provider value={value}>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </IsAuthContext.Provider>
      </header>
    </div>
  );
}

export default App;
