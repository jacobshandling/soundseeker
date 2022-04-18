import React from 'react';

import SuiteLevelView from './SuiteLevelView';
import ActionBar from './ActionBar';
import ActionItem from './ActionItem';
import PlusIcon from './icons/plus.svg';
import DropdownMenu from './DropdownMenu';
import FileUploadView from './FileUploadView';
import CreateBlobView from './CreateBlobView';

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
            userBlobMap: null,
            curSuite: null,
            curBlob: null,
            dropdownIsOpen: false,
            createView: null,
            // clipUploadView: false,
            // createBlobView: false,
            selectedFile: null

        };

        this.handleSuiteClick = this.handleSuiteClick.bind(this);
        this.handleBlobClick = this.handleBlobClick.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.toggleClipUpload = this.toggleClipUpload.bind(this);
        this.toggleCreateBlob = this.toggleCreateBlob.bind(this);
        this.onCreateBlob = this.onCreateBlob.bind(this);
    }


    componentDidMount() {

        fetch(`${APIURL}/users/${userID}/`)
            .then(response => response.json())
            .then((result) => {
                    
                    const userSuiteMap = this.getSuiteMapFromJSON(result);
                    const userBlobMap = this.getUserBlobMapFromUserSuiteMap(userSuiteMap);

                    this.setState({
                        isLoaded: true,
                        userData: result,
                        userSuiteMap: userSuiteMap,
                        userBlobMap: userBlobMap
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

    getUserBlobMapFromUserSuiteMap(userSuiteMap) {
        const userBlobMap = {};
        for (let key in userSuiteMap) {
            const suite = userSuiteMap[key];
            for (let key in suite.blobs) {   
                const blob = suite.blobs[key]
                userBlobMap[blob.id] = blob;
            }
        }
        return userBlobMap;
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
                createView: 'clip',
                dropdownIsOpen: !this.state.dropdownIsOpen
            }
        );
    }

    toggleCreateBlob() {
        this.setState(
            {
                createView: 'blob',
                dropdownIsOpen: !this.state.dropdownIsOpen
            }
        )
    }


    // upload handlers

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
        const [blobURLs, blobIDs] = [[], []];  // blobIDs only for locally adding clips after successful upload
        document.getElementsByName('blob-options').forEach((checkbox => {
            if (checkbox.checked) {
                blobURLs.push(checkbox.value);
                blobIDs.push(checkbox.id);
            }
        }));
        console.log(`blobURLs: ${blobURLs}`)
        console.log(`blobIDs: ${blobIDs}`)

        // validate that at least 1 blob has been selected
        if (!blobURLs.length) {
            alert("Please select at least one Blob to associate this Clip with");
            return;
        }

        // append data to formData instance
        const formData = new FormData();
        formData.append('name', clipName);
        formData.append('blobs', blobURLs); 
        formData.append('file', file);

        // initiate the upload promise
        fetch(`${APIURL}/audioclips/`, {
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
            
            // prepare new local data
            const updatedUserBlobMap = { ...this.state.userBlobMap };
            
            blobIDs.forEach(blobID => {
                updatedUserBlobMap[blobID].clips.push(result)
            })

            // set new data as state and return to previous view
            this.setState(
                {
                    createView: null,
                    userBlobMap: updatedUserBlobMap
                }
            );

        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });

    };

    onCreateBlob() {
        const csrftoken = this.getCookie('csrftoken');

        // prepare data for upload
        const blobName = document.querySelector('#blob-name').value;
        const [suiteURLs, suiteIDs] = [[], []]
        document.getElementsByName('suite-options').forEach((checkbox => {
            if (checkbox.checked) {
                suiteURLs.push(checkbox.value);
                suiteIDs.push(checkbox.id);
            }
        }));

        // validate
        if (!blobName.length) {
            alert("Please enter a name for your new Blob");
            return;
        }
        if (!suiteURLs.length) {
            alert("Please select at least one Suite to associate this Blob with")
            return;
        }

        // create formData instance
        const formData = new FormData();
        formData.append('name', blobName);
        formData.append('suites', suiteURLs);

        fetch(`${APIURL}/blobs/`, {
            method: 'POST',
            headers: { 'X-CSRFToken': csrftoken },
            body: formData
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Create blob upload error – response not ok');
            }
            return response.json();
        })
        .then(result => {
            alert(`Created new blob ${blobName} successfully`);
            
            // add new blob to local state

                // update userSuiteMap
            const updatedUserSuiteMap = { ...this.state.userSuiteMap }
            suiteIDs.forEach(suiteID => {
                updatedUserSuiteMap[suiteID].blobs.push(result);
            })

                // update userBlobMap
            const updatedUserBlobMap = { ...this.state.userBlobMap };
            updatedUserBlobMap[result['id']] = result;

            // set new data as state and return to previous view
            this.setState(
                {
                    createView: null,
                    userSuiteMap: updatedUserSuiteMap,
                    userBlobMap: updatedUserBlobMap
                }
            );

        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }

        if (!this.state.isLoaded) {
            return <div>Loading. . .</div>;
        } 

        if (this.state.createView) {
            switch (this.state.createView) {
                case 'clip':
                    var mainContent = 
                        <FileUploadView
                            onFileSelect = {this.onFileSelect} 
                            onFileUpload = {this.onFileUpload} 
                            userBlobMap = {this.state.userBlobMap}
                        />;
                    break;
                case 'blob':
                    var mainContent = 
                        <CreateBlobView 
                            onCreateBlob = {this.onCreateBlob}
                            userSuiteMap = {this.state.userSuiteMap}
                        />;
                    break;
            }
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
                            icon = {<PlusIcon />} 
                            toggleDropdown = {this.toggleDropdown}
                            dropdownIsOpen = {this.state.dropdownIsOpen} 

                        >
                            <DropdownMenu
                                toggleClipUpload = {this.toggleClipUpload}
                                toggleCreateBlob = {this.toggleCreateBlob}
                                onFileSelect = {this.onFileSelect}
                                uploadFile = {this.uploadFile}
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