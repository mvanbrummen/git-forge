import React, { Component } from 'react';

import Breadcrumb from '../components/repository/Breadcrumb';
import { getAllCommitsByRef } from '../util/RepositoryService';
import CommitHistory from '../components/commits/CommitHistory';
import BranchDropdown from '../components/repository/BranchDropdown';

// hardcode for now
const ref = 'master';

class CommitHistoryContainer extends Component {

    state = {
        initialCommits: [],
        commits: []
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

    componentDidMount() {
        this.getAllCommitsByRef(this.props.match.params.userName, this.props.match.params.repoName, ref);
    }

    render() {
        return (
            <div className="container" >
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <Breadcrumb userName={this.props.match.params.userName}
                            repoName={this.props.match.params.repoName}
                            breadcrumbs={['commits']} />
                        <hr />

                        <div className="level">
                            <div className="level-left">
                                <BranchDropdown branches={[{ name: 'master', refId: 'ref/heads/master' }]} />
                                <input className="input"
                                    type="text"
                                    placeholder="Filter by message..."
                                    onChange={this.filterCommits} />
                            </div>
                        </div>
                        <CommitHistory commits={this.state.commits} url={this.props.location.pathname} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CommitHistoryContainer;