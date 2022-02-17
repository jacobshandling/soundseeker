import React from 'react';

class FileUploadView extends React.Component {

    render() {
        return(
            <div>
                <input type="file" onChange={this.props.onFileSelect} />
                <button onClick={this.props.onFileUpload}>Submit</button>
            </div>
        )
    }

}

export default FileUploadView;