import React from 'react';

const CreateRepositoryForm = ({ createRepoSubmit, handleChange }) => (
    <div>
        <h3 className="has-text-grey-dark title is-size-5">Create a new repository</h3>
        <hr />
        <form onSubmit={createRepoSubmit}>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label has-text-grey">Name </label>
                </div>
                <div class="field-body">
                    <div class="field is-expanded">
                        <div class="field has-addons">
                            <p class="control">
                                <a class="button is-static">
                                    mvanbrummen /
</a>
                            </p>
                            <p class="control is-expanded">
                                <input name="repoName" class="input" placeholder="my-awesome-project" onChange={handleChange} />
                            </p>
                        </div>
                        <p class="help"></p>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label has-text-grey">Description </label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <textarea name="repoDescription" className="textarea" placeholder="Description for project" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label">
                    <label className="label has-text-grey">Visibility</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                            <label className="radio">
                                <input type="radio" name="member" />
                                <span className="has-text-grey"> Public</span> <i class="fa fa-globe"></i>
                            </label>
                            <label className="radio">
                                <input type="radio" name="member" />
                                <span className="has-text-grey"> Private</span> <i class="fa fa-lock"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label">
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <button className="button is-success">
                                Create
</button>
                        </div>
                    </div>
                </div>
            </div>

        </form>

        <hr />
    </div>
)

export default CreateRepositoryForm;