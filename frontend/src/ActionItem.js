import React from 'react';

class ActionItem extends React.Component {

    render() {
        return(
            <div className="action-item">
                <a href="#" className="icon-button" onClick={this.props.toggleDropdown}>
                    {this.props.icon}
                </a>
                {this.props.dropdownIsOpen && this.props.children}
            </div>
        )
    }

}

export default ActionItem;