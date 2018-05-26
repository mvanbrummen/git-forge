import React, { Component } from 'react';
import CreateBranchForm from '../components/branches/CreateBranchForm';
import { Redirect } from 'react-router-dom';
import Nav from '../components/Nav';

class BranchCreateContainer extends Component {

    state = {
        created: false
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    {
                        this.state.created &&
                        <Redirect to={'#'} />
                    }

                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <CreateBranchForm
                                createBranchSubmit={this.createBranchSubmit}
                                handleChange={this.handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BranchCreateContainer;