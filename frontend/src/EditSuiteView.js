import React from 'react';

class EditSuiteView extends React.Component {

    renderBlobOptions(suiteBlobIDs, userBlobMap) {
        const blobOptions = [];
        for (let blobID in userBlobMap) {
            const blob = userBlobMap[blobID];
            const input = suiteBlobIDs.includes(blob.id) ?
                        <input 
                            id={blob.id} 
                            className="select-checkbox" 
                            key={blob.id} 
                            type="checkbox" 
                            name="blob-options" 
                            value={blob.id} 
                            defaultChecked
                        />
                        :
                        <input 
                            id={blob.id} 
                            className="select-checkbox" 
                            key={blob.id} 
                            type="checkbox" 
                            name="blob-options" 
                            value={blob.id} 
                        />;

            blobOptions.push(
                    <label htmlFor={blob.name} key={blob.id}>
                        {input}
                    <p>{blob.name}</p></label>
                    
            );
        };
        return blobOptions;
    }

    render() {
        const suite = this.props.suite;
        const blobOptions = this.renderBlobOptions(suite.blobs, this.props.userBlobMap);
        return(
            <section id="edit-suite" className="action-view">
                <h3>Edit suite "{suite.name}"</h3>
                <div className="form-group">
                    <label htmlFor="new-name">New name:</label>
                    <input id="new-name" className="form-control" type="text" defaultValue={suite.name} />
                </div>
                <fieldset className="form-group" id="new-blob-associations">
                    <label htmlFor="new-blob-associations">Blobs of this Suite (at least 1):</label> 
                    {blobOptions}
                </fieldset>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={this.props.onEditSuite}>Submit</button>
                </div>
                <button className="btn btn-danger" onClick={this.props.onDeleteSuite}>Delete "{suite.name}"</button>
            </section>
        )
    }

}

export default EditSuiteView;