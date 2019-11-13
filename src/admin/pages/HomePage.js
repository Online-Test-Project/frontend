import React from 'react';
import Layout from '../components/Layout/Layout';

import { authenticationService } from '../../_services/index';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue
        };
    }

    render() {
        return (
            <Layout>
                <div>
                    <h1>Hi {this.state.currentUser.username}!</h1>
                    <p>You're logged in with React & JWT!!</p>
                    <h3>Users from secure api end point:</h3>
                </div>
            </Layout>

        );
    }
}

export default HomePage;