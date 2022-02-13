import React from 'react';
import axios from 'axios';

// TODO: Implement separate API Service using axios
// import ApiService from './ApiService';
import SuiteLevelView from './SuiteLevelView';
import ActionBar from './ActionBar';
import ActionItem from './ActionItem';
import PlusIcon from './icons/plus.svg';
import DropdownMenu from './DropdownMenu';

// dev setup API
const APIURL = "http://127.0.0.1:8000/api/";

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
            dropdownIsOpen: false,
            selectedFile: null
        };

        this.handleSuiteClick = this.handleSuiteClick.bind(this);
        this.handleBlobClick = this.handleBlobClick.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
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

    toggleDropdown() {
        this.setState(
            {dropdownIsOpen: !this.state.dropdownIsOpen}
        );
    }

    selectFile(event) {
        this.setState(
            {selectedFile: event.target.files[0]}
        );
    }

    uploadFile() {
        const formData = new FormData();
        formData.append(
            "userFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.loag(this.state.selectedFile);

        axios.post(APIURL + "user-file-upload", formData);

        // TODO: display confirmation info to user
        // TODO: confirm that react automatically re-renders AudioClipViews
    };

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading. . .</div>;
        } else {
            return (
                <div>
                    <ActionBar>
                        <ActionItem
                            icon={<PlusIcon />} 
                            toggleDropdown={this.toggleDropdown}
                            dropdownIsOpen={this.state.dropdownIsOpen} 
                            selectFile={this.selectFile}
                            uploadFile={this.uploadFile}

                        >
                            <DropdownMenu></DropdownMenu>
                        </ActionItem>
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