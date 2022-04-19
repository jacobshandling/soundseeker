import React from "react";

class BlobList extends React.Component {
    render() {
        const blobs = [];

        for (var blobID in this.props.suiteBlobMap) {
            const blobObject = this.props.suiteBlobMap[blobID];
            blobs.push(
                <li key={blobObject.id}>
                    <button className="listed-content" onClick={() => this.props.handleBlobClick(blobObject)}>{blobObject.name}</button>
                </li>
            );
        }

        blobs.reverse();

        return ( 
            <ul className="content-list">
                {blobs}
            </ul>
        );
    }
}

export default BlobList;