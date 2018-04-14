import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from '../logo.png';
import { Link, Redirect } from 'react-router-dom';
import { isUserAuthed, clearAuth } from '../util/AuthService';

class Nav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plusClicked: false,
            profileClicked: false,
            loggedOut: false
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = (e) => {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(e.target)) {
            this.setState({
                plusClicked: false,
                profileClicked: false
            });
        }
    }

    handleClickPlus = (e) => {
        e.preventDefault();
        this.setState({
            plusClicked: !this.state.plusClicked,
            profileClicked: false
        });
    }

    handleClickProfile = (e) => {
        e.preventDefault();
        this.setState({
            profileClicked: !this.state.profileClicked,
            plusClicked: false
        });
    }

    logout = (e) => {
        e.preventDefault();
        clearAuth();
        this.setState({
            loggedOut: true
        });
    }

    render() {
        return (
            <nav className="navbar is-dark level" aria-label="main navigation">

                {
                    this.state.loggedOut &&
                    <Redirect to='/' />
                }

                <div className="navbar-brand">
                    <a href="/" className="navbar-item"  >
                        <img src={Logo} alt="logo.png" /> <span className="title has-text-white has-text-weight-light">&nbsp;Git<span className="has-text-weight-semibold primary-font">Forge</span></span>
                    </a>
                </div>

                <div className="navbar-start">

                </div>

                <div className="navbar-end">

                    {!isUserAuthed() && <Link to="/login" className="navbar-item"  >
                        <p> <span className="has-text-weight-bold">Login</span> or <span className="has-text-weight-bold">Signup</span></p>
                    </Link>}

                    {isUserAuthed() &&

                        <div className="navbar-item" >
                            <div className="field has-addons">
                                <p className="control">
                                    <input className="input" type="text" placeholder="Find a repository" />
                                </p>
                                <p className="control">
                                    <button className="button is-success">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </p>
                            </div>
                        </div>
                    }

                    {isUserAuthed() &&
                        <div className={'navbar-item has-dropdown' + (this.state.plusClicked ? ' is-active' : '')}>
                            <a className="navbar-link"
                                onClick={this.handleClickPlus}>
                                <i className="fa fa-plus-square"></i>
                            </a>

                            <div className="navbar-dropdown is-right">
                                <Link to="/repos/new" className="navbar-item">
                                    Create Repository
          </Link>

                            </div>
                        </div>
                    }

                    {isUserAuthed() &&
                        <div className={'navbar-item has-dropdown' + (this.state.profileClicked ? ' is-active' : '')}>
                            <a className="navbar-link" onClick={this.handleClickProfile}>
                                <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c03d50?d=identicon" alt="avatar.png" />
                            </a>

                            <div className="navbar-dropdown is-right">
                                <a className="navbar-item">
                                    Profile
          </a>
                                <a className="navbar-item">
                                    Settings
          </a>

                                <hr className="navbar-divider" />
                                <a className="navbar-item" onClick={this.logout}>
                                    Logout
                                </a>
                            </div>
                        </div>
                    }

                </div>

            </nav>
        )
    }
}

export default Nav;