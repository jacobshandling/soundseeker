import React from 'react';

class FileUploadView extends React.Component {
    renderBlobOptions(userBlobs) {
        const blobOptions = [];
        userBlobs.forEach(userBlob => {
            blobOptions.push(
                    <label htmlFor={userBlob.name} key={userBlob.id}>
                        <input id={userBlob.name} className="blob-select-checkbox" key={userBlob.id} type="checkbox" name="blob-options" value={userBlob.url} />
                    <p>{userBlob.name}</p></label>
                    
            )
        });
        return blobOptions;
    }

    render() {
        const blobOptions = this.renderBlobOptions(this.props.userBlobs);
        return(
            <section id="file-upload">
                <form id="upload-form">
                    <input id="selected-file" className="upload-field" type="file" onChange={this.props.onFileSelect} required/>
                    <input id="clip-name" className="upload-field" type="text" placeholder='clip name' />
                    <div className="upload-field" id="blob-options">
                        <h3>Blobs to associate this clip with:</h3> 
                        {blobOptions}
                    </div>
                    <input type="submit" className="upload-field" onClick={this.props.onFileUpload} value="Upload" />
                </form>
            </section>
        )
    }

}

export default FileUploadView;