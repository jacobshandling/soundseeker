import React from 'react';

class AudioClip extends React.Component {

    render() {
        const clip = this.props.clipObject;
        const clipURL = clip['file'];

        return (
            <li key={clip.id}>
                <div className="card audioclip">
                    <div className="card-body">
                        <h3 className="card-title">{clip.name}</h3>
                    </div>
                    <audio controls className="mx-3">
                        <source src={clipURL} type="audio/mpeg" />
                    </audio>
                    <div className="card-body">
                        <button type="button" className="btn btn-secondary" onClick={() => this.props.toggleEditClip(clip)}>Edit</button>
                    </div>
                </div>
            </li>
        )
    }
}

export default AudioClip;
