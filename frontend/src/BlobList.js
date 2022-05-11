import React from "react";
import Blob from './Blob';

class BlobList extends React.Component {
    render() {
        const blobRenders = [];

        this.props.suiteBlobIDs.forEach((blobID) => {
            blobRenders.push(
                <Blob
                    blobObject={this.props.userBlobMap[blobID]}
                    toggleViewBlob={this.props.toggleViewBlob}
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