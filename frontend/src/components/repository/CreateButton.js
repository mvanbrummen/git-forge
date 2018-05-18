import React from 'react';

const CreateButton = () => (
    <div className="level-item">

        <div class="dropdown">
            <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">

                    <span class="icon is-small">
                        <i class="fa fa-plus" aria-hidden="true"></i>

                    </span>
                    <span class="icon is-small">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item">
                        Dropdown item
</a>
                </div>
            </div>
        </div>
    </div>
)

export default CreateButton;