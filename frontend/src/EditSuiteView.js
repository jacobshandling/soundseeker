import React from 'react';

class EditSuiteView extends React.Component {

    renderBlobOptions(curSuite) {
        const blobOptions = [];
        curSuite.blobs.forEach(blob => {
            blobOptions.push(
                    <label htmlFor={blob.name} key={blob.id}>
                        <input id={blob.id} className="select-checkbox" key={blob.id} type="checkbox" name="blob-options" value={blob.url} defaultChecked/>
                    <p>{blob.name}</p></label>
                    
            )
        });
        return blobOptions;
    }

    render() {
        const curSuite = this.props.suite;
        const blobOptions = this.renderBlobOptions(curSuite);
        return(
            <section id="edit-suite" className="action-view">
                <h3>Edit suite "{curSuite.name}"</h3>
                <div id="edit-suite-form" className="form">
                    <legend>New name:</legend>
                    <input id="new-name" className="form-field" type="text" placeholder={curSuite.name} />
                    <fieldset className="form-field" id="new-blob-associations">
                        <legend>Blobs of this Suite (at least 1):</legend> 
                        {blobOptions}
                    </fieldset>
                    <input type="button" className="form-field" onClick={this.props.onEditSuite} value="Submit" />
                </div>
                <button className="delete-button" onClick={this.props.onDeleteSuite}>Delete "{curSuite.name}"</button>
            </section>
        )
    }

}

export default EditSuiteView;