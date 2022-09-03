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
                <nav id="breadcrumbs" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" aria-current="page">
                            <h2><a href="#" onClick={this.props.toggleAllSuitesView}>Suites</a></h2>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <h2><a href="#" onClick={() => {this.props.toggleViewSuite(this.props.curSuite)}}>{this.props.curSuite.name}</a></h2>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <h2>{this.props.curBlob.name}</h2>
                        </li>
                    </ol>
                </nav>
                <ul id="audioclips" className="content-list">
                    {clipRenders}
                </ul>
            </div>
        )
    }
}

export default AudioClipLevelView;