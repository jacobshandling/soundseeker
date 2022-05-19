import React from "react";
import Blob from './Blob';

class AllBlobsView extends React.Component {

    render() {
        const blobMap = this.props.userBlobMap
        const blobRenders = [];
        for (let key in blobMap) {
            blobRenders.push(
                <Blob 
                    blobObject = {blobMap[key]}
                    toggleEditBlob = {this.props.toggleEditBlob}
                    toggleViewBlob = {this.props.toggleViewBlob}
                />
            );
        };
        return (
            <div id="all-blobs-view" className="content-view">
                <h2>All Blobs</h2>
                <ul id="blobs" className="content-list">
                    {blobRenders}
                </ul>
            </div>
        )
    }
}

export default AllBlobsView;