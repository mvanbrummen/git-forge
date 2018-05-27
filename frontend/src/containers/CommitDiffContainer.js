import React, { Component } from 'react';
import { getCommitDiffs, getRefs } from '../util/RepositoryService';

import CommitDiff from '../components/commits/CommitDiff';
import Breadcrumb from '../components/repository/Breadcrumb';
import BranchDropdown from '../components/repository/BranchDropdown';
import { Nav } from '../components/Nav';

class CommitDiffContainer extends Component {
    state = {
        commitDiffs: [],
        refs: []
    }

    getCommitDiffs(userName, repoName, oldSha, newSha) {
        getCommitDiffs(userName, repoName, oldSha, newSha).then((diffs) =>
            this.setState({
                commitDiffs: diffs
            })
        )
    }

    getRefs(userName, repoName) {
        getRefs(userName, repoName).then((refs) => {
            this.setState({
                refs: refs
            })
        });
    }

    componentDidMount() {
        const { userName, repoName, oldSha, newSha } = this.props.match.params;
        this.getCommitDiffs(userName, repoName, oldSha, newSha);
        this.getRefs(userName, repoName);
    }

    render() {
        const { newSha } = this.props.match.params;
        const { refs, commitDiffs } = this.state;

        return (
            <div>
                <Nav />
                <div className="container" >
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <Breadcrumb userName={this.props.match.params.userName}
                                repoName={this.props.match.params.repoName}
                                breadcrumbs={['commits', newSha.substring(0, 8)]} />
                            <hr />

                            <div className="level">
                                <div className="level-left">
                                    <BranchDropdown
                                        branches={refs.branches}
                                        tags={refs.tags}
                                        currentBranch={'master'} />
                                </div>
                            </div>
                            <CommitDiff commitDiffs={commitDiffs} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommitDiffContainer;