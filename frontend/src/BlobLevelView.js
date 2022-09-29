import React from "react";

import AudioClipLevelView from "./AudioClipLevelView";
import BlobList from "./BlobList";

class BlobLevelView extends React.Component {
  render() {
    const suite = this.props.curSuite;
    const blob = this.props.curBlob;

    const mainContent = this.props.curBlob ? (
      <AudioClipLevelView
        userClipMap={this.props.userClipMap}
        blobClipIDs={blob.clips}
        toggleEditClip={this.props.toggleEditClip}
        curSuite={suite}
        curBlob={blob}
        // for breadcrumb nav
        toggleViewSuite={this.props.toggleViewSuite}
        toggleAllSuitesView={this.props.toggleAllSuitesView}
      />
    ) : (
      <div className="blob-list content-view">
        <nav id="breadcrumbs" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" aria-current="page">
              <h2>
                <a href="#" onClick={this.props.toggleAllSuitesView}>
                  Suites
                </a>
              </h2>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <h2>{suite.name}</h2>
            </li>
          </ol>
        </nav>
        <BlobList
          userBlobMap={this.props.userBlobMap}
          suiteBlobIDs={suite.blobs}
          toggleViewBlob={this.props.toggleViewBlob}
          toggleEditBlob={this.props.toggleEditBlob}
        />
      </div>
    );

    return mainContent;
  }
}

export default BlobLevelView;
