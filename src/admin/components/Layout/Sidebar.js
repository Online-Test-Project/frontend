import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListUserExam from '../../pages/ListUserExam';

class Sidebar extends Component {
    toggleSidebar() {
        if (window.innerWidth < 768) {
            document.getElementById("sideBar").classList.toggle("default");
            document.getElementById("field-main").classList.toggle("default-main");
        }
        else {
            document.getElementById("sideBar").classList.toggle("active");
            document.getElementById("field-main").classList.toggle("active-main");
        }
    }

    render() {
        return (
            <div className="menu-left" id="sideBar">
                <div className="logo">
                    <h5 className="text-center">MY TEST</h5>
                    <i className="	fa fa-align-justify active" id="menu-icon" onClick={() => this.toggleSidebar()}></i>
                </div>
                <div className="separation"></div>
                <div className="menu-wrapper">
                    <Link to="/admin">
                        <div className="menu-item-wrapper">
                            <i className="fa fa-book format-icon-menu"></i>
                            <div className="menu-item-text">Ngân hàng câu hỏi</div>
                        </div>
                    </Link>
                    <div className="separation"></div>
                    <Link to="admin/exam">
                        <div className="menu-item-wrapper">
                            <i className="fa fa-file-text-o format-icon-menu"></i>
                            <div className="menu-item-text">Đề thi đã tạo</div>
                        </div>
                    </Link>
                    <div className="separation"></div>
                    <Link to="/user/exam">
                        <div className="menu-item-wrapper">
                            <i className="fa fa-edit format-icon-menu"></i>
                            <div className="menu-item-text">Bài thi đã làm</div>
                        </div>
                    </Link>

                    <div className="separation"></div>
                    <div className="menu-item-wrapper">
                        <i className="fa fa-book format-icon-menu"></i>
                        <div className="menu-item-text">Ngân hàng câu hỏi</div>
                    </div>
                    <div className="separation"></div>
                </div>
            </div>
        );
    }
}

export default Sidebar;