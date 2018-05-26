import React from 'react';

const styles = {
    terms: {
        paddingLeft: '4rem',
        paddingRight: '4rem'
    }
}

const SignupForm = ({ submitForm, handleUsernameChange, handlePasswordChange, handleEmailAddressChange }) => {
    return (
        <div>
            <div className="box">
                <form onSubmit={submitForm}>
                    <div className="field">
                        <label class="label">Username</label>
                        <p class="control has-icons-left">
                            <input className="input" type="text" placeholder="Pick a username"
                                onChange={handleUsernameChange} />
                            <span class="icon is-small is-left">
                                <i class="fa fa-user"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <label class="label">Email Address</label>
                        <p class="control has-icons-left">
                            <input className="input" type="email" placeholder="you@example.com"
                                onChange={handleEmailAddressChange} />
                            <span class="icon is-small is-left">
                                <i class="fa fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <label class="label">Password</label>
                        <p class="control has-icons-left">
                            <input className="input" type="password" placeholder="Choose your password"
                                onChange={handlePasswordChange} />
                            <p class="help">Use at least one letter, one numeral, and seven characters.</p>
                            <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <button className="button is-block is-success is-fullwidth">Sign up to GitForge</button>

                    <div className="has-text-centered" style={styles.terms}>
                        <p class="help">By clicking "Sign up to GitForge you accept our <a href="#">terms of service</a> and <a href="#">privacy agreement</a>.</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm;