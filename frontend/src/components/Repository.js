import React, { Component } from "react";
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import { getRepositorySummary } from '../util/RepositoryService';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

class Repository extends Component {
    constructor(props) {
        super();

        this.state = {
            repoSummary: {
                totalCommits: null,
                lastCommit: [],
                branches: [],
                items: [],
                readme: null
            }
        }
    }

    getRepositorySummary(account, repoName) {
        getRepositorySummary(account, repoName).then((summary) => {
            this.setState({ repoSummary: summary })
        });
    }

    componentDidMount() {
        this.getRepositorySummary(this.props.match.params.userName, this.props.match.params.repoName);
    }

    render() {
        const { repoSummary } = this.state;

        return (
            <div className="container">

                <div className="columns">
                    <div className="column is-10 is-offset-1">

                        <div className="columns">
                            <div className="column">

                                <nav className="breadcrumb" aria-label="breadcrumbs">
                                    <ul>
                                        <li><i class="fa fa-book"></i><Link to="/"><strong>&nbsp;{this.props.match.params.userName}</strong></Link></li>
                                        <li><a href="#"><strong>{this.props.match.params.repoName}</strong></a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="column">
                                <div className="level">
                                    <div className="level-item">
                                        <div className="field has-addons">
                                            <p className="control">
                                                <button className="button">
                                                    <i className="fa fa-star"></i>
                                                </button>
                                            </p>
                                            <p className="control">
                                                <input className="input" type="text" value="890" readonly />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="level-item">
                                        <div className="field has-addons">
                                            <p className="control">
                                                <button className="button">
                                                    <i className="fa fa-code-fork"></i>
                                                </button>
                                            </p>
                                            <p className="control">
                                                <input className="input" type="text" value="2" readonly />
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>


                        <div className="tabs is-boxed">
                            <ul>
                                <li className="is-active">
                                    <a>
                                        <span className="icon is-small"><i class="fa fa-code"></i></span>
                                        <span>Code</span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <span className="icon is-small"><i class="fa fa-exclamation-triangle"></i></span>
                                        <span>Issues</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="notification">
                            <h4 className="subtitle is-size-6">
                                A quick and easy online tool to validate JSON against an Avro schema. Built in Akka HTTP and ReactJS.
                    </h4>
                        </div>

                        {repoSummary.isClean &&
                            <div>
                                <h3 className="has-text-grey-dark title is-size-4">Get started</h3>
                                <hr />


                                <div>
                                    <h5 className="has-text-grey title is-size-6">Global Configuration</h5>
                                    <pre>
                                        <code>
                                            <p>git config --global user.name "Michael Van Brummen"</p>
                                            <p>git config --global user.email "michaelvanbrummen@gmail.com"</p>
                                        </code>
                                    </pre>
                                </div>
                                <hr />

                                <div>
                                    <h5 className="has-text-grey title is-size-6">New Repository</h5>
                                    <pre>
                                        <code>
                                            <p>git clone git@gitlab.com:mvanbrummen/test.git</p>
                                            <p>cd test</p>
                                            <p>touch README.md</p>
                                            <p>git add README.md</p>
                                            <p>git commit -m "add README"</p>
                                            <p>git push -u origin master</p>
                                        </code>
                                    </pre>
                                </div>
                                <hr />
                                <div>
                                    <h5 className="has-text-grey title is-size-6">Existing Folder</h5>
                                    <pre>
                                        <code>
                                            <p>cd existing_folder</p>
                                            <p>git init</p>
                                            <p>git remote add origin git@gitlab.com:mvanbrummen/test.git</p>
                                            <p>git add .</p>
                                            <p>git commit -m "Initial commit"</p>
                                            <p>git push -u origin master</p>
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        }

                        {!repoSummary.isClean &&

                            <div>
                                <div className="box" style={{ padding: '0.5rem' }}>
                                    <nav class="level">
                                        <div class="level-item has-text-centered">
                                            <div>
                                                <p class="heading"><i class="fa fa-clock-o" aria-hidden="true"></i> Commits {repoSummary.totalCommits}</p>
                                            </div>
                                        </div>
                                        <div class="level-item has-text-centered">
                                            <div>
                                                <p class="heading"><i class="fa fa-code-fork" aria-hidden="true"></i> Branches {repoSummary.branches.length}</p>
                                            </div>
                                        </div>
                                        <div class="level-item has-text-centered">
                                            <div>
                                                <p class="heading"><i class="fa fa-users" aria-hidden="true"></i> Contributors 34</p>
                                            </div>
                                        </div>
                                        <div class="level-item has-text-centered">
                                            <div>
                                                <p class="heading"><i class="fa fa-balance-scale" aria-hidden="true"></i> License MIT</p>
                                            </div>
                                        </div>

                                    </nav>

                                </div>

                                <nav className="level">
                                    <div className="level-left">

                                        <div className="level-item">

                                            <div className="field">
                                                <p className="control has-icons-left">
                                                    <div className="select">
                                                        <select>
                                                            {
                                                                repoSummary.branches.map(b =>
                                                                    <option key={b.refId}>{b.name}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <span class="icon is-small is-left">
                                                        <i class="fa fa-code-fork"></i>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>


                                    </div>


                                    <div className="level-right">
                                        <div className="level-item">
                                            <div className="field has-addons">
                                                <p className="control">
                                                    <div className="select">
                                                        <select>
                                                            <option>HTTPS</option>
                                                            <option>SSH</option>
                                                        </select>
                                                    </div>
                                                </p>
                                                <p className="control">
                                                    <input className="input" type="text" value="http://gitforge.com/mvanbrummen/avroschemavalidator" readonly />
                                                </p>
                                                <p className="control">
                                                    <button className="button">
                                                        <i className="fa fa-copy"></i>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </nav>


                                <table className="table is-fullwidth">

                                    <thead>
                                        <tr>
                                            <th>
                                                <p className="has-text-grey">{
                                                    repoSummary.lastCommit.message + ' authored by ' + repoSummary.lastCommit.committerName


                                                }</p>
                                            </th>
                                            <th></th>
                                            <th></th>
                                        </tr>

                                    </thead>


                                    <tbody>
                                        {
                                            repoSummary.items.map((f, i) =>
                                                <tr key={i}>
                                                    <td>
                                                        <i class={f.isDir ? "fa fa-folder" : "fa fa-file-code-o"}></i>
                                                        <Link to={this.props.match.url + '/blob/' + f.path}> {f.path}</Link>
                                                    </td>
                                                    <td>init commit</td>
                                                    <td className="has-text-right is-size-7">2 years ago</td>
                                                </tr>
                                            )
                                        }


                                    </tbody>


                                </table>


                                {
                                    (repoSummary.readme !== null && repoSummary.readme !== undefined) &&

                                    <table className="table is-fullwidth is-bordered">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <i class="fa fa-book"></i> README.md
                            </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="content">
                                                        <ReactMarkdown source={repoSummary.readme} />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                }

                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Repository;