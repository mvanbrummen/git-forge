import React from 'react';

const BranchDropdown = ({ branches }) => (
    <div className="level-item">

        <div className="field">
            <p className="control has-icons-left">
                <div className="select">
                    <select>
                        {
                            branches.map(b =>
                                <option key={b.refId}>{b.name}</option>
                            )
                        }
                    </select>
                </div>
                <span class="icon is-small is-left">
                    <i class="fa fa-code-fork"></i>
                </span>
            </p>
        </div>
    </div>
)

export default BranchDropdown;