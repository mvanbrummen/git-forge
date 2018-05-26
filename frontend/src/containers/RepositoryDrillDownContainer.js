import React, { Component } from 'react';

import Breadcrumb from '../components/repository/Breadcrumb';

import { getItemsByPath } from '../util/RepositoryService';
import DirectoryTable from '../components/repository/DirectoryTable';
import BlobView from '../components/repository/BlobView';
import Nav from '../components/Nav';

class RepositoryDrillDownContainer extends Component {

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
        const { userName, repoName } = this.props.match.params;
        const path = this.props.match.params[0];

        this.getItemsByPath(userName, repoName, path)
    }

    render() {
        const { items } = this.state;
        const breadcrumbs = this.props.match.params[0].split("/");

        const { userName, repoName } = this.props.match.params;
        const path = this.props.match.params[0];
        const url = this.props.match.url;

        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <Breadcrumb userName={userName}
                                repoName={repoName}
                                breadcrumbs={breadcrumbs} />

                            <DirectoryTable items={items}
                                url={url} />

                            {this.props.location.state.displayFile &&
                                <BlobView userName={userName} repoName={repoName} path={path} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RepositoryDrillDownContainer;