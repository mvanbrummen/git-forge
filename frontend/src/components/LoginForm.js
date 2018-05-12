import React from 'react';

const LoginForm = ({ submitLoginForm, handleUsernameChange, handlePasswordChange }) => {
    return (
        <div>
            <h3 className="title has-text-grey">Login to GitForge</h3>
            <div className="box">
                <form onSubmit={submitLoginForm}>
                    <div className="field">
                        <div className="control">
                            <input className="input" type="text" onChange={handleUsernameChange} placeholder="Username" name="username" />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input className="input" type="password" onChange={handlePasswordChange} placeholder="Password" name="password" />
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
    )
}

export default LoginForm;