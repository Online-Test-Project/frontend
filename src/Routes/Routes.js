import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BankPage from '../admin/pages/BankPage';
import ListBankPage from '../admin/pages/ListBankPage';
import ListAdminExam from '../admin/pages/ListAdminExam';
import ListUserExam from '../admin/pages/ListUserExam';
import ExamPage from '../admin/pages/ExamPage';
const Routes = () => {
    return (
        <Router>
            <Route exact path="/admin">
                <ListBankPage></ListBankPage>
            </Route>
            <Route path="/admin/bank/:id" render={(props) => <BankPage {...props}></BankPage>}>
            </Route>
            <Route exact path="/user/exam">
                <ListUserExam></ListUserExam>
            </Route>
            <Route exact path="/admin/exam">
                <ListAdminExam></ListAdminExam>
            </Route>
            <Route exact path="/">
                <ExamPage></ExamPage>
            </Route>
        </Router>
    );
}

export default Routes;