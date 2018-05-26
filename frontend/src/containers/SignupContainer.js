import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupContainer = () => (
    <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
            <h3 className="title has-text-grey">Sign Up</h3>
            <SignupForm />
        </div>
    </div>
)

export default SignupContainer;