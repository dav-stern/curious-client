import React from 'react';
import './App.css';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';

const App: React.FC = () => (
  <div>
    <Signup />
    <Login />
  </div>
);

export default App;
