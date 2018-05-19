import React from 'react';
import { Link } from 'react-router-dom';

const DirectoryTable = ({ items, lastCommit, url, isRoot = false }) => {
    const pathInfix = isRoot ? '/blob/' : '/';

    return (
        <table className="table is-fullwidth table-hoverable">
            <thead>
                <tr>
                    <th>
                        <p className="has-text-grey">
                            {lastCommit !== undefined &&
                                lastCommit.message + ' authored by ' + lastCommit.committerName}
                        </p>
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
                                <Link to={{ pathname: url + pathInfix + f.path, state: { displayFile: !f.isDir } }}> {f.path}</Link>
                            </td>
                            <td className="has-text-right has-text-grey">init commit</td>
                            <td className="has-text-right has-text-grey">2 years ago</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default DirectoryTable;