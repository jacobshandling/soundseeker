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
                <div className="form-group">
                    <label htmlFor="new-name">New name:</label>
                    <input id="new-name" className="form-control" type="text" defaultValue={blob.name} />
                </div>
                <fieldset className="form-group association-options" id="new-clip-associations">
                    <label htmlFor="new-clip-associations">Clips of this blob (at least 1):</label> 
                    {clipOptions}
                </fieldset>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={this.props.onEditBlob}>Submit</button>
                </div>
                <button className="btn btn-danger" onClick={this.props.onDeleteBlob}>Delete "{blob.name}"</button>
            </section>
        )
    }

}

export default EditBlobView;