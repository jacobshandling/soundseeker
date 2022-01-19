import React from 'react';
import {Howl, Howler} from 'howler';

class AudioClip extends React.Component {
    render() {
        const clipObject = this.props.clipObject;
        var sound = new Howl({
            src: [clipObject.url]
        });

        return (
            <li key={clipObject.id} onClick ={() => {sound.play();}}>
                {clipObject.title}
            </li>
        )
    }
}


export default AudioClip;