import React from 'react';

const styles = {
    terms: {
        paddingLeft: '4rem',
        paddingRight: '4rem'
    }
}

const SignupForm = () => {
    return (
        <div>
            <div className="box">
                <form>
                    <div className="field">
                        <label class="label">Username</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Pick a username" />
                        </div>
                    </div>
                    <div className="field">
                        <label class="label">Email Address</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="you@example.com" />
                        </div>
                    </div>
                    <div className="field">
                        <label class="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Choose your password" />
                            <p class="help">Use at least one letter, one numeral, and seven characters.</p>
                        </div>
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