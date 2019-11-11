import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import BankTable from '../components/BankTable/BankTable';

class BankPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <BankTable id={this.props.match.params.id}/>
            </Layout>
        );
    }
}

export default BankPage;