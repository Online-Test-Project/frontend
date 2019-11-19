import React, { Component } from 'react';
import { authenticationService } from '../../../_services/authentication.service';
import { history } from '../../../_helpers/index';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: authenticationService.currentUserValue,
    };
  }

  onLogout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    return (
      <div className="header row">
        <div className="row justify-content-end header-wrapper-end">
          <div className="header-item-wrapper">
            <div className="fa fa-user-circle-o format-icon-menu"></div>
            <div className="item-text">{this.state.currentUser.username}</div>
          </div>
          <div className="header-item-wrapper">
            <div className="fa fa-question-circle format-icon-menu"></div>
            <div className="item-text">Trợ giúp</div>
          </div>
          <div className="header-item-wrapper">
            <div className="fa fa-phone format-icon-menu"></div>
            <div className="item-text">Liên hệ</div>
          </div>
          <div className="header-item-wrapper" onClick={() => this.onLogout()}>
            <div className="fa fa-sign-out format-icon-menu"></div>
            <div className="item-text">Đăng xuất</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
