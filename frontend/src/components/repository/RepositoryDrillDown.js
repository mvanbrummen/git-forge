import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

import { getItemsByPath, getBlobContentsByPath } from '../../util/RepositoryService';

class RepositoryDrillDown extends Component {

    constructor(props) {
        super(props);

        if (this.props.location.state === undefined) {
            this.props.location.state = { displayFile: false };
        }

        this.state = {
            items: [],
            displayFileContents: ''
        }
    }

    getItemsByPath(account, repoName, path) {
        getItemsByPath(account, repoName, path).then(items =>
            this.setState({
                items: items
            })
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.url !== this.props.match.url) {
            this.getItemsByPath(nextProps.match.params.userName, nextProps.match.params.repoName, nextProps.match.params[0])
        }
    }

    componentDidMount() {
        const userName = this.props.match.params.userName;
        const repoName = this.props.match.params.repoName;
        const path = this.props.match.params[0];

        this.getItemsByPath(userName, repoName, path)
    }

    render() {
        const { items } = this.state;
        const breadcrumbs = this.props.match.params[0].split("/");

        const userName = this.props.match.params.userName;
        const repoName = this.props.match.params.repoName;
        const path = this.props.match.params[0];

        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <nav className="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <li><i class="fa fa-book"></i><Link to="/"><strong>&nbsp;{this.props.match.params.userName}</strong></Link></li>
                                <li><Link to={"/repos/" + this.props.match.params.userName + "/" + this.props.match.params.repoName}><strong>{this.props.match.params.repoName}</strong></Link></li>

                                {
                                    breadcrumbs.map((breadcrumb, i) =>
                                        <li key={i}><Link to={"/repos/" + this.props.match.params.userName + "/" + this.props.match.params.repoName}><strong>{breadcrumb}</strong></Link></li>
                                    )
                                }
                            </ul>
                        </nav>



                        <table className="table is-fullwidth">

                            <thead>
                                <tr>
                                    <th>
                                        <p className="has-text-grey">Last commit</p>
                                    </th>
                                    <th></th>
                                    <th></th>
                                </tr>

                            </thead>


                            <tbody>
                                {
                                    items.map((f, i) =>
                                        <tr key={i}>
                                            <td>
                                                <i class={f.isDir ? "fa fa-folder" : "fa fa-file-code-o"}></i>
                                                <Link to={{ pathname: this.props.match.url + '/' + f.path, state: { displayFile: !f.isDir } }}> {f.path}</Link>
                                            </td>
                                            <td>init commit</td>
                                            <td className="has-text-right is-size-7">2 years ago</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>


                        {this.props.location.state.displayFile &&
                            <BlobView userName={userName} repoName={repoName} path={path} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

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

export default RepositoryDrillDown;