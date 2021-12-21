import React from 'react'
import ReactDOM from 'react-dom'


class ClickyButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        alert(this.props.message);
    }

    render() {
        return (
            <div className='ClickyButton'>
                <button onClick={this.handleClick}>
                    Click!
                </button>
            </div>
        )
    }
}

function App() {
    return (
        <div>
            <ClickyButton message='Woop' />
            <ClickyButton message='dee' />
            <ClickyButton message='doo!' />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#react-root')
)