import React from "react";

import AudioClipLevelView from './AudioClipLevelView'
import BlobList from './BlobList'

class BlobLevelView extends React.Component {

    render() {
        const suite = this.props.curSuite;
        const suiteBlobMap = suite.blobs.reduce((map, obj) => {
            map[obj.id] = obj;
            return map;
        }, {})

        const mainContent = this.props.curBlob ?
            <AudioClipLevelView 
                curBlob = {this.props.curBlob}
            />
            :
            <div>
                <h2>{this.props.curSuite.name} / Blobs</h2>
                <BlobList
                    suiteBlobMap={suiteBlobMap} 
                    handleBlobClick= {this.props.handleBlobClick} 
                />;
            </div>

        return (mainContent);
    }


}

export default BlobLevelView;