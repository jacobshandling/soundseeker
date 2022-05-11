import React from 'react';

class ClipUploadView extends React.Component {

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
                    <p>{userBlob.name}</p></label>
                    
            )
        };
        return blobOptions;
    }

    render() {
        const blobOptions = this.renderBlobOptions(this.props.userBlobMap);
        return(
            <section id="clip-upload" className="action-view">
                <div className="form">
                    <input id="selected-clip" className="form-field" type="file" onChange={this.props.onClipSelect} required/>
                    <input id="clip-name" className="form-field" type="text" placeholder='clip name' />
                    <fieldset className="form-field" id="blob-options">
                        <legend>Blobs to associate this clip with:</legend> 
                        {blobOptions}
                    </fieldset>
                    <input type="button" className="form-field" onClick={this.props.onClipUpload} value="Upload" />
                </div>
            </section>
        )
    }

}

export default ClipUploadView;