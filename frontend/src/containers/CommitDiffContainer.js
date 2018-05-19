import React, { Component } from 'react';
import { getCommitDiffs } from '../util/RepositoryService';

import CommitDiff from '../components/commits/CommitDiff';
import Breadcrumb from '../components/repository/Breadcrumb';
import BranchDropdown from '../components/repository/BranchDropdown';

class CommitDiffContainer extends Component {
    state = {
        commitDiffs: []
    }

    getCommitDiffs(userName, repoName, oldSha, newSha) {
        getCommitDiffs(userName, repoName, oldSha, newSha).then((diffs) =>
            this.setState({
                commitDiffs: diffs
            })
        )
    }

    componentDidMount() {
        const { userName, repoName, oldSha, newSha } = this.props.match.params;
        this.getCommitDiffs(userName, repoName, oldSha, newSha);
    }

    render() {
        const { newSha } = this.props.match.params;
        return (
            <div className="container" >
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <Breadcrumb userName={this.props.match.params.userName}
                            repoName={this.props.match.params.repoName}
                            breadcrumbs={['commits', newSha.substring(0, 8)]} />
                        <hr />

                        <div className="level">
                            <div className="level-left">
                                <BranchDropdown branches={[{ name: 'master', refId: 'ref/heads/master' }]}
                                    tags={[]} currentBranch={'master'} />
                            </div>
                        </div>
                        <CommitDiff commitDiffs={this.state.commitDiffs} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CommitDiffContainer;