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
                    {/* <MainContent
                        userSuites = {this.state.userSuites}
                        handleSuiteClick = {suiteID => this.handleSuiteClick(suiteID)}
                        curSuiteID = {this.state.curSuiteID}
                    /> */}
                    <SuiteLevelView
                        userSuites = {this.state.userSuites}
                        handleSuiteClick = {suiteID => this.handleSuiteClick(suiteID)}
                        curSuiteID = {this.state.curSuiteID}
                    />
                </div>
            )
        }
    }
}


class MainContent extends React.Component {

}

class SuiteLevelView extends React.Component {

    render() {
        const content = this.props.curSuiteID ?
            <BlobLevelView 
                suiteID={this.props.curSuiteID}
            />
            :
            <SuiteList
                userSuites={this.props.userSuites} 
                handleSuiteClick= {this.props.handleSuiteClick} 
            />;

        return (content);
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

class BlobLevelView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            suiteBlobs: [],
            curBlobID: null,
            error: null,
        };

        this.handleBlobClick = this.handleBlobClick.bind(this);
    }

    handleBlobClick(blobID) {
        this.setState({
            curBlobID: blobID
        });
    }

    componentDidMount() {

        fetch(`http://127.0.0.1:8000/api/suites/${this.props.suiteID}/`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        suiteBlobs: result.blobs
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
        const content = this.props.curBlobID ?
            <AudioClipLevelView 
                blobID={this.props.curBlobID}
            />
            :
            <BlobList
                suiteBlobs={this.state.suiteBlobs} 
                handleBlobClick= {this.props.handleBlobClick} 
            />;

        return (content);
    }


}

class BlobList extends React.Component {
    render() {
        const blobs = [];

        this.props.suiteBlobs.forEach((blobObject) => {
            blobs.push(
                <li key={blobObject.id}>
                    <button className="listed-blob" onClick={() => this.props.handleBlobClick(blobObject.id)}>{blobObject.name}</button>
                </li>
            );
        });

        return ( 
            <ul>
                {blobs}
            </ul>
        );
    }
}

function App() {
    return (
        <div className="card">
            <SoundSeekerApp />
        </div>
    );
}

class AudioClipLevelView extends React.Component {

}

ReactDOM.render(
    <App />,
    document.querySelector('#react-root')
)