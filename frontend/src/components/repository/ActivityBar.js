import React from 'react';

import { Link } from 'react-router-dom';

const ActivityBar = ({ url, repoSummary }) => {
    return (
        <div className="box repo-activity-bar" style={{ padding: '0.5rem' }}>
            <nav class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading"><i class="fa fa-clock-o" aria-hidden="true"></i>

                            <Link to={url + '/commits'}> Commits {repoSummary.totalCommits}</Link>

                        </p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading"><i class="fa fa-code-fork" aria-hidden="true"></i> Branches {repoSummary.branches.length}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading"><i class="fa fa-users" aria-hidden="true"></i> Contributors 34</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading"><i class="fa fa-balance-scale" aria-hidden="true"></i> License MIT</p>
                    </div>
                </div>

            </nav>

        </div>
    )
}

export default ActivityBar; 