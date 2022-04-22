import React from 'react';

class EditBlobView extends React.Component {

    render() {
        const blob = this.props.blobObject;
        return(
            <section id="edit-blob" className="action-view">
                <button onClick={this.props.onDeleteBlob}>Delete Blob "{blob.name}"</button>
            </section>
        )
    }
}

export default EditBlobView;