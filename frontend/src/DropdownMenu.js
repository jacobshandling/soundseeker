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
                <DropdownItem onClick={this.props.toggleCreateClip}>Upload a Clip</DropdownItem>
                <DropdownItem onClick={this.props.toggleCreateBlob}>Create a Blob</DropdownItem>
                <DropdownItem onClick={this.props.toggleCreateSuite}>Create a Suite</DropdownItem>
            </div>
        )
    }

}

export default DropdownMenu;
