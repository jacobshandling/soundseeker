import React from "react";

import AudioClipLevelView from './AudioClipLevelView'
import BlobList from './BlobList'

class BlobLevelView extends React.Component {
    // TODO: Define handleBlobClick

    render() {
        const suite = this.props.curSuite;
        const suiteBlobMap = suite.blobs.reduce((map, obj) => {
            map[obj.id] = obj;
            return map;
        }, {})

        const content = this.props.curBlobID ?
            <AudioClipLevelView 
                blobID={this.props.curBlobID}
            />
            :
            <div>
                <h2>{this.props.curSuite.name} / Blobs</h2>
                <BlobList
                    suiteBlobMap={suiteBlobMap} 
                    handleBlobClick= {this.handleBlobClick} 
                />;
            </div>

        return (content);
    }


}

export default BlobLevelView;