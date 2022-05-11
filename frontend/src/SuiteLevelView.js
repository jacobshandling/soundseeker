import React from 'react';

import BlobLevelView from './BlobLevelView'
import SuiteList from './SuiteList'

class SuiteLevelView extends React.Component {

    render() {
        const mainContent = this.props.curSuite ?
            <BlobLevelView 
                curSuite = {this.props.curSuite}
                curBlob = {this.props.curBlob}
                userBlobMap = {this.props.userBlobMap}
                userClipMap = {this.props.userClipMap}
                toggleViewBlob = {this.props.toggleViewBlob}
                toggleEditBlob = {this.props.toggleEditBlob}
                toggleEditClip = {this.props.toggleEditClip}
            />
            :
            <div className="suite-list content-view">
                <h2>Suites</h2>
                <SuiteList
                    userSuiteMap = {this.props.userSuiteMap} 
                    toggleViewSuite = {this.props.toggleViewSuite} 
                    toggleEditSuite = {this.props.toggleEditSuite}
                />
            </div>
        ;

        return (mainContent);
    }

}

export default SuiteLevelView;
