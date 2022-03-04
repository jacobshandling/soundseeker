import React from 'react';

class AudioClip extends React.Component {

    render() {
        const clipObject = this.props.clipObject;
        const clipURL = clipObject['file'];

        return (
            <li className="listed-audioclip">
                <h3>{clipObject['name']}</h3>
                <audio controls>
                    <source src={clipURL} type="audio/mpeg" />
                </audio>
            </li>
        )
    }
}

export default AudioClip;
