import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getItemsByPath } from '../util/RepositoryService';

class RepositoryDrillDown extends Component {

    constructor(props) {
        super();

        this.state = {
            items: []
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
        this.getItemsByPath(this.props.match.params.userName, this.props.match.params.repoName, this.props.match.params[0])
    }

    render() {
        const { items } = this.state;

        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <nav className="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <li><i class="fa fa-book"></i><Link to="/"><strong>&nbsp;{this.props.match.params.userName}</strong></Link></li>
                                <li><a href="#"><strong>{this.props.match.params.repoName}</strong></a></li>
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
                                                <Link to={this.props.match.url + '/' + f.path}> {f.path}</Link>
                                            </td>
                                            <td>init commit</td>
                                            <td className="has-text-right is-size-7">2 years ago</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

export default RepositoryDrillDown;