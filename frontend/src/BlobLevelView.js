import React from "react";

import AudioClipLevelView from './AudioClipLevelView'
import BlobList from './BlobList'

class BlobLevelView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            curSuite: this.props.curSuite,
            suiteBlobs: [],
            curBlobID: null,
            error: null,
        };

        this.handleBlobClick = this.handleBlobClick.bind(this);
    }

    handleBlobClick(blobID) {
        this.setState({
            curBlobID: blobID
        });
    }

    componentDidMount() {

        fetch(`http://127.0.0.1:8000/api/suites/${this.props.curSuite.id}/`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        suiteBlobs: result.blobs
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                }
            )
    }   

    render() {
        const content = this.props.curBlobID ?
            <AudioClipLevelView 
                blobID={this.props.curBlobID}
            />
            :
            <BlobList
                curSuite={this.state.curSuite}
                suiteBlobs={this.state.suiteBlobs} 
                handleBlobClick= {this.props.handleBlobClick} 
            />;

        return (content);
    }


}

export default BlobLevelView;