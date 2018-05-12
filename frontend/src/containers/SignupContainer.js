import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupContainer = () => {
    return (
        <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
                <SignupForm />
            </div>
        </div>
    )
}

export default SignupContainer;