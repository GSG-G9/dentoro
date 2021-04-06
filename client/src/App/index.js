import React from 'react';
import PatientProfile from '../pages/admin/PatientProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <PatientProfile patientId={1} />
    </div>
  );
}

export default App;
