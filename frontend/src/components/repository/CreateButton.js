import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

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
                    <div className="dropdown-trigger">
                        <button className="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                            onClick={this.handleClick}>

                            <span className="icon is-small">
                                <i className="fa fa-plus" aria-hidden="true"></i>

                            </span>
                            <span className="icon is-small">
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <Link to={this.props.url + '/branches/new'} className="dropdown-item">New Branch</Link>
                        </div>
                        <div className="dropdown-content">
                            <a href="#" className="dropdown-item">New Tag</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default CreateButton;