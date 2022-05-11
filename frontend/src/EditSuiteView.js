import React from 'react';

class EditSuiteView extends React.Component {

    renderBlobOptions(suiteBlobIDs, userBlobMap) {
        console.log(suiteBlobIDs)
        console.log(userBlobMap)
        const blobOptions = [];
        for (let blobID in userBlobMap) {
            const blob = userBlobMap[blobID];
            const input = suiteBlobIDs.includes(blob.id) ?
                        <input id={blob.id} className="select-checkbox" key={blob.id} type="checkbox" name="blob-options" value={blob.url} defaultChecked/>
                        :
                        <input id={blob.id} className="select-checkbox" key={blob.id} type="checkbox" name="blob-options" value={blob.url} />;

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
                <div id="edit-suite-form" className="form">
                    <legend>New name:</legend>
                    <input id="new-name" className="form-field" type="text" defaultValue={suite.name} />
                    <fieldset className="form-field" id="new-blob-associations">
                        <legend>Blobs of this Suite (at least 1):</legend> 
                        {blobOptions}
                    </fieldset>
                    <input type="button" className="form-field" onClick={this.props.onEditSuite} value="Submit" />
                </div>
                <button className="delete-button" onClick={this.props.onDeleteSuite}>Delete "{suite.name}"</button>
            </section>
        )
    }

}

export default EditSuiteView;