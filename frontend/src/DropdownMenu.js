import React from 'react';


function DropdownItem(props) {
    return (
        <a href="#" className="menu-item" onClick={props.onClick}>
            <h4>{props.children}</h4>
        </a>
    )
}

class DropdownMenu extends React.Component {

    render() {
        return(
            <div className="dropdown">
                <DropdownItem onClick={this.props.toggleClipUpload}>
                    Upload a Clip
                </DropdownItem>
                <DropdownItem>Create a Blob</DropdownItem>
                <DropdownItem>Create a Suite</DropdownItem>
            </div>
        )
    }

}

export default DropdownMenu;