import React from 'react';

const RepositoryControls = () => {
    return (
        <div className="level is-pulled-right repo-controls">
            <div className="level-item">
                <div className="field has-addons">
                    <p className="control">
                        <button className="button is-small">
                            <i className="fa fa-bell"></i>&nbsp; Watch
                    </button>
                    </p>
                    <p className="control">
                        <input className="input is-small repo-input" type="text" value="2" readonly />
                    </p>
                </div>
            </div>
            <div className="level-item">
                <div className="field has-addons">
                    <p className="control">
                        <button className="button is-small">
                            <i className="fa fa-star"></i>&nbsp;Star
                    </button>
                    </p>
                    <p className="control">
                        <input className="input is-small repo-input" type="text" value="890" readonly />
                    </p>
                </div>
            </div>
            <div className="level-item">
                <div className="field has-addons">
                    <p className="control">
                        <button className="button is-small">
                            <i className="fa fa-code-fork"></i>&nbsp; Fork
                    </button>
                    </p>
                    <p className="control">
                        <input className="input is-small repo-input" type="text" value="2" readonly />
                    </p>
                </div>
            </div>

        </div>
    )
}

export default RepositoryControls;