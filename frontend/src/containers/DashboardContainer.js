import React, { Component } from 'react';
import { getRepositoriesForAccount } from '../util/RepositoryService';
import { getUserAuthObject, isUserAuthed } from '../util/AuthService'
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import Pagination from '../components/dashboard/Pagination';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import DashboardTable from '../components/dashboard/DashboardTable';

class DashboardContainer extends Component {

    constructor(props) {
        super();

        this.state = {
            repositories: [],
            reposEmpty: false,
            account: isUserAuthed() ? getUserAuthObject().username : 'mvanbrummen'
        };
    }

    getRepositories() {
        getRepositoriesForAccount(this.state.account).then((repos) => {
            this.setState({ repositories: repos })
        });
    }

    componentDidMount() {
        this.getRepositories();
        this.setState({ reposEmpty: this.state.repositories.length === 0 });
    }

    render() {
        const { repositories, reposEmpty, account } = this.state;

        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h3 className="has-text-grey-dark title is-size-5">Repositories</h3>
                        <hr />

                        <DashboardTabs />

                        {!reposEmpty &&
                            <div className="has-text-center">
                                <h1 className="subtitle">
                                    Create a repository to get started
                                </h1>

                            </div>
                        }

                        <DashboardTable repositories={repositories} account={account} />

                        {repositories.length > 0 &&
                            <hr /> &&
                            <Pagination />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardContainer;