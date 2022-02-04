import React from 'react';

class ActionBar extends React.Component {

    render() {
        return(
            <nav className="actionbar">
                <ul className="actionbar-actions">
                    {this.props.children}
                </ul>
            </nav>
        )
    }

}

export default ActionBar;