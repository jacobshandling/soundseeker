import React from 'react';

import BlobLevelView from './BlobLevelView'
import SuiteList from './SuiteList'

class SuiteLevelView extends React.Component {

    render() {
        const mainContent = this.props.curSuite ?
            <BlobLevelView 
                suiteData={this.props.userData.userSuites[this.props.curSuite.id]}
            />
            :
            <SuiteList
                userSuites={this.props.userSuites} 
                handleSuiteClick= {this.props.handleSuiteClick} 
            />;

        return (mainContent);
    }

}

export default SuiteLevelView;
