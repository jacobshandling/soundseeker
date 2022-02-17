import React from 'react';


function DropdownItem(props) {
    return (
        <a href="#" className="menu-item" onClick={props.toggleClipUpload}>
            {props.children}
        </a>
    )
}

class DropdownMenu extends React.Component {

    render() {
        return(
            <div className="dropdown">
                <DropdownItem toggleClipUpload={this.props.toggleClipUpload}>
                    Upload A Clip
                </DropdownItem>
                <DropdownItem>Create A Blob</DropdownItem>
                <DropdownItem>Create A Suite</DropdownItem>
            </div>
        )
    }

}

export default DropdownMenu;