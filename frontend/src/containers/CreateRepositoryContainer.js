import React, { Component } from 'react';
import { createRepository } from '../util/RepositoryService';
import { getUserAuthObject } from '../util/AuthService';
import { Redirect } from 'react-router-dom';
import CreateRepositoryForm from '../components/repository/CreateRepositoryForm';

class CreateRepositoryContainer extends Component {

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
                        <CreateRepositoryForm createRepoSubmit={this.createRepoSubmit}
                            handleChange={this.handleChange} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateRepositoryContainer;