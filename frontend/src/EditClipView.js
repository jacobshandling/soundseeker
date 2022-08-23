import React from 'react';

class EditClipView extends React.Component {

    render() {
        const clip = this.props.clip;
        return(
            <section id="edit-clip" className="action-view">
                <h3>Edit clip "{clip.name}"</h3>
                <div className="form-group">
                    <label htmlFor="new-name">New name:</label>
                    <input id="new-name" className="form-control" type="text" defaultValue={clip.name} />
                </div>
                <div classname="form-group">
                    <button type="button" className="btn btn-primary" onClick={this.props.onEditClip}>Submit</button>
                </div>
                <button className="btn btn-danger" onClick={this.props.onDeleteClip}>Delete Clip"{clip.name}"</button>
            </section>
        )
    }
}

export default EditClipView;