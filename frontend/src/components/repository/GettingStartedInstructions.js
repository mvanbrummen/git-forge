import React from 'react';

const GettingStartedInstructions = () => {
    return (
        <div>
            <h3 className="has-text-grey-dark title is-size-4">Get started</h3>
            <hr />


            <div>
                <h5 className="has-text-grey title is-size-6">Global Configuration</h5>
                <pre>
                    <code>
                        <p>git config --global user.name "Michael Van Brummen"</p>
                        <p>git config --global user.email "michaelvanbrummen@gmail.com"</p>
                    </code>
                </pre>
            </div>
            <hr />

            <div>
                <h5 className="has-text-grey title is-size-6">New Repository</h5>
                <pre>
                    <code>
                        <p>git clone git@gitlab.com:mvanbrummen/test.git</p>
                        <p>cd test</p>
                        <p>touch README.md</p>
                        <p>git add README.md</p>
                        <p>git commit -m "add README"</p>
                        <p>git push -u origin master</p>
                    </code>
                </pre>
            </div>
            <hr />
            <div>
                <h5 className="has-text-grey title is-size-6">Existing Folder</h5>
                <pre>
                    <code>
                        <p>cd existing_folder</p>
                        <p>git init</p>
                        <p>git remote add origin git@gitlab.com:mvanbrummen/test.git</p>
                        <p>git add .</p>
                        <p>git commit -m "Initial commit"</p>
                        <p>git push -u origin master</p>
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default GettingStartedInstructions; 