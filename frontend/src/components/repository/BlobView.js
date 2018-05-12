import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import { getBlobContentsByPath } from '../../util/RepositoryService';

class BlobView extends Component {

    constructor(props) {
        super();

        this.state = {
            displayFileContents: ''
        }
    }

    componentDidMount() {
        const { userName, repoName, path } = this.props;
        getBlobContentsByPath(userName, repoName, path).then(contents =>
            this.setState({
                displayFileContents: contents
            })
        )
    }

    render() {
        return (
            <table className="table is-fullwidth is-bordered">
                <thead>
                    <tr>
                        <th>
                            <i class="fa fa-book"></i> {this.props.path}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="code-td">
                            <div className="content">
                                <SyntaxHighlighter showLineNumbers={true} language='javascript' style={docco}>{this.state.displayFileContents}</SyntaxHighlighter>
                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>
        )
    }
}

export default BlobView;