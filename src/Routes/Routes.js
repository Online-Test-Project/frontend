import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BankPage from '../admin/pages/BankPage';
import ListBankPage from '../admin/pages/ListBankPage';
import ListAdminExam from '../admin/pages/ListAdminExam';
import ListUserExam from '../admin/pages/ListUserExam';
import ExamPage from '../admin/pages/ExamPage';
import PrivateRoute from '../_components/PrivateRoute';
import CreateExamPage from '../admin/pages/CreateExamPage';
import ViewAdminExam from '../admin/pages/ViewExamAdmin';
import DoingExam from '../admin/pages/DoingExam';
import PreviewExam from '../admin/pages/PreviewExam';

const Routes = () => {
    return (
        <Router>
            {/* <Route exact path="/admin">
                <ListBankPage></ListBankPage>
            </Route> */}
            <PrivateRoute exact path="/admin" component={ListBankPage}>
            </PrivateRoute>
            <PrivateRoute path="/admin/bank/:id" component={BankPage}>
            </PrivateRoute>
            
            <Route exact path="/user/exam">
                <ListUserExam></ListUserExam>
            </Route>
            <Route exact path="/admin/exam">
                <ListAdminExam></ListAdminExam>
            </Route>
            <Route path="/admin/exam/create">
                <CreateExamPage></CreateExamPage>
            </Route>
            <PrivateRoute path="/doexam" component={ExamPage}>
            </PrivateRoute>
            <PrivateRoute exact path="/view-exam/:id" component={ViewAdminExam}>
            </PrivateRoute>
            <PrivateRoute exact path="/before-exam/:id" component={DoingExam}>
                
            </PrivateRoute>
            <PrivateRoute exact path="/preview-exam/:id" component={PreviewExam}>
            </PrivateRoute>
        </Router>
    );
}

export default Routes;