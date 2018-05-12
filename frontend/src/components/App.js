import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import Nav from './Nav';

import { Route, Switch } from 'react-router-dom';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import CreateRepository from './repository/CreateRepository';
import RepositoryDrillDown from './repository/RepositoryDrillDown';
import DashboardContainer from '../containers/DashboardContainer';
import LoginContainer from '../containers/LoginContainer';
import SignupContainer from '../containers/SignupContainer';
import RepositoryContainer from '../containers/RepositoryContainer';

class App extends Component {
    constructor() {
        super();

        loadProgressBar({ showSpinner: false });
    }

    render() {
        return (
            <div>
                <Nav />

                <Switch>
                    <Route exact path="/" component={DashboardContainer} />
                    <Route exact path="/login" component={LoginContainer} />
                    <Route exact path="/signup" component={SignupContainer} />
                    <Route exact path="/repos/new" component={CreateRepository} />

                    <Route exact path="/repos/:userName/:repoName" component={RepositoryContainer} />
                    <Route path="/repos/:userName/:repoName/blob/**" component={RepositoryDrillDown} />
                </Switch>

            </div>
        )
    }
}

export default App;