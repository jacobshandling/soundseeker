import React from "react";

class Blob extends React.Component {
    render() {
        const blob = this.props.blobObject;
        return (
            <li key={blob.id}>
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{blob.name}</h3>
                        <div className="btn-group">
                            <button type="button" className="btn btn-secondary" onClick={() => this.props.toggleViewBlob(blob)}>View</button>
                            <button type="button" className="btn btn-secondary" onClick={() => this.props.toggleEditBlob(blob)}>Edit</button>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default Blob;
