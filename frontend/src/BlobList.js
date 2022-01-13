import React from "react";

class BlobList extends React.Component {
    render() {
        const blobs = [];

        this.props.suiteBlobs.forEach((blobObject) => {
            blobs.push(
                <li key={blobObject.id}>
                    <button className="listed-blob" onClick={() => this.props.handleBlobClick(blobObject.id)}>{blobObject.name}</button>
                </li>
            );
        });

        return ( 
            <ul>
                {blobs}
            </ul>
        );
    }
}

export default BlobList;