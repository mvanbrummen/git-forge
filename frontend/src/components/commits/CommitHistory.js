import React, { Component } from 'react';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';

class CommitHistory extends Component {

    render() {
        const { commits, url } = this.props;
        return (
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>12 May, 2018 6 commits</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        commits.map((commit, i) =>

                            <tr key={i}>
                                <td>
                                    <figure className="image is-32x32 is-pulled-left table-avatar">
                                        <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c03d50?d=identicon" alt="avatar.png" />
                                    </figure>
                                    <p><Link to={`${url}/diff/${commit.commitHash}/${commit.parents[0]}`}>{commit.message}</Link> </p>
                                    <p> Authored by <span className='has-text-weight-semibold'>{commit.committerName}</span> at <Moment unix>{commit.commitTime}></Moment></p>
                                </td>
                                <td>
                                    <div className="field has-addons is-pulled-right">
                                        <div className="control">
                                            <input className="input commit-hash-input" type="text" readOnly value={commit.commitHash.substring(0, 8)} />

                                        </div>
                                        <div className="control">
                                            <button className="button"><i class="fa fa-paste"></i></button>
                                        </div>
                                    </div>
                                    <input type='hidden' value={commit.commitHash} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }
}

export default CommitHistory;