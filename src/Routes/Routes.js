import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BankPage from '../admin/pages/BankPage';
import ListBankPage from '../admin/pages/ListBankPage';
import ListAdminExam from '../admin/pages/ListAdminExam';
import ListUserExam from '../admin/pages/ListUserExam';
import ExamPage from '../admin/pages/ExamPage';
import PrivateRoute from '../_components/PrivateRoute';
import CreateExamPage from '../admin/pages/CreateExamPage';

const Routes = () => {
    return (
        <Router>
            {/* <Route exact path="/admin">
                <ListBankPage></ListBankPage>
            </Route> */}
            <PrivateRoute exact path="/admin" component={ListBankPage}></PrivateRoute>
            <Route path="/admin/bank/:id" render={(props) => <BankPage {...props}></BankPage>}>
            </Route>
            
            <Route exact path="/user/exam">
                <ListUserExam></ListUserExam>
            </Route>
            <Route exact path="/admin/exam">
                <ListAdminExam></ListAdminExam>
            </Route>
            <Route path="/admin/exam/create">
                <CreateExamPage></CreateExamPage>
            </Route>
            <Route exact path="/doexam">
                <ExamPage></ExamPage>
            </Route>
        </Router>
    );
}

export default Routes;