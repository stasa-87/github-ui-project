import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginPage from "./page/LoginPage";
import DashboardPage from "./page/DashboardPage";
import NotFoundPage from "./page/NotFoundPage";
import Layout from "./layout/Layout";
import PrivateRoute from "./helpers/PrivateRoute";
import {inject, observer} from "mobx-react";
import LayoutAccount from "./layout/LayoutAccount";


@inject("commonStore")
@observer
class App extends Component {

    render() {

        const {commonStore} = this.props;

        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Layout>
                            <LoginPage />
                        </Layout>
                    </Route>
                    <PrivateRoute path="/dashboard" isAuthenticated={commonStore.isAuthenticated} >
                        <LayoutAccount>
                            <DashboardPage />
                        </LayoutAccount>
                    </PrivateRoute>
                    <Route path="*">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;