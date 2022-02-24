import React from 'react';

class FileUploadView extends React.Component {
    renderBlobOptions(userBlobs) {
        const blobOptions = [];
        userBlobs.forEach(userBlob => {
            blobOptions.push(
                    <label for={userBlob.name}>
                        <input id={userBlob.name} className="upload-checkbox" key={userBlob.id} type="checkbox" name="blob-options" value={userBlob.id} />
                    {userBlob.name}</label>
                    
            )
        });
        return blobOptions;
    }

    render() {
        const blobOptions = this.renderBlobOptions(this.props.userBlobs);
        return(
            <form className='fileupload'>
                <input className="upload-field" type="file" onChange={this.props.onFileSelect} />
                <input className="upload-field" type="text" placeholder='clip name' />
                <div className="upload-field" id="blob-options">
                    <p>Blobs to associate this clip with:</p> 
                    {blobOptions}
                </div>
                <button className="upload-field" onClick={this.props.onFileUpload}>Submit</button>
            </form>
        )
    }

}

export default FileUploadView;