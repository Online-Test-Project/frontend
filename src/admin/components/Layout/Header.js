import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header row">
                <div className="row justify-content-end header-wrapper-end">
                    <div className="header-item-wrapper">
                        <div className="fa fa-user-circle-o format-icon-menu"></div>
                        <div className="item-text">Nguyễn Thị Ngọc</div>
                    </div>
                    <div className="header-item-wrapper">
                        <div className="fa fa-question-circle format-icon-menu"></div>
                        <div className="item-text">Trợ giúp</div>
                    </div>
                    <div className="header-item-wrapper">
                        <div className="fa fa-phone format-icon-menu"></div>
                        <div className="item-text">Liên hệ</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;