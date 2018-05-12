import React from 'react';
import { Link } from 'react-router-dom';

const DirectoryTable = ({ repoSummary, url }) => {
    return (
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
                                <Link to={{ pathname: url + '/blob/' + f.path, state: { displayFile: !f.isDir } }}> {f.path}</Link>
                            </td>
                            <td>init commit</td>
                            <td className="has-text-right is-size-7">2 years ago</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default DirectoryTable;