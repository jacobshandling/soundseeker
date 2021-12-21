import React from 'react'
import ReactDOM from 'react-dom'


// class ClickyButton extends React.Component {

//     render() {
//         return (
//             <div className='clicky-button'>
//                 <button onClick={this.props.onClick}>
//                     Click!
//                 </button>
//             </div>
//         )
//     }
// }

// class ClickyTestApp extends React.Component {
    
//     renderClickyButton(message) {
//         return(
//             <ClickyButton message={message} onClick={() => alert(message)} />
//         );
//     }

//     render() {
//         let clickyButtons = [];
//         this.props.messages.forEach(message => {
//             clickyButtons.push(this.renderClickyButton(message)) 
//         });
//         return (
//             <div>
//                 {clickyButtons}
//             </div>
//         )
//     }
// }

class SoundSeekerApp extends React.Component {
    render() {
        return (
            <div>
                <h1>SoundSeeker</h1>
                <UserAuth />
                <ContentArea />
            </div>
        )
    }
}

class UserAuth extends React.Component {
    render() {
        return(
            <div>

            </div>
        )
    }
}

class ContentArea extends React.Component {
    render() {
        return(
            <div>

            </div>
        )
    }
}

function App() {
    // const messages = ["woop", "dee", "doo"];
    return (
        <div>
            {/* <ClickyTestApp messages={messages} /> */}
            <SoundSeekerApp />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#react-root')
)