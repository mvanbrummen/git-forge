import React, { Component } from 'react';

import Breadcrumb from '../components/repository/Breadcrumb';
import { getAllCommitsByRef, getRefs } from '../util/RepositoryService';
import CommitHistory from '../components/commits/CommitHistory';
import BranchDropdown from '../components/repository/BranchDropdown';
import Nav from '../components/Nav';

// hardcode for now
const ref = 'master';

class CommitHistoryContainer extends Component {

    state = {
        initialCommits: [],
        commits: [],
        refs: []
    }

    filterCommits = (e) => {
        let updatedCommits = this.state.initialCommits;
        updatedCommits = updatedCommits.filter((commit) =>
            commit.message.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        )

        this.setState({
            commits: updatedCommits
        });
    }

    getAllCommitsByRef(userName, repoName, ref) {
        getAllCommitsByRef(userName, repoName, ref).then((commits) => {
            this.setState({
                commits: commits,
                initialCommits: commits
            })
        });
    }

    getRefs(userName, repoName) {
        getRefs(userName, repoName).then((refs) => {
            this.setState({
                refs: refs
            })
        });
    }

    componentDidMount() {
        const { userName, repoName } = this.props.match.params;
        this.getAllCommitsByRef(userName, repoName, ref);
        this.getRefs(userName, repoName);
    }

    render() {
        const { refs, commits } = this.state;

        return (
            <div>
                <Nav />
                <div className="container" >
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <Breadcrumb userName={this.props.match.params.userName}
                                repoName={this.props.match.params.repoName}
                                breadcrumbs={['commits']} />
                            <hr />

                            <div className="level">
                                <div className="level-left">
                                    <BranchDropdown
                                        branches={refs.branches}
                                        tags={refs.tags} currentBranch={'master'} />
                                    <input className="input"
                                        type="text"
                                        placeholder="Filter by message..."
                                        onChange={this.filterCommits} />
                                </div>
                            </div>
                            <CommitHistory commits={commits} url={this.props.location.pathname} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommitHistoryContainer;