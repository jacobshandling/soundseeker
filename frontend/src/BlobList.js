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
            <div>
                <h2>{this.props.curSuite.name}/Blobs</h2>
                <ul>
                    {blobs}
                </ul>
            </div>
        );
    }
}

export default BlobList;