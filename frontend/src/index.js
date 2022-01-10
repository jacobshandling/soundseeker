import React from 'react'
import ReactDOM from 'react-dom'

class SoundSeekerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'default',
            isLoaded: false,
            curSuite: null,
            userData: {},
            error: null,
        };
    }

    componentDidMount() {

        fetch("http://127.0.0.1:8001/api/")
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        userData: result
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
        // const content = this.state.user ? <MainContent /> : <h2>Welcome. Please log in or register.</h2>
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }
        else if (!this.state.isLoaded) {
            return <div>Loading. . .</div>;
        } else {
            return (
                <div>
                    <h1>SoundSeeker</h1>
                    {/* <RegAuth /> */}
                    {/* {content} */}
                    <MainContent
                        curSuite={this.state.curSuite}
                        userData={this.state.userData}
                    />
                </div>
            )
        }
    }
}


class MainContent extends React.Component {

    render() {
        const content = this.props.curSuite ? <Suite suite={this.props.curSuite} /> : <SuiteList suites={this.props.userData['suites']} />;
        return (
            <div>
                {content}
            </div>
        );
    }
}

class SuiteList extends React.Component {
    render() {
        const suiteList = userData.get
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