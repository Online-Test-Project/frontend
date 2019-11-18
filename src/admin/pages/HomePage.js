import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import './HomePage.css';

import { authenticationService } from '../../_services/index';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: authenticationService.currentUserValue,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar></Sidebar>
        <div className="main-content bg-img" id="field-main">
          <Header />
          <div>
            <h1>LÀM BÀI NGAY</h1>
            <br />
            <h4> Nhập mã đề thi</h4>
            <br />
            <div className="row">
              <div className="col-4" />
              <div className="form-group col-4">
                <label htmlFor="inputPassword2" className="sr-only">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="Mã đề thi"
                />
              </div>
              <div className="col-4" />
            </div>
            <button className="btn btn-primary mb-2"> Xác nhận </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
