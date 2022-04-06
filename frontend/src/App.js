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
const APIURL = "http://127.0.0.1:8002/api";


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

    
    // Methods for parsing user data on initial load

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
                    url: blob.url,
                    id: blob.id,
                    name: blob.name,
                })
            }
        }
        return userBlobs;
    }


    // Handlers for navigating through layers of content (suites, blobs, clips)

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


    // Dropdown menu selection handlers

    toggleDropdown() {
        this.setState(
            {dropdownIsOpen: !this.state.dropdownIsOpen}
        );
    }

    toggleClipUpload() {
        this.setState(
            {
                clipUploadView: true,
                dropdownIsOpen: !this.state.dropdownIsOpen
            }
        );
    }


    // Clip upload handlers

    onFileSelect(event) {
        this.setState(
            {selectedFile: event.target.files[0]}
        );
    }

    getCookie(name) {
        // get CSRF token from cookie. See https://docs.djangoproject.com/en/4.0/ref/csrf/#acquiring-csrf-token-from-cookie
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    onFileUpload() {

        const csrftoken = this.getCookie('csrftoken');

        // prepare data for upload
        const file = this.state.selectedFile;
        const clipName = document.querySelector('#clip-name').value;
        const blobURLs = [];
        document.getElementsByName('blob-options').forEach((checkbox => {
            if (checkbox.checked) {
                blobURLs.push(checkbox.value);
            }
        }));

        // validate that at least 1 blob has been selected
        if (!blobURLs.length) {
            alert("Please select at least one blob to associate this clip with");
            return;
        }

        // append data to formData instance
        const formData = new FormData();
        formData.append('name', clipName);
        formData.append('blobs', blobURLs); 
        formData.append('file', file);

        // initiate the upload promise
        fetch( `${APIURL}/audioclips/`, {
                method: 'POST',
                headers: { 'X-CSRFToken': csrftoken },
                body: formData
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Upload error – response not ok');
            }
            return response.json();
        })
        .then(result => {
            console.log('Success:', result);
            alert(`Uploaded ${clipName} successfully`);
        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });

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
                <div id="react-wrapper">
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
                    <main id="main-content">
                        {mainContent}
                    </main>
                </div>
            )
        }
    }

export default SoundSeekerApp;