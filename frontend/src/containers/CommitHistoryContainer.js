import React, { Component } from 'react';

import { getAllCommitsByRef } from '../util/RepositoryService';
import CommitHistory from '../components/commits/CommitHistory';
import BranchDropdown from '../components/repository/BranchDropdown';

// hardcode for now
const ref = 'master';

class CommitHistoryContainer extends Component {

    state = {
        commits: []
    }

    getAllCommitsByRef(userName, repoName, ref) {
        getAllCommitsByRef(userName, repoName, ref).then((commits) => {
            this.setState({
                commits: commits
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
                        <div className="level">
                            <div className="level-left">
                                <BranchDropdown branches={[{ name: 'master', refId: 'ref/heads/master' }]} />
                            </div>
                        </div>
                        <CommitHistory commits={this.state.commits} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CommitHistoryContainer;