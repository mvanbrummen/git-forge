import React, { Component } from 'react';
import Bg from '../images/bg.png';
import SignupForm from '../components/SignupForm';
import Nav from '../components/Nav';
import { Redirect } from 'react-router-dom';
import { createUser } from '../util/AuthService';

const styles = {
    background: {
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
        marginTop: '-1.5rem'
    },
    form: {
        paddingLeft: '2rem',
        paddingRight: '2rem'
    }
}

class HomeContainer extends Component {

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
            <div>
                {
                    this.state.authed &&
                    <Redirect to='/' />}

                <Nav />
                <section className="hero is-fullheight" style={styles.background}>
                    <div className="hero-body">
                        <div className="container">

                            <div className="columns">
                                <div className="column">
                                    <h1 className="title is-size-1">
                                        Open source Git Hosting</h1>

                                    <h2 className="subtitle is-size-3">
                                        Built with love by developers, for developers</h2>

                                </div>
                                <div className="column" style={styles.form}>
                                    <SignupForm
                                        submitForm={this.submitSignupForm}
                                        handleUsernameChange={this.handleUsernameChange}
                                        handlePasswordChange={this.handlePasswordChange}
                                        handleEmailAddressChange={this.handleEmailAddressChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default HomeContainer;