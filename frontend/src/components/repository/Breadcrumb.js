import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ userName, repoName, breadcrumbs = [] }) => (
    <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li><i class="fa fa-book"></i><Link to="/"><strong>&nbsp;{userName}</strong></Link></li>
            <li><Link to={"/repos/" + userName + "/" + repoName}><strong>{repoName}</strong></Link></li>

            {
                breadcrumbs.map((breadcrumb, i) =>
                    <li key={i}><Link to={"/repos/" + userName + "/" + repoName}><strong>{breadcrumb}</strong></Link></li>
                )
            }
        </ul>
    </nav>
)

export default Breadcrumb;