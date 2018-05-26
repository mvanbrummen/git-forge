import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

import { Route, Switch } from 'react-router-dom';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import DashboardContainer from '../containers/DashboardContainer';
import LoginContainer from '../containers/LoginContainer';
import SignupContainer from '../containers/SignupContainer';
import RepositoryContainer from '../containers/RepositoryContainer';
import CreateRepositoryContainer from '../containers/CreateRepositoryContainer';
import RepositoryDrillDownContainer from '../containers/RepositoryDrillDownContainer';
import CommitHistoryContainer from '../containers/CommitHistoryContainer';
import CommitDiffContainer from '../containers/CommitDiffContainer';
import BranchContainer from '../containers/BranchContainer';
import BranchCreateContainer from '../containers/BranchCreateContainer';
import HomeContainer from '../containers/HomeContainer';

class App extends Component {
    constructor() {
        super();

        loadProgressBar({ showSpinner: false });
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/home" component={HomeContainer} />
                    <Route exact path="/" component={DashboardContainer} />
                    <Route exact path="/login" component={LoginContainer} />
                    <Route exact path="/signup" component={SignupContainer} />
                    <Route exact path="/repos/new" component={CreateRepositoryContainer} />

                    <Route exact path="/repos/:userName/:repoName" component={RepositoryContainer} />
                    <Route path="/repos/:userName/:repoName/blob/**" component={RepositoryDrillDownContainer} />
                    <Route path="/repos/:userName/:repoName/commits/diff/:oldSha/:newSha" component={CommitDiffContainer} />
                    <Route path="/repos/:userName/:repoName/commits" component={CommitHistoryContainer} />
                    <Route path="/repos/:userName/:repoName/branches/new" component={BranchCreateContainer} />
                    <Route path="/repos/:userName/:repoName/branches" component={BranchContainer} />
                </Switch>

            </div>
        )
    }
}

export default App;