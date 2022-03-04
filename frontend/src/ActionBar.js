import React from 'react';

class ActionBar extends React.Component {

    render() {
        return(
            <div id="actionbar">
                <ul id="actionbar-actions">
                    {this.props.children}
                </ul>
            </div>
        )
    }

}

export default ActionBar;