import React from 'react';

import SuiteLevelView from './SuiteLevelView';
import ActionBar from './ActionBar';
import ActionItem from './ActionItem';
import PlusIcon from './icons/plus.svg';
import DropdownMenu from './DropdownMenu';
import FileUploadView from './FileUploadView';
import CreateBlobView from './CreateBlobView';
import CreateSuiteView from './CreateSuiteView';
import EditSuiteView from './EditSuiteView';
import EditBlobView from './EditBlobView';
import EditClipView from './EditClipView';

const WHEREAMI = process.env.WHEREAMI;
if ( WHEREAMI == 'heroku') {
    // Heroku deployment API
    var APIURL = "https://sound-seeker.herokuapp.com/api";
} else {
    // local development, server running on port 8002
    var APIURL = "http://127.0.0.1:8002/api";
}

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
            actionView: null,

            selectedFile: null

        };

        this.handleSuiteClick = this.handleSuiteClick.bind(this);
        this.handleBlobClick = this.handleBlobClick.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleClipUpload = this.toggleClipUpload.bind(this);
        this.toggleCreateBlob = this.toggleCreateBlob.bind(this);
        this.toggleCreateSuite = this.toggleCreateSuite.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onCreateBlob = this.onCreateBlob.bind(this);
        this.onCreateSuite = this.onCreateSuite.bind(this);

        this.toggleEditSuite = this.toggleEditSuite.bind(this);
        this.onEditSuite = this.onEditSuite.bind(this);
        this.onDeleteSuite = this.onDeleteSuite.bind(this);
        
        this.toggleEditBlob = this.toggleEditBlob.bind(this);
        this.onDeleteBlob = this.onDeleteBlob.bind(this);
        // this.onEditBlob = this.onEditBlob.bind(this);

        this.toggleEditClip = this.toggleEditClip.bind(this);
        this.onDeleteClip = this.onDeleteClip.bind(this);
        // this.onEditClip = this.onEditClip.bind(this);
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
                actionView: 'new-clip',
                dropdownIsOpen: !this.state.dropdownIsOpen
            }
        );
    }
    toggleCreateBlob() {
        this.setState(
            {
                actionView: 'new-blob',
                dropdownIsOpen: !this.state.dropdownIsOpen
            }
        )
    }
    toggleCreateSuite() {
        this.setState(
            {
                actionView: 'new-suite',
                dropdownIsOpen: !this.state.dropdownIsOpen
            }
        )
    }

    // Toggle Edit handlers

    toggleEditSuite(suiteObject) {
        this.setState(
            {
                actionView: 'edit-suite',
                curSuite: suiteObject,
            }
        )
    }
    toggleEditBlob(blobObject) {
        this.setState(
            {
                actionView: 'edit-blob',
                curBlob: blobObject,
            }
        )
    }
    toggleEditClip(clipObject) {
        this.setState(
            {
                actionView: 'edit-clip',
                curClip: clipObject,
            }
        )
    }


    // AJAX handlers

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

        // gather data for upload
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

        if (!file) {
            alert("Please select a file to upload");
            return;
        }
        if (!blobURLs.length) {
            alert("Please select at least one Blob to associate this Clip with");
            return;
        }

        // create formData instance
        const formData = new FormData();
        formData.append('name', clipName);
        formData.append('blobs', blobURLs); 
        formData.append('file', file);


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
                    actionView: null,
                    userBlobMap: updatedUserBlobMap
                }
            );

        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    };
    onDeleteClip() {
        const csrftoken = this.getCookie('csrftoken');

        const clip = this.state.curClip;
        const name = clip.name;
        const id = clip.id;
        const url = clip.url;

        fetch(url, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': csrftoken },
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Delete clip upload error – response not ok');
            }
            return;
        })
        .then(result => {
            alert(`Deleted clip ${name} successfully`);
            
            // Remove clip from local state and return to previous view
            // * Not updating clips buried 2 levels down in userSuiteMap*

            // remove clip from all Blobs that pointed to it
            const updatedUserBlobMap = {...this.state.userBlobMap};
            for (let key in updatedUserBlobMap) {
                const blob = updatedUserBlobMap[key];
                for (let i = 0; i < blob.clips.length; i++) {
                    if (blob.clips[i].id == id) {
                        blob.clips.splice(i, 1);
                        break;  // assumes no duplicate clips
                    }
                }
            }
            
            this.setState(
                {
                    curClip: null,
                    actionView: null,
                    userBlobMap: updatedUserBlobMap
                }
            );

        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }
    onCreateBlob() {
        const csrftoken = this.getCookie('csrftoken');

        // gather data for upload
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
            
            // add new blob to local state and return to previous view
            const updatedUserSuiteMap = { ...this.state.userSuiteMap }
            suiteIDs.forEach(suiteID => {
                updatedUserSuiteMap[suiteID].blobs.push(result);
            })
            const updatedUserBlobMap = { ...this.state.userBlobMap };
            updatedUserBlobMap[result['id']] = result;
            this.setState(
                {
                    actionView: null,
                    userSuiteMap: updatedUserSuiteMap,
                    userBlobMap: updatedUserBlobMap
                }
            );

        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }
    onDeleteBlob() {
        const csrftoken = this.getCookie('csrftoken');

        const blob = this.state.curBlob;
        const name = blob.name;
        const id = blob.id;
        const url = blob.url;

        fetch(url, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': csrftoken },
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Delete blob upload error – response not ok');
            }
            return;
        })
        .then(result => {
            alert(`Deleted blob ${name} successfully`);
            
            // Remove blob from local state and return to previous view

                // remove Blob from all Suites that pointed to it
            const updatedUserSuiteMap = {...this.state.userSuiteMap};
            for (let key in updatedUserSuiteMap) {
                const suite = updatedUserSuiteMap[key];
                for (let i = 0; i < suite.blobs.length; i++) {
                    if (suite.blobs[i].id == id) {
                        suite.blobs.splice(i, 1);
                        break;  // assumes no duplicate Blobs
                    }
                }
            }
                // remove Blob from Blob map
            const updatedUserBlobMap = {...this.state.userBlobMap};
            delete updatedUserBlobMap[id];

            this.setState(
                {
                    curBlob: null,
                    actionView: null,
                    userSuiteMap: updatedUserSuiteMap,
                    userBlobMap: updatedUserBlobMap
                }
            );

        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }
    onCreateSuite() {
        const csrftoken = this.getCookie('csrftoken');
        const suiteName = document.querySelector('#suite-name').value;
        if (!suiteName.length) {
            alert("Please enter a name for your new Blob");
            return;
        }
        const formData = new FormData();
        formData.append('name', suiteName);

        fetch(`${APIURL}/suites/`, {
            method: 'POST',
            headers: { 'X-CSRFToken': csrftoken },
            body: formData
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Create suite upload error – response not ok');
            }
            return response.json();
        })
        .then(result => {
            alert(`Created new suite ${suiteName} successfully`);
            
            // add new Suite to local state and return to previous view
            const updatedUserSuiteMap = { ...this.state.userSuiteMap }
            updatedUserSuiteMap[result.id] = result;
            this.setState(
                {
                    actionView: null,
                    userSuiteMap: updatedUserSuiteMap,
                }
            );

        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }
    onDeleteSuite() {
        const csrftoken = this.getCookie('csrftoken');

        const suite = this.state.curSuite;
        const name = suite.name;
        const id = suite.id;
        const url = suite.url;

        fetch(url, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': csrftoken },
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Delete suite upload error – response not ok');
            }
            return;
        })
        .then(result => {
            alert(`Deleted suite ${name} successfully`);
            
            // Remove Suite from local state and return to previous view
            const updatedUserSuiteMap = { ...this.state.userSuiteMap }
            delete updatedUserSuiteMap[id];
            this.setState(
                {
                    curSuite: null,
                    actionView: null,
                    userSuiteMap: updatedUserSuiteMap,
                }
            );

        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }
    onEditSuite() {
        const suite = this.state.curSuite;
        const url = suite.url;

        const csrftoken = this.getCookie('csrftoken');
        const newName = document.querySelector('#new-name').value;
        const formData = new FormData();
        formData.append('name', newName);

        fetch(url, {
            method: 'PUT',
            headers: { 'X-CSRFToken': csrftoken },
            body: formData
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Edit suite upload error – response not ok');
            }
            return response.json();
        })
        .then(result => {
            
            // add new Suite to local state and return to previous view
            const updatedUserSuiteMap = { ...this.state.userSuiteMap }
            updatedUserSuiteMap[result.id] = result;
            this.setState(
                {
                    curSuite: null,
                    actionView: null,
                    userSuiteMap: updatedUserSuiteMap,
                }
            );
            alert(`Edited suite succcessfully`);
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

        if (this.state.actionView) {
            switch (this.state.actionView) {
                case 'new-clip':
                    var mainContent = 
                        <FileUploadView
                            onFileSelect = {this.onFileSelect} 
                            onFileUpload = {this.onFileUpload} 
                            userBlobMap = {this.state.userBlobMap}
                        />;
                    break;
                case 'new-blob':
                    var mainContent = 
                        <CreateBlobView 
                            onCreateBlob = {this.onCreateBlob}
                            userSuiteMap = {this.state.userSuiteMap}
                        />;
                    break;
                case 'new-suite':
                    var mainContent = 
                        <CreateSuiteView 
                            onCreateSuite = {this.onCreateSuite}
                        />;
                    break;
                case 'edit-suite':
                    var mainContent =
                        <EditSuiteView
                            suite = {this.state.curSuite}
                            onDeleteSuite = {this.onDeleteSuite}
                            onEditSuite={this.onEditSuite}
                        />;
                    break;
                case 'edit-blob':
                    var mainContent =
                        <EditBlobView
                            blobObject = {this.state.curBlob}
                            onDeleteBlob = {this.onDeleteBlob}
                            onEditBlob={this.onEditBlob}
                        />;
                    break;
                case 'edit-clip':
                    var mainContent =
                        <EditClipView
                            clipObject = {this.state.curClip}
                            onDeleteClip = {this.onDeleteClip}
                            onEditClip={this.onEditClip}
                        />;
                    break;

            }
        } else {
            var mainContent = 
                <SuiteLevelView
                    handleSuiteClick = {suiteObject => this.handleSuiteClick(suiteObject)}
                    toggleEditSuite = {suiteObject => this.toggleEditSuite(suiteObject)}
                    handleBlobClick = {blobObject => this.handleBlobClick(blobObject)}
                    toggleEditBlob = {blobObject => this.toggleEditBlob(blobObject)}
                    toggleEditClip = {clipObject => this.toggleEditClip(clipObject)}
                    curSuite = {this.state.curSuite}
                    userSuiteMap = {this.state.userSuiteMap}
                    curBlob = {this.state.curBlob}
                />;
        }

        return (
            <div id="react-wrapper">
                <main id="main-content">
                    <ActionItem
                        icon = {<PlusIcon />} 
                        toggleDropdown = {this.toggleDropdown}
                        dropdownIsOpen = {this.state.dropdownIsOpen} 

                    >
                        <DropdownMenu
                            toggleClipUpload = {this.toggleClipUpload}
                            toggleCreateBlob = {this.toggleCreateBlob}
                            toggleCreateSuite = {this.toggleCreateSuite}
                            onFileSelect = {this.onFileSelect}
                            uploadFile = {this.uploadFile}
                            />
                    </ActionItem>
                    {mainContent}
                </main>
            </div>
        )
    }
}

export default SoundSeekerApp;