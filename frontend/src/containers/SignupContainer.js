import React, { Component } from 'react';
import SignupForm from '../components/SignupForm';
import { Link, Redirect } from 'react-router-dom';
import { createUser } from '../util/AuthService';

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

class SignupContainer extends Component {

    state = {
        username: '',
        password: '',
        emailAddress: '',
        authed: false
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleEmailAddressChange = (e) => {
        this.setState({ emailAddress: e.target.value });
    }

    submitSignupForm = (e) => {
        e.preventDefault();

        createUser(this.state.username, this.state.emailAddress, this.state.password)
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
                        <h3 className="subtitle has-text-grey">Signup to create an account</h3>
                    </div>
                    <SignupForm
                        submitForm={this.submitSignupForm}
                        handleUsernameChange={this.handleUsernameChange}
                        handlePasswordChange={this.handlePasswordChange}
                        handleEmailAddressChange={this.handleEmailAddressChange}
                    />
                    <div style={styles.loginLink}>
                        <Link to="/login" >Already have an account?</Link>
                    </div>
                </div>
            </div >
        )
    }
}

export default SignupContainer;