import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MainContent from '../Layout/MainContent';
import './Layout.css';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Sidebar>
                </Sidebar>
                <MainContent>
                    {this.props.children}
                </MainContent>
            </React.Fragment>
        );
    }
}

export default Layout;