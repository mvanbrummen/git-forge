import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import Nav from './Nav';
import Repository from './Repository';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import { authUser } from '../util/AuthService';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import CreateRepository from './CreateRepository';

class App extends Component {
    constructor() {
        super();

        loadProgressBar({ showSpinner: false });
    }

    render() {
        return (
            <div>
                <Nav />

                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/repos/new" component={CreateRepository} />

                    <Route path="/repos/:userName/:repoName" component={Repository} />
                </Switch>

            </div>
        )
    }
}

const Signup = () => {
    return (
        <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Sign Up</h3>
                <div className="box">
                    <form>

                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" placeholder="Username" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input" type="email" placeholder="Email address" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input className="input" type="password" placeholder="Password" />
                            </div>
                        </div>
                        <button className="button is-block is-info is-fullwidth">Sign up to GitForge</button>
                    </form>

                </div>

            </div>
        </div>
    )
}

class Login extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            authed: false
        };
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    submitLoginForm(e) {
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
                    <h3 className="title has-text-grey">Login to GitForge</h3>
                    <div className="box">
                        <form onSubmit={this.submitLoginForm.bind(this)}>
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="text" onChange={this.handleUsernameChange.bind(this)} placeholder="Username" name="username" />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <input className="input" type="password" onChange={this.handlePasswordChange.bind(this)} placeholder="Password" name="password" />
                                </div>
                            </div>

                            <button className="button is-block is-info is-fullwidth">Login</button>
                            <div class="field">
                                <div class="control">
                                    <label class="checkbox has-text-grey">
                                        <input type="checkbox" />
                                        &nbsp; Remember me
                                    </label>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </div>

        )
    }
}

export default App;