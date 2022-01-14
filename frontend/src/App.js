import React from 'react';

// TODO: Implement separate API Service using axios
// import ApiService from './ApiService';
import SuiteLevelView from './SuiteLevelView';

class SoundSeekerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            userData: null,
            userSuites: null,
            curSuite: null,
            curBlob: null,
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
                        userData: result,
                        userSuites: result.user_suites.reduce((map, obj) => {
                            map[obj.id] = obj;
                            return map;
                        }, {})
                    }
                    );
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                }
            )
                }

    handleSuiteClick(suiteObject) {
        this.setState({
            curSuite: suiteObject
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
                    <SuiteLevelView
                        userData = {this.state.userData}
                        handleSuiteClick = {curSuite => this.handleSuiteClick(curSuite)}
                        curSuite = {this.state.curSuite}
                        userSuites = {this.state.userSuites}
                    />
                </div>
            )
        }
    }
}

export default SoundSeekerApp;