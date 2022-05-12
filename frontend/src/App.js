import React from 'react';

import SuiteLevelView from './SuiteLevelView';
import ActionBar from './ActionBar';
import ActionItem from './ActionItem';
import PlusIcon from './icons/plus.svg';
import DropdownMenu from './DropdownMenu';
import CreateClipView from './CreateClipView';
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
            userSuiteMap: null,
            userBlobMap: null,
            curSuite: null,
            curBlob: null,
            dropdownIsOpen: false,
            actionView: null,
            selectedClip: null

        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        
        this.toggleCreateClip = this.toggleCreateClip.bind(this);
        this.toggleCreateBlob = this.toggleCreateBlob.bind(this);
        this.toggleCreateSuite = this.toggleCreateSuite.bind(this);

        this.onClipSelect = this.onClipSelect.bind(this);

        this.onCreateClip = this.onCreateClip.bind(this);
        this.onCreateBlob = this.onCreateBlob.bind(this);
        this.onCreateSuite = this.onCreateSuite.bind(this);
        
        this.toggleViewSuite = this.toggleViewSuite.bind(this);
        this.toggleEditSuite = this.toggleEditSuite.bind(this);
        this.onEditSuite = this.onEditSuite.bind(this);
        this.onDeleteSuite = this.onDeleteSuite.bind(this);
        
        this.toggleViewBlob = this.toggleViewBlob.bind(this);
        this.toggleEditBlob = this.toggleEditBlob.bind(this);
        this.onEditBlob = this.onEditBlob.bind(this);
        this.onDeleteBlob = this.onDeleteBlob.bind(this);

        this.toggleEditClip = this.toggleEditClip.bind(this);
        this.onEditClip = this.onEditClip.bind(this);
        this.onDeleteClip = this.onDeleteClip.bind(this);
    }

    componentDidMount() {
        this.getAndSetFreshUserDataMaps();
    }
    
    // Methods for fetching and parsing user data from server
    
    getAndSetFreshUserDataMaps() {
        fetch(`${APIURL}/users/${userID}/`)
            .then(response => response.json())
            .then((result) => {
    
                    this.setState({
                        isLoaded: true,
                        userSuiteMap: this.getIDMapFromObjArray(result.user_suites),
                        userBlobMap: this.getIDMapFromObjArray(result.user_blobs),
                        userClipMap: this.getIDMapFromObjArray(result.user_clips),
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

    getIDMapFromObjArray(obj_array) {
        return obj_array.reduce((map, obj) => {
                                    map[obj.id] = obj;
                                    return map;
                                }, {})
    }

    // Handlers for navigating through layers of content (suites, blobs, clips)

    toggleViewSuite(suiteObject) {
        this.setState({
            curSuite: suiteObject
        });
    }

    toggleViewBlob(blobObject) {
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

    toggleCreateClip() {
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

    onClipSelect(event) {
        this.setState(
            {selectedClip: event.target.files[0]}
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

    onCreateClip() {
        const csrftoken = this.getCookie('csrftoken');

        // gather data for upload
        const file = this.state.selectedClip;
        const clipName = document.querySelector('#clip-name').value;
        const blobIDs = [];
        document.getElementsByName('blob-options').forEach((checkbox => {
            if (checkbox.checked) {
                blobIDs.push(checkbox.value);
            }
        }));

        if (!file) {
            alert("Select a clip to upload");
            return;
        }

        // create formData instance
        const formData = new FormData();
        formData.append('name', clipName);
        formData.append('blobs', blobIDs); 
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
            
            // prepare new local data
            const updatedUserBlobMap = { ...this.state.userBlobMap };
            blobIDs.forEach(blobID => {
                updatedUserBlobMap[blobID].clips.push(result.id)
            });
            const updatedUserClipMap = { ...this.state.userClipMap };
            updatedUserClipMap[result.id] = result;
            
            // set new data as state and return to previous view
            this.setState(
                {
                    actionView: null,
                    userClipMap: updatedUserClipMap,
                    userBlobMap: updatedUserBlobMap
                }
                );

            alert(`Uploaded ${clipName} successfully`);
        })

        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    };

    onDeleteClip() {
        const csrftoken = this.getCookie('csrftoken');
        const clip = this.state.curClip;

        fetch(clip.url, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': csrftoken },
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Delete clip upload error – response not ok');
            }
            return;
        }).then(result => {
            alert(`Deleted clip ${clip.name} successfully`);
            
            // remove clip from Blob and Clip maps, then return to normal view
            const updatedUserClipMap = {...this.state.userClipMap};
            delete updatedUserClipMap[clip.id];

            const updatedUserBlobMap = {...this.state.userBlobMap};
            clip.blobs.forEach((blobID) => {
                // find the index of the deleted clip's id in the blob's list of clip IDs
                const iDeletedClip = updatedUserBlobMap[blobID].clips.findIndex((clipID) => clipID == clip.id);
                // remove it
                // assumes no duplicate clipIDs in blob.clips   
                updatedUserBlobMap[blobID].clips.splice(iDeletedClip, 1);
                })
            
            this.setState( {
                    curClip: null,
                    actionView: null,
                    userBlobMap: updatedUserBlobMap,
                    userClipMap: updatedUserClipMap
                }
            );

        }).catch(error => {
            console.error('Error:', error);
        });
    }


    onEditClip() {
        const clip = this.state.curClip;
        const csrftoken = this.getCookie('csrftoken');

        const newName = document.querySelector('#new-name').value;
        const clipIDs = [];
        document.getElementsByName('clip-options').forEach((checkbox => {
            if (checkbox.checked) {
                clipIDs.push(checkbox.value);
            }
        }));
        
        if (!newName.length) {
            alert('Enter a clip name');
            return;
        }

        const formData = new FormData();
        formData.append('name', newName);
        formData.append('blobs', clip.blobs);  // not giving ability to edit this for now

        fetch(clip.url, {
            method: 'PUT',
            headers: { 'X-CSRFToken': csrftoken },
            body: formData
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Edit clip upload error – response not ok');
            }
            return response.json();
        })
        .then(result => {
            this.getAndSetFreshUserDataMaps(); 
            this.setState({actionView: null});
            alert(`Edited clip succcessfully`);
        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }

    onCreateBlob() {
        const csrftoken = this.getCookie('csrftoken');

        // gather data for upload
        const blobName = document.querySelector('#blob-name').value;
        const suiteIDs = [];
        document.getElementsByName('suite-options').forEach((checkbox => {
            if (checkbox.checked) {
                suiteIDs.push(checkbox.value);
            }
        }));

        // validate
        if (!blobName.length) {
            alert("Enter a name for your new Blob");
            return;
        }
        if (!suiteIDs.length) {
            alert("Choose at least 1 Suite to associate your new Blob with");
            return;
        }

        // create formData instance
        const formData = new FormData();
        formData.append('name', blobName);
        formData.append('suites', suiteIDs);

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
            
            // add new blob to local state and return to previous view
            const updatedUserSuiteMap = { ...this.state.userSuiteMap }
            suiteIDs.forEach(suiteID => {
                updatedUserSuiteMap[suiteID].blobs.push(result.id);
            })
            const updatedUserBlobMap = { ...this.state.userBlobMap };
            updatedUserBlobMap[result.id] = result;
            this.setState(
                {
                    actionView: null,
                    userSuiteMap: updatedUserSuiteMap,
                    userBlobMap: updatedUserBlobMap
                }
                );
            alert(`Created new blob ${blobName} successfully`);
        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }

    onDeleteBlob() {
        const csrftoken = this.getCookie('csrftoken');

        const blob = this.state.curBlob;

        fetch(blob.url, {
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
            alert(`Deleted blob ${blob.name} successfully`);
            
            // Remove blob from Suite, Blob, and Clip maps and return to previous view

            const updatedUserSuiteMap = {...this.state.userSuiteMap};
            blob.suites.forEach((suiteID) => {
                // find the index of the deleted blob's id in the suite's list of blob IDs
                const iDeletedBlob = updatedUserSuiteMap[suiteID].blobs.findIndex((blobID) => blobID == blob.id);
                // remove it
                // assumes no duplicate clipIDs in blob.clips   
                updatedUserSuiteMap[suiteID].blobs.splice(iDeletedBlob, 1);
                })

            const updatedUserBlobMap = {...this.state.userBlobMap};
            delete updatedUserBlobMap[blob.id];

            const updatedUserClipMap = {...this.state.userClipMap};
            blob.clips.forEach((clipID) => {
                // find the index of the deleted blob's id in the clip's list of blob IDs
                const iDeletedBlob = updatedUserClipMap[clipID].blobs.findIndex((blobID) => blobID == blob.id);
                // remove it
                // assumes no duplicate blobIDs in clip.blobs   
                updatedUserClipMap[clipID].blobs.splice(iDeletedBlob, 1);
                })

            
            this.setState( {
                    curBlob: null,
                    actionView: null,
                    userSuiteMap: updatedUserSuiteMap,
                    userBlobMap: updatedUserBlobMap,
                    userClipMap: updatedUserClipMap
                }
            );

        }).catch(error => {
            console.error('Error:', error);
        });
    }

    onEditBlob() {
        const blob = this.state.curBlob;
        const csrftoken = this.getCookie('csrftoken');

        const newName = document.querySelector('#new-name').value;
        const clipIDs = [];
        document.getElementsByName('clip-options').forEach((checkbox => {
            if (checkbox.checked) {
                clipIDs.push(checkbox.value);
            }
        }));
        
        if (!newName.length) {
            alert('Enter a blob name');
            return;
        }
        if (!clipIDs.length) {
            alert('Associate the blob with at least one audioclip');
            return;
        }

        const formData = new FormData();
        formData.append('name', newName);
        formData.append('clips', clipIDs);
        formData.append('suites', blob.suites);  // not giving ability to edit this for now

        fetch(blob.url, {
            method: 'PUT',
            headers: { 'X-CSRFToken': csrftoken },
            body: formData
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error('Edit blob upload error – response not ok');
            }
            return response.json();
        })
        .then(result => {
            this.getAndSetFreshUserDataMaps(); 
            this.setState({actionView: null});
            alert(`Edited blob succcessfully`);
        })
        .catch(error => {
            console.error('Error with fetch operation:', error);
        });
    }

    onCreateSuite() {
        const csrftoken = this.getCookie('csrftoken');
        const suiteName = document.querySelector('#suite-name').value;
        if (!suiteName.length) {
            alert("Please enter a name for your new Suite");
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

        fetch(suite.url, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': csrftoken },
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Delete suite upload error – response not ok');
            }
            return;
        }).then(result => {
            alert(`Deleted suite ${suite.name} successfully`);
            
            // Remove Suite from Suite and Blob maps, and return to previous view
            const updatedUserSuiteMap = {...this.state.userSuiteMap};
            delete updatedUserSuiteMap[suite.id];

            const updatedUserBlobMap = {...this.state.userBlobMap};
            suite.blobs.forEach((blobID) => {
                // find the index of the deleted suite's id in the blob's list of suite IDs
                const iDeletedSuite = updatedUserBlobMap[blobID].suites.findIndex((suiteID) => suiteID == suite.id);
                // remove it
                // assumes no duplicate suiteIDs in blob.suites   
                updatedUserBlobMap[blobID].suites.splice(iDeletedSuite, 1);
                });
            
            this.setState(
                {
                    curSuite: null,
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

    onEditSuite() {
        const suite = this.state.curSuite;
        const csrftoken = this.getCookie('csrftoken');

        const newName = document.querySelector('#new-name').value;
        const blobIDs = [];
        document.getElementsByName('blob-options').forEach((checkbox => {
            if (checkbox.checked) {
                blobIDs.push(checkbox.value);
            }
        }));
        
        if (!newName.length) {
            alert('Suite must have a name');
            return;
        }
        if (!blobIDs.length) {
            alert('Suite must have at least one blob');
            return;
        }

        const formData = new FormData();
        formData.append('name', newName);
        formData.append('blobs', blobIDs);

        fetch(suite.url, {
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
            this.getAndSetFreshUserDataMaps(); 
            this.setState({actionView: null});
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
                        <CreateClipView
                            onClipSelect = {this.onClipSelect} 
                            onCreateClip = {this.onCreateClip} 
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
                            userBlobMap = {this.state.userBlobMap}
                            onDeleteSuite = {this.onDeleteSuite}
                            onEditSuite={this.onEditSuite}
                        />;
                    break;
                case 'edit-blob':
                    var mainContent =
                        <EditBlobView
                            blob = {this.state.curBlob}
                            userClipMap = {this.state.userClipMap}
                            onDeleteBlob = {this.onDeleteBlob}
                            onEditBlob={this.onEditBlob}
                        />;
                    break;
                case 'edit-clip':
                    var mainContent =
                        <EditClipView
                            clip = {this.state.curClip}
                            onDeleteClip = {this.onDeleteClip}
                            onEditClip={this.onEditClip}
                        />;
                    break;

            }
        } else {
            var mainContent = 
                <SuiteLevelView
                    toggleViewSuite = {suiteObject => this.toggleViewSuite(suiteObject)}
                    toggleEditSuite = {suiteObject => this.toggleEditSuite(suiteObject)}
                    toggleViewBlob = {blobObject => this.toggleViewBlob(blobObject)}
                    toggleEditBlob = {blobObject => this.toggleEditBlob(blobObject)}
                    toggleEditClip = {clipObject => this.toggleEditClip(clipObject)}
                    curSuite = {this.state.curSuite}
                    curBlob = {this.state.curBlob}
                    userSuiteMap = {this.state.userSuiteMap}
                    userBlobMap = {this.state.userBlobMap}
                    userClipMap = {this.state.userClipMap}
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
                            toggleCreateClip = {this.toggleCreateClip}
                            toggleCreateBlob = {this.toggleCreateBlob}
                            toggleCreateSuite = {this.toggleCreateSuite}
                            onClipSelect = {this.onClipSelect}
                            uploadClip = {this.uploadClip}
                            />
                    </ActionItem>
                    {mainContent}
                </main>
            </div>
        )
    }
}

export default SoundSeekerApp;