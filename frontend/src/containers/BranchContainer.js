import React, { Component } from 'react';
import { getRefs } from '../util/RepositoryService';
import Breadcrumb from '../components/repository/Breadcrumb';
import BranchesTable from '../components/branches/BranchesTable';

class BranchContainer extends Component {

    state = {
        branches: [],
        initialBranches: []
    }

    getRefs(userName, repoName) {
        getRefs(userName, repoName).then((refs) => {
            this.setState({
                branches: refs.branches,
                initialBranches: refs.branches
            })
        });
    }

    filterBranches = (e) => {
        let updatedBranches = this.state.initialBranches;
        updatedBranches = updatedBranches.filter((b) =>
            b.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        )

        this.setState({
            branches: updatedBranches
        });
    }

    componentDidMount() {
        const { userName, repoName } = this.props.match.params;
        this.getRefs(userName, repoName);
    }

    render() {
        const { branches } = this.state;
        return (
            <div className="container" >
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <Breadcrumb userName={this.props.match.params.userName}
                            repoName={this.props.match.params.repoName}
                            breadcrumbs={['branches']} />
                        <hr />

                        <div className="level">
                            <div className="level-left">
                                <input className="input"
                                    type="text"
                                    placeholder="Filter by name..."
                                    onChange={this.filterBranches}
                                />
                            </div>
                            <div className="level-right">
                                <input className="is-success button"
                                    value="New Branch"
                                    type="button" />
                            </div>
                        </div>

                        <BranchesTable branches={branches} />
                    </div>
                </div>
            </div>
        )
    }
}

export default BranchContainer;