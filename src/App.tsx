import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch, RouteProps // eslint-disable-line
} from 'react-router-dom';
import './App.css';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import MainDashboard from './containers/MainDashboard/MainDashboard';
// import RoadmapDashboard from './containers/RoadmapDashboard/RoadmapDashboard';
// import Discover from './containers/Discover/Discover';

const defaultProtectedRouteProps: ProtectedRouteProps = {
  isAuthenticated: !!localStorage.getItem('token'),
  authenticationPath: '/login',
};

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <ProtectedRoute
        { ...defaultProtectedRouteProps } // eslint-disable-line
        exact
        path="/dashboard"
        component={MainDashboard}
      />
      {/* <ProtectedRoute path="/roadmap/:id" component={RoadmapDashboard} /> */}
      {/* <ProtectedRoute path="/discover" component={Discover} /> */}
      <Redirect exact from="/" to="/dashboard" />
    </Switch>
  </Router>
);

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export class ProtectedRoute extends Route<ProtectedRouteProps> {
  public render() {
    let redirectPath: string = '';
    if (this.props.isAuthenticated) {
      redirectPath = this.props.authenticationPath;
    }
    if (redirectPath) {
      const renderComponent = () => (<Redirect to={{ pathname: redirectPath }} />);
      return (
        <Route
          {...this.props} // eslint-disable-line
          component={renderComponent}
          render={undefined}
        />
      );
    }
    return <Route {...this.props} />; // eslint-disable-line
  }
}

export default App;
