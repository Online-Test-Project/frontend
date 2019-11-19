import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Routes from './Routes/Routes';
import './App.css';

import { history } from './_helpers/index';
import { authenticationService } from './_services/index';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ currentUser: x }),
    );
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    return (
      <div className="App">
        <Routes></Routes>
      </div>
    );
  }
}

export default App;
