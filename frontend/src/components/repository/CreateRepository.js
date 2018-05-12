import React, { Component } from 'react';
import { createRepository } from '../../util/RepositoryService';
import { getUserAuthObject } from '../../util/AuthService';
import { Redirect } from 'react-router-dom';

class CreateRepository extends Component {

    constructor(props) {
        super();

        this.state = {
            repoName: '',
            repoDescription: '',
            created: false
        };
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    createRepoSubmit = (e) => {
        e.preventDefault();

        createRepository(this.state.repoName, this.state.repoDescription).then(resp => {
            this.setState({ created: true });
        });
    }

    render() {
        const account = getUserAuthObject().username;
        const redirect = `/repos/${account}/${this.state.repoName}`;

        return (
            <div className="container">

                {
                    this.state.created &&
                    <Redirect to={redirect} />
                }

                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h3 className="has-text-grey-dark title is-size-4">Create a new repository</h3>
                        <hr />
                        <form onSubmit={this.createRepoSubmit}>
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
                                                <input name="repoName" class="input" placeholder="my-awesome-project" onChange={this.handleChange} />
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
                                        <textarea name="repoDescription" className="textarea" placeholder="Description for project" onChange={this.handleChange} />
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
                </div>
            </div>

        )
    }
}

export default CreateRepository;