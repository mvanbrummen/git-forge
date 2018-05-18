import React from 'react';

const RepositoryTabs = () => (
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
                    <span className="icon is-small"><i class="fa fa-cog"></i></span>
                    <span>Settings</span>
                </a>
            </li>
        </ul>
    </div>
)

export default RepositoryTabs;