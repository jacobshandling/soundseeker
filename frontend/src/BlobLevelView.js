import React from "react";

import AudioClipLevelView from './AudioClipLevelView'
import BlobList from './BlobList'

class BlobLevelView extends React.Component {

    render() {
        const suite = this.props.curSuite;

        const mainContent = this.props.curBlob ?
            <AudioClipLevelView 
                userClipMap = {this.props.userClipMap}
                curBlob = {this.props.curBlob}
                curSuite = {suite}
                toggleEditClip = {this.props.toggleEditClip}
            />
            :
            <div className="blob-list content-view">
                <h2>{suite.name} / Blobs</h2>
                <BlobList
                    userBlobMap = {this.props.userBlobMap}
                    suiteBlobIDs = {suite.blobs} 
                    handleBlobClick = {this.props.handleBlobClick} 
                    toggleEditBlob = {this.props.toggleEditBlob}
                />
            </div>

        return (mainContent);
    }


}

export default BlobLevelView;