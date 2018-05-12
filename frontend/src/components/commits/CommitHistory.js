import React from 'react';

const CommitHistory = ({ commits }) => {
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
                                <p><a href="#">{commit.message}</a> </p>
                                <p> Authored by <span className='has-text-weight-semibold'>{commit.committerName}</span> at {commit.commitTime}</p>
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

export default CommitHistory;