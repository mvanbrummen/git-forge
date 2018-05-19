import React from 'react';

const DownloadButton = (props) => (
    <div className="level-item">

        <div class="dropdown">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">

                    <span class="icon is-small">
                        <i class="fa fa-cloud-download"></i>

                    </span>
                    <span class="icon is-small">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item">Download .zip</a>
                </div>
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item">Download .tar.gz</a>
                </div>
            </div>
        </div>
    </div>
)

export default DownloadButton;