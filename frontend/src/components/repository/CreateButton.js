import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CreateButton extends Component {

    state = {
        isActive: false
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = (e) => {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(e.target)) {
            this.setState({
                isActive: false
            });
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            isActive: !this.state.isActive
        });
    }

    render() {
        return (
            <div className="level-item">

                <div className={this.state.isActive ? "is-active dropdown" : "dropdown"}>
                    <div class="dropdown-trigger">
                        <button class="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                            onClick={this.handleClick}>

                            <span class="icon is-small">
                                <i class="fa fa-plus" aria-hidden="true"></i>

                            </span>
                            <span class="icon is-small">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item">New Branch</a>
                        </div>
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item">New Tag</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default CreateButton;