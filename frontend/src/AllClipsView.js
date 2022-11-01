import React from "react";
import AudioClip from "./AudioClip";

class AllClipsView extends React.Component {
  render() {
    const clipMap = this.props.userClipMap;
    const clipRenders = [];
    for (let key in clipMap) {
      clipRenders.push(
        <AudioClip
          key={key}
          clipObject={clipMap[key]}
          toggleEditClip={this.props.toggleEditClip}
        />
      );
    }
    return (
      <div id="all-clips-view" className="content-view">
        <h2>All Clips</h2>
        <ul id="audioclips" className="content-list">
          {clipRenders}
        </ul>
      </div>
    );
  }
}

export default AllClipsView;
