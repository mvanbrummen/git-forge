import React from 'react';
import SignupForm from '../components/SignupForm';
import { Link } from 'react-router-dom';

const styles = {
    header: {
        marginBottom: '1rem'
    },
    loginLink: {
        marginTop: '1rem'
    },
    logo: {
        color: '#ff8026'
    }
}

const SignupContainer = () => (
    <div className="container">
        <div className="column is-6 is-offset-3">
            <div className="has-text-centered" style={styles.header}>
                <h3 className="title has-text-grey is-size-1">Git<span style={styles.logo}>Forge</span></h3>
                <h3 className="subtitle has-text-grey">Signup to create an account</h3>
            </div>
            <SignupForm />
            <div style={styles.loginLink}>
                <Link to="/login" >Already have an account?</Link>
            </div>
        </div>
    </div>
)

export default SignupContainer;