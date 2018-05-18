import React, { Component } from 'react';
import { authUser } from '../util/AuthService';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

class LoginContainer extends Component {

    state = {
        username: '',
        password: '',
        authed: false
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    submitLoginForm = (e) => {
        e.preventDefault();

        authUser(this.state.username, this.state.password)
            .then((resp) => {
                console.log('Authed! ' + resp.token);
                this.setState({
                    authed: true
                });
            });
    }

    render() {
        return (

            <div className="container has-text-centered">
                {
                    this.state.authed &&
                    <Redirect to='/' />}

                <div className="column is-4 is-offset-4">
                    <LoginForm submitLoginForm={this.submitLoginForm}
                        handlePasswordChange={this.handlePasswordChange}
                        handleUsernameChange={this.handleUsernameChange} />
                </div>
            </div>

        )
    }
}

export default LoginContainer;