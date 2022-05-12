import React from 'react';

class EditBlobView extends React.Component {

    renderClipOptions(blobClipIDs, userClipMap) {
        const clipOptions = [];
        for (let clipID in userClipMap) {
            const clip = userClipMap[clipID];
            const input = blobClipIDs.includes(clip.id) ?
                        <input 
                            id={clip.id} 
                            className="select-checkbox" 
                            key={clip.id} 
                            type="checkbox" 
                            name="clip-options" 
                            value={clip.id} 
                            defaultChecked
                        />
                        :
                        <input 
                            id={clip.id} 
                            className="select-checkbox" 
                            key={clip.id} 
                            type="checkbox" 
                            name="clip-options" 
                            value={clip.id} 
                        />;

            clipOptions.push(
                    <label htmlFor={clip.name} key={clip.id}>
                        {input}
                    <p>{clip.name}</p></label>
                    
            );
        };
        return clipOptions;
    }

    render() {
        const blob = this.props.blob;
        const clipOptions = this.renderClipOptions(blob.clips, this.props.userClipMap);
        return(
            <section id="edit-blob" className="action-view">
                <h3>Edit blob "{blob.name}"</h3>
                <div id="edit-blob-form" className="form">
                    <legend>New name:</legend>
                    <input id="new-name" className="form-field" type="text" defaultValue={blob.name} />
                    <fieldset className="form-field" id="new-clip-associations">
                        <legend>Clips of this blob (at least 1):</legend> 
                        {clipOptions}
                    </fieldset>
                    <input type="button" className="form-field" onClick={this.props.onEditBlob} value="Submit" />
                </div>
                <button className="delete-button" onClick={this.props.onDeleteBlob}>Delete "{blob.name}"</button>
            </section>
        )
    }

}

export default EditBlobView;