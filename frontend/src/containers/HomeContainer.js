import React from 'react';
import Bg from '../images/bg.png';
import SignupForm from '../components/SignupForm';
import Nav from '../components/Nav';
import Typing from 'react-typing-animation';

const subtitles = [
    'Built with love by developers, for developers.',
    'Backend written in Scala, Akka HTTP with a frontend in ReactJS',
    'Repositories, groups, branches and tags. The core functionality that you need!',
    'Simple deployment. Just java -jar that shit!',
    'Fantastic performance built on the JVM.'
]

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
        <Nav />
        <section className="hero is-fullheight" style={styles.background}>
            <div className="hero-body">
                <div className="container">

                    <div className="columns">
                        <div className="column">
                            <h1 className="title is-size-1">
                                Open source Git Hosting</h1>

                            <Typing speed={10} loop={true}>
                                {subtitles.map(s =>
                                    <div>
                                        <h2 className="subtitle is-size-3">
                                            {s}
                                        </h2>
                                        <Typing.Delay ms={3000} />
                                        <Typing.Backspace count={s.length} />
                                    </div>
                                )
                                }
                            </Typing>

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