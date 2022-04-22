import React from "react";
import AudioClip from './AudioClip'

class AudioClipLevelView extends React.Component {

    render() {
        const curSuite = this.props.curSuite
        const curBlob = this.props.curBlob;
        const blobClips = curBlob.clips;

        const clipRenders = [];
        for (var id in blobClips) {
            const clipObject = blobClips[id];
            clipRenders.push(
                <AudioClip 
                    clipObject = {clipObject}
                    toggleEditClip = {this.props.toggleEditClip}
                />
            );
        }
        return (
            <div className="audioclip-level-view content-view">
                <h2>{curSuite.name} / {curBlob.name} / Clips</h2>
                <ul id="audioclips" className="content-list">
                    {clipRenders}
                </ul>
            </div>
        )
    }
}

export default AudioClipLevelView;