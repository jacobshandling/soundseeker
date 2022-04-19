import React from 'react';

class AudioClip extends React.Component {

    render() {
        const clipObject = this.props.clipObject;
        const clipURL = clipObject['file'];

        return (
            <li className="audioclip listed-content">
                <h4>{clipObject['name']}</h4>
                <audio controls>
                    <source src={clipURL} type="audio/mpeg" />
                </audio>
            </li>
        )
    }
}

export default AudioClip;
