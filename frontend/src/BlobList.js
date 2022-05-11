import React from "react";
import Blob from './Blob';

class BlobList extends React.Component {
    render() {
        const blobRenders = [];

        this.props.suiteBlobIDs.forEach((blobID) => {
            blobRenders.push(
                <Blob
                    blobObject={this.props.userBlobMap[blobID]}
                    handleBlobClick={this.props.handleBlobClick}
                    toggleEditBlob={this.props.toggleEditBlob}
                />
            );
        });

        return ( 
            <ul className="content-list">
                {blobRenders}
            </ul>
        );
    }
}

export default BlobList;