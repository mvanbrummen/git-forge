import React from 'react';

const LoginForm = ({ submitLoginForm, handleUsernameChange, handlePasswordChange }) => {
    return (
        <div>

            <div className="box">
                <form onSubmit={submitLoginForm}>
                    <div className="field">
                        <label class="label">Username</label>
                        <p class="control has-icons-left">
                            <input className="input" type="text" onChange={handleUsernameChange} placeholder="Username" name="username" />
                            <span class="icon is-small is-left">
                                <i class="fa fa-user"></i>
                            </span>
                        </p>

                    </div>

                    <div className="field">
                        <label class="label">Password</label>
                        <p class="control has-icons-left">
                            <input className="input" type="password" onChange={handlePasswordChange} placeholder="Password" name="password" />
                            <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                            </span>
                        </p>
                    </div>

                    <button className="button is-block is-success is-fullwidth">Login</button>
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