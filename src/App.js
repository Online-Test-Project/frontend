import React from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Routes from './Routes/Routes';
import './App.css';
//////////////////////////
import { history } from './_helpers/index';
import { authenticationService } from './_services/index';
import PrivateRoute from './_components/PrivateRoute';
import HomePage from './admin/pages/HomePage';
import Register from './admin/pages/Register';
import Login from './admin/pages/Login';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    return (
      <div className="App">
        <Routes></Routes>
        <Router>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Router>
      </div>
    );
  }

}

export default App;
