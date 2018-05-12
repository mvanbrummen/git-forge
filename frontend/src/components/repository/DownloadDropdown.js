import React from 'react';

const DownloadDropdown = () => {
    return (
        <div className="level-item">
            <div className="field has-addons">
                <p className="control">
                    <div className="select">
                        <select>
                            <option>HTTPS</option>
                            <option>SSH</option>
                        </select>
                    </div>
                </p>
                <p className="control">
                    <input className="input" type="text" value="http://gitforge.com/mvanbrummen/avroschemavalidator" readonly />
                </p>
                <p className="control">
                    <button className="button">
                        <i className="fa fa-copy"></i>
                    </button>
                </p>
            </div>
        </div>
    )
}

export default DownloadDropdown;