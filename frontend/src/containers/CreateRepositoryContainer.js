import React, { Component } from 'react';
import { createRepository } from '../util/RepositoryService';
import { getUserAuthObject } from '../util/AuthService';
import { Redirect } from 'react-router-dom';
import CreateRepositoryForm from '../components/repository/CreateRepositoryForm';
import Nav from '../components/Nav';

class CreateRepositoryContainer extends Component {

    state = {
        repoName: '',
        repoDescription: '',
        created: false
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
            <div>
                <Nav />
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
            </div>
        )
    }
}

export default CreateRepositoryContainer;