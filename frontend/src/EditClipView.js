import React from 'react';

class EditClipView extends React.Component {

    render() {
        const clip = this.props.clipObject;
        return(
            <section id="edit-clip" className="action-view">
                <button onClick={this.props.onDeleteClip}>Delete Clip"{clip.name}"</button>
            </section>
        )
    }
}

export default EditClipView;