import React from 'react';
import axios from 'axios';

// TODO: Implement separate API Service using axios
// import ApiService from './ApiService';
import SuiteLevelView from './SuiteLevelView';
import ActionBar from './ActionBar';
import ActionItem from './ActionItem';
import PlusIcon from './icons/plus.svg';
import DropdownMenu from './DropdownMenu';
import FileUploadView from './FileUploadView';

// dev setup API
const APIURL = "http://127.0.0.1:8000/api";

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
            clipUploadView: false,
            dropdownIsOpen: false,
            selectedFile: null

        };

        this.handleSuiteClick = this.handleSuiteClick.bind(this);
        this.handleBlobClick = this.handleBlobClick.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.toggleClipUpload = this.toggleClipUpload.bind(this);
    }


    componentDidMount() {

        fetch(`${APIURL}/users/${userID}/`)
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

    toggleClipUpload() {
        this.setState(
            {clipUploadView: true}
        );
    }
    onFileSelect(event) {
        this.setState(
            {selectedFile: event.target.files[0]}
        );
    }

    onFileUpload() {
        const formData = new FormData();
        formData.append(
            "userFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);

        axios.post(`${APIURL}/user-file-upload`, formData);

        // TODO: display confirmation info to user
        // TODO: confirm that react automatically re-renders AudioClipViews

        // If successful, say so and forward to (last location or homepage)
        this.setState(
            {clipUploadView: false}
        );
    };

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }

        if (!this.state.isLoaded) {
            return <div>Loading. . .</div>;
        } 

        if (this.state.clipUploadView) {
            var mainContent = 
                <FileUploadView
                    onFileSelect={this.onFileSelect} 
                    onFileUpload={this.onFileUpload} 
                />;
        } else {
            var mainContent = 
                <SuiteLevelView
                    handleSuiteClick = {suiteObject => this.handleSuiteClick(suiteObject)}
                    handleBlobClick = {blobObject => this.handleBlobClick(blobObject)}
                    curSuite = {this.state.curSuite}
                    userSuiteMap = {this.state.userSuiteMap}
                    curBlob = {this.state.curBlob}
                />;
        }

            return (
                <div>
                    <ActionBar>
                        <ActionItem
                            icon={<PlusIcon />} 
                            toggleDropdown={this.toggleDropdown}
                            dropdownIsOpen={this.state.dropdownIsOpen} 

                        >
                            <DropdownMenu
                                toggleClipUpload={this.toggleClipUpload}
                                onFileSelect={this.onFileSelect}
                                uploadFile={this.uploadFile}
                             />
                        </ActionItem>
                    </ActionBar>
                    {mainContent}
                </div>
            )
        }
    }

export default SoundSeekerApp;