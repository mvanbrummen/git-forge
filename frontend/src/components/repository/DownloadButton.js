import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DownloadButton extends Component {

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
                                <i class="fa fa-cloud-download"></i>

                            </span>
                            <span class="icon is-small">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item">Download .zip</a>
                        </div>
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item">Download .tar.gz</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadButton;