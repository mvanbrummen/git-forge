import React, { Component } from 'react';
import { authUser } from '../util/AuthService';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const styles = {
    header: {
        marginBottom: '1rem'
    },
    loginLink: {
        marginTop: '1rem'
    },
    logo: {
        color: '#ff8026'
    }
}

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

            <div className="container">
                {
                    this.state.authed &&
                    <Redirect to='/' />}

                <div className="column is-6 is-offset-3">
                    <div className="has-text-centered" style={styles.header}>
                        <Link to="/home">
                            <h3 className="title has-text-grey is-size-1">Git<span style={styles.logo}>Forge</span></h3>
                        </Link>
                        <h3 className="subtitle has-text-grey">Login to continue</h3>
                    </div>
                    <LoginForm submitLoginForm={this.submitLoginForm}
                        handlePasswordChange={this.handlePasswordChange}
                        handleUsernameChange={this.handleUsernameChange} />

                    <div style={styles.loginLink}>
                        <Link to="/signup" >Need an account?</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginContainer;