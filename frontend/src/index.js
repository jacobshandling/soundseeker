import React from 'react'
import ReactDOM from 'react-dom'

class SoundSeekerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            userSuiteLinks: [],
            curSuite: null,
            curBlob: null,
            error: null,
        };
    }

    componentDidMount() {

        fetch(`http://127.0.0.1:8000/api/users/${userID}/`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        userSuiteLinks: result.user_suites,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                }
            )
                }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }
        else if (!this.state.isLoaded) {
            return <div>Loading. . .</div>;
        } else {
            return (
                <div>
                    <MainContent
                        userSuiteLinks = {this.state.userSuiteLinks}
                    />
                </div>
            )
        }
    }
}


class MainContent extends React.Component {

    render() {
        const content = this.props.curSuite ? <Suite suite={this.props.curSuite} /> : <SuiteList userSuiteLinks={this.props.userSuiteLinks} />;
        return (
            <div>
                {content}
            </div>
        );
    }
}

class SuiteList extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.userSuiteLinks}</p>
            </div>
        )
    }
}

class Suite extends React.Component {

}

function App() {
    return (
        <div class="card">
            <SoundSeekerApp />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#react-root')
)