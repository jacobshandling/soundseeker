import React from "react";

class CreateClipView extends React.Component {
  renderBlobOptions(userBlobMap) {
    const blobOptions = [];
    for (let key in userBlobMap) {
      const userBlob = userBlobMap[key];
      blobOptions.push(
        <label htmlFor={userBlob.name} key={userBlob.id}>
          <input
            id={userBlob.id}
            className="select-checkbox"
            key={userBlob.id}
            type="checkbox"
            name="blob-options"
            value={userBlob.id}
          />
          <p>{userBlob.name}</p>
        </label>
      );
    }
    return blobOptions;
  }

  render() {
    const blobOptions = this.renderBlobOptions(this.props.userBlobMap);
    return (
      <section id="clip-upload" className="action-view">
        <div className="form-group">
          <input
            id="selected-clip"
            className="form-control"
            type="file"
            onChange={this.props.onClipSelect}
            required
          />
        </div>
        <div className="form-group">
          <input
            id="clip-name"
            className="form-control"
            type="text"
            placeholder="Enter clip name"
          />
        </div>
        <fieldset
          className="form-group association-options"
          id="new-blob-associations"
        >
          <label htmlFor="new-blob-associations">
            Blobs to associate this clip with:
          </label>
          {blobOptions}
        </fieldset>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.props.onCreateClip}
          >
            Upload
          </button>
        </div>
      </section>
    );
  }
}

export default CreateClipView;
