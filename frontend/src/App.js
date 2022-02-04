import React from 'react';

// TODO: Implement separate API Service using axios
// import ApiService from './ApiService';
import SuiteLevelView from './SuiteLevelView';
import ActionBar from './ActionBar';
import ActionItem from './ActionItem';

// TODO: Create the below referenced .svg icon, maybe some more
// import { ReactComponent as NewClipIcon } from './icons/newclip.svg';

class SoundSeekerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            userData: null,
            userSuiteMap: null,
            curSuite: null,
            curBlob: null,
        };

        this.handleSuiteClick = this.handleSuiteClick.bind(this);
        this.handleBlobClick = this.handleBlobClick.bind(this);
    }


    componentDidMount() {

        fetch(`http://127.0.0.1:8000/api/users/${userID}/`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        userData: result,
                        userSuiteMap: result.user_suites.reduce((map, obj) => {
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

    handleBlobClick(blobObject) {
        this.setState({
            curBlob: blobObject
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
                    <ActionBar>
                        <ActionItem icon="🔈" />
                        <ActionItem icon="🔈" />
                        <ActionItem icon="🔈" />
                        {/* <ActionItem icon={<NewClipIcon />} /> */}
                    </ActionBar>
                    <SuiteLevelView
                        handleSuiteClick = {suiteObject => this.handleSuiteClick(suiteObject)}
                        handleBlobClick = {blobObject => this.handleBlobClick(blobObject)}
                        curSuite = {this.state.curSuite}
                        userSuiteMap = {this.state.userSuiteMap}
                        curBlob = {this.state.curBlob}
                    />
                </div>
            )
        }
    }
}

export default SoundSeekerApp;