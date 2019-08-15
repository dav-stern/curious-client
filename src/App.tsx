import React from 'react';
import './App.css';
import Login from './containers/Login/Login';
import MainDashboard from './containers/MainDashboard/MainDashboard';

const App: React.FC = () => (
  <div>
    <Login />
    <MainDashboard />
  </div>
);

export default App;
