import React from 'react';
import Bg from '../images/bg.png';
import SignupForm from '../components/SignupForm';

const styles = {
    background: {
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
        marginTop: '-1.5rem'
    },
    form: {
        paddingLeft: '2rem',
        paddingRight: '2rem'
    }
}

const HomeContainer = () => (
    <div>
        <section className="hero is-fullheight" style={styles.background}>
            <div className="hero-body">
                <div className="container">

                    <div className="columns">
                        <div className="column">
                            <h1 className="title is-size-1">
                                Open source Git Hosting</h1>
                            <h2 className="subtitle is-size-3">
                                Built with love by developers, for developers</h2>
                        </div>
                        <div className="column" style={styles.form}>

                            <SignupForm />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default HomeContainer;