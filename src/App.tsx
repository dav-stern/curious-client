import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import MainDashboard from './containers/MainDashboard/MainDashboard';

const App: React.FC = () => (
  <Router>
    <Route exact path="/login" component={Login} />
    <Route path="/dashboard" component={MainDashboard} />
    <Route path="/signup" component={Signup} />
  </Router>
);

export default App;
