import React from 'react';

class FileUploadView extends React.Component {

    renderBlobOptions(userBlobMap) {
        const blobOptions = [];
        for (let key in userBlobMap) {
            const userBlob = userBlobMap[key];
            blobOptions.push(
                    <label htmlFor={userBlob.name} key={userBlob.id}>
                        <input id={userBlob.id} className="select-checkbox" key={userBlob.id} type="checkbox" name="blob-options" value={userBlob.url} />
                    <p>{userBlob.name}</p></label>
                    
            )
        };
        return blobOptions;
    }

    render() {
        const blobOptions = this.renderBlobOptions(this.props.userBlobMap);
        return(
            <section id="file-upload" className="action-view">
                <form className="upload-form">
                    <input id="selected-file" className="form-field" type="file" onChange={this.props.onFileSelect} required/>
                    <input id="clip-name" className="form-field" type="text" placeholder='clip name' />
                    <fieldset className="form-field" id="blob-options">
                        <legend>Blobs to associate this clip with (at least 1):</legend> 
                        {blobOptions}
                    </fieldset>
                    <input type="submit" className="form-field" onClick={this.props.onFileUpload} value="Upload" />
                </form>
            </section>
        )
    }

}

export default FileUploadView;