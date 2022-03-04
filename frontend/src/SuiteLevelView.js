import React from 'react';

import BlobLevelView from './BlobLevelView'
import SuiteList from './SuiteList'

class SuiteLevelView extends React.Component {

    render() {
        const mainContent = this.props.curSuite ?
            <BlobLevelView 
                curSuite = {this.props.curSuite}
                handleBlobClick = {this.props.handleBlobClick}
                curBlob = {this.props.curBlob}
            />
            :
            <div className="suite-list">
                <h2>Suites</h2>
                <SuiteList
                    userSuiteMap={this.props.userSuiteMap} 
                    handleSuiteClick= {this.props.handleSuiteClick} 
                />
            </div>
        ;

        return (mainContent);
    }

}

export default SuiteLevelView;
