import React from "react";
import AudioClip from './AudioClip'

class AudioClipLevelView extends React.Component {

    render() {
        const clipRenders = [];
        this.props.blobClipIDs.forEach((clipID) => {
            clipRenders.push(
                <AudioClip 
                    clipObject = {this.props.userClipMap[clipID]}
                    toggleEditClip = {this.props.toggleEditClip}
                />
            );
        });
        return (
            <div className="audioclip-level-view content-view">
                <h2>{this.props.curSuite.name} / {this.props.curBlob.name} / Clips</h2>
                <ul id="audioclips" className="content-list">
                    {clipRenders}
                </ul>
            </div>
        )
    }
}

export default AudioClipLevelView;