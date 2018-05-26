import React from 'react';

const CreateBranchForm = ({ createBranchSubmit, handleChange }) => (
    <div>
        <h3 className="has-text-grey-dark title is-size-5">Create a new branch</h3>
        <hr />
        <form onSubmit={createBranchSubmit}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label has-text-grey">Branch Name </label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <input name="branchName"
                            className="input"
                            onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label">
                    <label className="label has-text-grey">Create From</label>
                </div>
                <div className="field-body">
                    <div className="control">
                        <div className="select">
                            <select>
                                <option>master</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label">
                </div>
                <div className="field-body">
                    <div className="field">
                        <div class="field is-grouped">
                            <div className="control">
                                <button className="button is-primary">
                                    Create Branch
</button>
                            </div>
                            <div className="control">
                                <button className="button">
                                    Cancel
</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <hr />
    </div>
)

export default CreateBranchForm;