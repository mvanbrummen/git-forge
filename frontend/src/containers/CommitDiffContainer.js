import React, { Component } from 'react';
import { getCommitDiffs } from '../util/RepositoryService';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

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
        return (
            <div className="container" >
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        {
                            this.state.commitDiffs.map((diff, i) =>
                                <div key={i}>
                                    <h1>{diff.newPath}</h1>
                                    <SyntaxHighlighter showLineNumbers={false} language='javascript' style={docco}>{diff.diff}</SyntaxHighlighter>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CommitDiffContainer;