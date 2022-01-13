import React from 'react';

// TODO: Implement separate API Service using axios
// import ApiService from './ApiService';
import SuiteLevelView from './SuiteLevelView';

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

export default SoundSeekerApp;