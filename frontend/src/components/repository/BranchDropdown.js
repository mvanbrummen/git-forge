import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class BranchDropdown extends Component {

    state = {
        isActive: false,
        branches: [],
        tags: [],
        initialBranches: [],
        initialTags: []
    }

    componentWillReceiveProps(props) {
        this.setState({
            branches: props.branches,
            tags: props.tags,
            initialBranches: props.branches,
            initialTags: props.tags
        });
    }

    filterRefs = (e) => {
        let updatedBranches = this.state.initialBranches;
        updatedBranches = updatedBranches.filter((b) =>
            b.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        )
        let updatedTags = this.state.initialTags;
        updatedTags = updatedTags.filter((t) =>
            t.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        )

        this.setState({
            branches: updatedBranches,
            tags: updatedTags
        });
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
        const { currentBranch } = this.props;
        const { branches, tags } = this.state;

        return (
            <div className="level-item" ref={node => this.node = node}>
                <div className="field">
                    <div className={this.state.isActive ? "is-active dropdown" : "dropdown"}>
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
                                onClick={this.handleClick}>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-code-fork"></i>
                                </span>
                                <span>{currentBranch}</span>
                                <span className="icon is-small">
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">
                                    <h3 className="has-text-grey-dark title is-size-6">Switch Branch/Tag</h3>
                                </div>
                                <div className="dropdown-item">
                                    <input className="input"
                                        type="text"
                                        placeholder="Filter..."
                                        onChange={this.filterRefs} />
                                </div>
                                <hr className="dropdown-divider" />

                                {branches.length > 0 &&
                                    <h3 className="has-text-grey-dark title is-size-7 dropdown-subtitle">Branches</h3>
                                }
                                {
                                    branches.map(b =>
                                        <a href="#" key={b.refId} className="dropdown-item">

                                            {
                                                b.name === currentBranch &&
                                                <span><i class="fa fa-check"></i> </span>
                                            }

                                            {b.name}
                                        </a>
                                    )
                                }

                                {tags.length !== 0 &&
                                    <div>
                                        <hr className="dropdown-divider" />
                                        <h3 className="has-text-grey-dark title is-size-7 dropdown-subtitle">Tags</h3>
                                    </div>
                                }
                                {
                                    tags.map(t =>
                                        <a href="#" key={t.refId} className="dropdown-item">

                                            {
                                                t.name === currentBranch &&
                                                <span><i class="fa fa-check"></i> </span>
                                            }

                                            {t.name}
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BranchDropdown;