import React from 'react';

class AudioClip extends React.Component {

    render() {
        const clip = this.props.clipObject;
        const clipURL = clip['file'];

        return (
            <li className="audioclip listed-content" key={clip.id}>
                <h3>{clip.name}</h3>
                <audio controls>
                    <source src={clipURL} type="audio/mpeg" />
                </audio>
                <span className="listed-content-actions">
                    <button onClick={() => this.props.toggleEditClip(clip)}>Edit</button>
                </span>
            </li>
        )
    }
}

export default AudioClip;
