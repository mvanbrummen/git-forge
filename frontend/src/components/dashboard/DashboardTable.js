import React from 'react';
import { Link } from 'react-router-dom';

const DashboardTable = ({ repositories, account }) => {
    return (
        <table className="table is-fullwidth">
            <tbody>
                {repositories.map((p, i) =>

                    <tr key={i}>
                        <td>
                            <i className="fa fa-book"></i>
                            <Link to={"/repos/" + account + "/" + p.name} > <strong>{account + ' / ' + p.name}</strong></Link> <span class="tag is-light">master</span>
                            <p className="has-text-grey-dark is-size-6">{p.description}</p>
                        </td>
                        <td className="has-text-right"><i class="fa fa-star"></i> <span className="is-size-7">899    </span>    <i class="fa fa-globe"></i><p className="has-text-grey-dark is-size-7">modified today</p></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default DashboardTable;