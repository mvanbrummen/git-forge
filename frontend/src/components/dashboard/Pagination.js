import React from 'react';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

const Pagination = () => {
    return (
        <nav className="pagination is-centered is-small" aria-label="pagination">
            <a className="pagination-previous">Previous</a>
            <a className="pagination-next">Next page</a>
            <ul className="pagination-list">
                <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                <li><a className="pagination-link" aria-label="Goto page 45">8</a></li>
                <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">9</a></li>
                <li><a className="pagination-link" aria-label="Goto page 47">10</a></li>
                <li><span className="pagination-ellipsis">&hellip;</span></li>
                <li><a className="pagination-link" aria-label="Goto page 86">13</a></li>
            </ul>
        </nav>
    )
}

export default Pagination;
