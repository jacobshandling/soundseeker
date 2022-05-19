import React from 'react';

class EditClipView extends React.Component {

    render() {
        const clip = this.props.clip;
        return(
            <section id="edit-clip" className="action-view">
                <h3>Edit clip "{clip.name}"</h3>
                {/* <div id="edit-clip-form" className="form">
                    <legend>New name:</legend>
                    <input id="new-name" className="form-field" type="text" defaultValue={clip.name} />
                    <input type="button" className="form-field" onClick={this.props.onEditClip} value="Submit" />
                </div> */}
                <button onClick={this.props.onDeleteClip}>Delete Clip"{clip.name}"</button>
            </section>
        )
    }
}

export default EditClipView;