import React from 'react';


import { Link } from 'react-router-dom';

const Breadcrumb = ({ username, repoName }) => {
    return (
        <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><i class="fa fa-book"></i><Link to="/"><strong>&nbsp;{username}</strong></Link></li>
                <li><a href="#"><strong>{repoName}</strong></a></li>
            </ul>
        </nav>
    )
}

export default Breadcrumb;