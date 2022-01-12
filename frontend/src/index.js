import React from 'react'
import ReactDOM from 'react-dom'

class SoundSeekerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            userSuites: [],
            curSuiteID: null,
            curBlob: null,
            error: null,
        };

        this.handleSuiteClick = this.handleSuiteClick.bind(this);
    }


    componentDidMount() {

        fetch(`http://127.0.0.1:8000/api/users/${userID}/`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        userSuites: result.user_suites,
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

    handleSuiteClick(suiteID) {
        this.setState({
            curSuiteID: suiteID
        });
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading. . .</div>;
        } else {
            return (
                <div>
                    <MainContent
                        userSuites = {this.state.userSuites}
                        handleSuiteClick = {suiteID => this.handleSuiteClick(suiteID)}
                    />
                </div>
            )
        }
    }
}


class MainContent extends React.Component {

    render() {
        const content = this.props.curSuiteID ?
            <Suite suiteID={this.props.curSuiteID} /> : <SuiteList userSuites={this.props.userSuites} handleSuiteClick= {this.props.handleSuiteClick} />;

        return (
            <div>
                {content}
            </div>
        );
    }
}

class SuiteList extends React.Component {
    render() {
        const suites = [];

        this.props.userSuites.forEach((suiteObject) => {
            suites.push(
                <li key={suiteObject.id}>
                    <button className="listed-suite" onClick={() => this.props.handleSuiteClick(suiteObject.id)}>{suiteObject.name}</button>
                </li>
            );
        });

        return ( 
            <ul>
                {suites}
            </ul>
        );
    }
}

class Suite extends React.Component {

}

function App() {
    return (
        <div className="card">
            <SoundSeekerApp />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#react-root')
)