import React from 'react';

import BlobLevelView from './BlobLevelView'
import SuiteList from './SuiteList'

class SuiteLevelView extends React.Component {

    render() {
        const mainContent = this.props.curSuite ?
            <BlobLevelView 
                curSuite = {this.props.curSuite}
                curBlob = {this.props.curBlob}
                handleBlobClick = {this.props.handleBlobClick}
                toggleEditBlob = {this.props.toggleEditBlob}
            />
            :
            <div className="suite-list content-view">
                <h2>Suites</h2>
                <SuiteList
                    userSuiteMap = {this.props.userSuiteMap} 
                    handleSuiteClick = {this.props.handleSuiteClick} 
                    toggleEditSuite = {this.props.toggleEditSuite}
                />
            </div>
        ;

        return (mainContent);
    }

}

export default SuiteLevelView;
