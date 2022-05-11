import React from "react";

import AudioClipLevelView from './AudioClipLevelView'
import BlobList from './BlobList'

class BlobLevelView extends React.Component {

    render() {
        const suite = this.props.curSuite;
        const blob = this.props.curBlob;

        const mainContent = this.props.curBlob ?
            <AudioClipLevelView 
                userClipMap = {this.props.userClipMap}
                blobClipIDs = {blob.clips}
                toggleEditClip = {this.props.toggleEditClip}
                curSuite = {suite}
                curBlob = {blob}
            />
            :
            <div className="blob-list content-view">
                <h2>{suite.name} / Blobs</h2>
                <BlobList
                    userBlobMap = {this.props.userBlobMap}
                    suiteBlobIDs = {suite.blobs} 
                    toggleViewBlob = {this.props.toggleViewBlob} 
                    toggleEditBlob = {this.props.toggleEditBlob}
                />
            </div>

        return (mainContent);
    }


}

export default BlobLevelView;