import React from "react";

class Blob extends React.Component {
    render() {
        const blob = this.props.blobObject;
        return (
            <li key={blob.id} className="listed-content">
                <h3>{blob.name}</h3>
                <span className="listed-content-actions">
                    <button onClick={() => this.props.toggleViewBlob(blob)}>View</button>
                    <button onClick={() => this.props.toggleEditBlob(blob)}>Edit</button>
                </span>
            </li>
        );
        }
}

export default Blob;