import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { history } from '../_helpers/index';
import ListBankPage from '../admin/pages/ListBankPage';
import ListAdminExam from '../admin/pages/ListAdminExam';
import ListUserExam from '../admin/pages/ListUserExam';
import PrivateRoute from '../_components/PrivateRoute';
import DoingExam from '../admin/pages/DoingExam';
import HomePage from '../admin/pages/HomePage';
import Register from '../admin/pages/Register';
import Login from '../admin/pages/Login';
import BankPage from '../admin/pages/BankPage';
import ViewExamAdmin from '../admin/pages/ViewExamAdmin';
import PreviewExam from '../admin/pages/PreviewExam';
import CreateExamPage from '../admin/pages/CreateExamPage';
import StatisticsPageAdmin from '../admin/pages/StatisticsPageAdmin';

const Routes = () => {
  return (
    <Router history={history}>
      <PrivateRoute exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/bank" component={ListBankPage}></PrivateRoute>
      <PrivateRoute exact path="/bank/:id" component={BankPage}></PrivateRoute>

      <PrivateRoute
        exact1
        path="/created-exam"
        component={ListAdminExam}
      ></PrivateRoute>

      <PrivateRoute
        exact
        path="/created-exam/:id"
        component={ViewExamAdmin}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/created-exam/:id/statistics"
        component={StatisticsPageAdmin}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/create-exam"
        component={CreateExamPage}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/done-exam"
        component={ListUserExam}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/done-exam/:id"
        component={PreviewExam}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/do-exam/:id"
        component={DoingExam}
      ></PrivateRoute>

    </Router>
  );
};

export default Routes;
