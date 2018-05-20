import React from 'react';
import { Link } from 'react-router-dom';

const BranchesTable = (props) => (
    <table className="table is-fullwidth">
        <thead>
            <tr>
                <th>Branches</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                props.branches.map((b) =>
                    <tr>
                        <td>
                            <p>
                                <i class="fa fa-code-fork" aria-hidden="true"></i>
                                <Link to="#"> {b.name} </Link>

                                <span class="tag is-rounded is-success">default</span>
                                <span class="tag is-rounded is-dark">protected</span>
                            </p>
                            <p className="has-text-grey">
                                <i class="fa fa-code-fork" aria-hidden="true"></i>
                                <Link to="#" className="has-text-grey"> 1e8b9da3</Link> · Last commit message · a day ago
                            </p>
                        </td>
                        <td>
                            <div className="pull-right">
                                <button className="button"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                        </td>
                    </tr>
                )
            }
        </tbody>
    </table>
)

export default BranchesTable;