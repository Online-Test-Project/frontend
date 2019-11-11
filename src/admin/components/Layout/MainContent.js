import React, { Component } from 'react';
import Header from '../Layout/Header';
class MainContent extends Component {
    render() {
        return (
            <div className="main-content" id="field-main">
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

export default MainContent;