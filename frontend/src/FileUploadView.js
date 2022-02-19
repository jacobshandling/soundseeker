import React from 'react';

class FileUploadView extends React.Component {
    renderBlobOptions(userBlobs) {
        const blobOptions = [];
        userBlobs.forEach(userBlob => {
            blobOptions.push(
                <label for={userBlob.name}>{userBlob.name}
                    <input id={userBlob.name} key={userBlob.id} type="checkbox" name="blob-options" value={userBlob.id} />
                </label>
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
                {blobOptions}
                <button onClick={this.props.onFileUpload}>Submit</button>
            </form>
        )
    }

}

export default FileUploadView;