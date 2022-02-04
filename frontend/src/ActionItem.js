import React from 'react';

class ActionItem extends React.Component {

    render() {
        return(
            <li className="action-item">
                <a href="#" className="icon-button">
                    {this.props.icon}
                </a>
            </li>
        )
    }

}

export default ActionItem;