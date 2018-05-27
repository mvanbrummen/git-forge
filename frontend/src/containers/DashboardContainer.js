import React, { Component } from 'react';
import { getRepositoriesForAccount } from '../util/RepositoryService';
import { getUserAuthObject, isUserAuthed } from '../util/AuthService'
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import Pagination from '../components/dashboard/Pagination';
import DashboardTabs from '../components/dashboard/DashboardTabs';
import DashboardTable from '../components/dashboard/DashboardTable';
import { Nav } from '../components/Nav';
import { logout } from '../actions/UserActions'
import { connect } from 'react-redux';

class DashboardContainer extends Component {

    state = {
        repositories: [],
        reposEmpty: false,
        account: isUserAuthed() ? getUserAuthObject().username : 'mvanbrummen'
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

    handleLogout = (e) => {
        alert('logout!');

        this.props.dispatch(logout());
    }

    render() {
        const { repositories, reposEmpty, account } = this.state;

        return (
            <div>
                <Nav user={this.props.user} logout={this.handleLogout} />
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

const connectedDashboardContainer = connect(mapStateToProps)(DashboardContainer);
export { connectedDashboardContainer as DashboardContainer };

