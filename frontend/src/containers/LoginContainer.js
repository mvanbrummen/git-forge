import React, { Component } from 'react';
import { authUser } from '../util/AuthService';
import { Redirect, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

import { connect } from 'react-redux';
import { login } from '../actions/UserActions';

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

        const { username, password } = this.state;
        this.props.dispatch(login(username, password));
    }

    render() {
        const { loggedIn, loggingIn } = this.props;

        return (
            <div className="container">
                { loggedIn &&
                <Redirect to="/" />
                }

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

function mapStateToProps(state) {
    const { authentication } = state;
    const { loggingIn, loggedIn } = authentication;
    return {
        loggingIn,
        loggedIn
    };
}

const connectedLoginContainer = connect(mapStateToProps)(LoginContainer);
export { connectedLoginContainer as LoginContainer }; 
