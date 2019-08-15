import React from 'react';
import './App.css';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import MainDashboard from './containers/MainDashboard/MainDashboard';

const App: React.FC = () => (
  <div>
    <Signup />
    <Login />
    <MainDashboard />
  </div>
);

export default App;
