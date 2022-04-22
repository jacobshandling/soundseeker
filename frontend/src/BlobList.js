import React from "react";
import Blob from './Blob';

class BlobList extends React.Component {
    render() {
        const blobs = [];

        for (var blobID in this.props.suiteBlobMap) {
            blobs.push(
                <Blob
                    blobObject={this.props.suiteBlobMap[blobID]}
                    handleBlobClick={this.props.handleBlobClick}
                    toggleEditBlob={this.props.toggleEditBlob}
                />
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