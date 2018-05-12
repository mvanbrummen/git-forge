import React, { Component } from 'react';
import { getRepositoriesForAccount } from '../util/RepositoryService';
import { getUserAuthObject, isUserAuthed } from '../util/AuthService'
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

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
        const { repositories, reposEmpty } = this.state;

        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="tabs is-boxed">
                            <ul>
                                <li className="is-active"><a>All</a></li>
                                <li><a>Personal</a></li>
                            </ul>
                        </div>

                        {!reposEmpty &&
                            <div className="has-text-center">
                                <h1 className="subtitle">
                                    Create a repository to get started
                                </h1>

                            </div>
                        }

                        <table className="table is-fullwidth">
                            <tbody>


                                {repositories.map((p, i) =>

                                    <tr key={i}>
                                        <td>
                                            <i className="fa fa-book"></i>
                                            <Link to={"/repos/" + this.state.account + "/" + p.name} > <strong>{this.state.account + ' / ' + p.name}</strong></Link> <span class="tag is-light">master</span>
                                            <p className="has-text-grey-dark is-size-6">{p.description}</p>
                                        </td>
                                        <td className="has-text-right"><i class="fa fa-star"></i> <span className="is-size-7">899    </span>    <i class="fa fa-globe"></i><p className="has-text-grey-dark is-size-7">modified today</p></td>
                                    </tr>

                                )}


                            </tbody>
                        </table>



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

export default Dashboard;