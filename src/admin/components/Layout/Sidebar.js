import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import logoPencilWhite from '../../../images/logoPencilWhite.png';

class Sidebar extends Component {
  toggleSidebar() {
    if (window.innerWidth < 768) {
      document.getElementById('sideBar').classList.toggle('default');
      document.getElementById('field-main').classList.toggle('default-main');
    } else {
      document.getElementById('sideBar').classList.toggle('active');
      document.getElementById('field-main').classList.toggle('active-main');
    }
  }

  render() {
    return (
        <div className="menu-left" id="sideBar">
          <div className="logo">
            <Link to="/">
              <img src={logoPencilWhite} style={{width: "120px", paddingLeft: "1rem"}} alt="logo"/>
            </Link>

            <i
              className="	fa fa-align-justify active"
              id="menu-icon"
              onClick={() => this.toggleSidebar()}
            ></i>
          </div>
          <div className="separation"></div>
          <div className="menu-wrapper">
            <Link to="/bank">
              <div className="menu-item-wrapper">
                <i className="fa fa-book format-icon-menu"></i>
                <div className="menu-item-text">Ngân hàng câu hỏi</div>
              </div>
            </Link>
            <div className="separation"></div>
            <Link to="/created-exam">
              <div className="menu-item-wrapper">
                <i className="fa fa-file-text-o format-icon-menu"></i>
                <div className="menu-item-text">Đề thi đã tạo</div>
              </div>
            </Link>
            <div className="separation"></div>
            <Link to="/done-exam">
              <div className="menu-item-wrapper">
                <i className="fa fa-edit format-icon-menu"></i>
                <div className="menu-item-text">Bài thi đã làm</div>
              </div>
            </Link>
          </div>
        </div>
    );
  }
}

export default Sidebar;
