import React from 'react';

const SignupContainer = () => {
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

export default SignupContainer;