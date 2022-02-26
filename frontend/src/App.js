import React from 'react';

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
                    
                    const userSuiteMap = this.getSuiteMapFromJSON(result);
                    const userBlobs = this.getUserBlobsFromUserSuiteMap(userSuiteMap);
                    // console.log(`userBlobs pre-state-set: ${userBlobs[0].name}`)

                    this.setState({
                        isLoaded: true,
                        userData: result,
                        userSuiteMap: userSuiteMap,
                        userBlobs: userBlobs
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

    getSuiteMapFromJSON(responseAsJSON) {
        return responseAsJSON.user_suites.reduce((map, obj) => {
                                    map[obj.id] = obj;
                                    return map;
                                }, {})
    }

    getUserBlobsFromUserSuiteMap(userSuiteMap) {
        const userBlobs = [];
        for (let key in userSuiteMap) {
            const suite = userSuiteMap[key];
            for (let i = 0; i < suite.blobs.length; i++) {
                const blob = suite.blobs[i]
                userBlobs.push({
                    id: blob.id,
                    name: blob.name,
                })
            }
        }
        return userBlobs;
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
        // const form = document.querySelector('#upload-form');
        // console.log(form);
        // const formData = new FormData(form);
        // console.log(formData);
        // formData.append(
        //     "userFile",
        //     this.state.selectedFile,
        //     this.state.selectedFile.name
        // );
        // console.log(this.state.selectedFile);
        const file = document.querySelector('#selected-file').value;
        const clipName = document.querySelector('#clip-name').value;
        const blobIDs = [];
        document.getElementsByName('blob-options').forEach((checkbox => {
            if (checkbox.checked) {
                blobIDs.push(checkbox.value);
            }
        }));
        console.log(`blobIDs: ${blobIDs}`);
        fetch(`${APIURL}/user-file-upload`, {
            method: 'POST',
            body: JSON.stringify({
                file: file,
                clipname: clipName,
                blobids: blobIDs
            })
        })
        .then(response => {
            alert(response);
            console.log(response);
            })
        .catch(error => {
            alert(error);
            console.log(error);
        })

        // axios.post(`${APIURL}/user-file-upload`, formData)
        // .then(response => {
        //     alert(response);
        //     console.log(response);
        //     })
        // .catch(error => {
        //     alert(error);
        //     console.log(error);
        // })

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
                    userBlobs={this.state.userBlobs}
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
                    <main class="main-content">
                        {mainContent}
                    </main>
                </div>
            )
        }
    }

export default SoundSeekerApp;