import React from 'react';

import BlobLevelView from './BlobLevelView'
import SuiteList from './SuiteList'

class SuiteLevelView extends React.Component {

    render() {
        const content = this.props.curSuiteID ?
            <BlobLevelView 
                suiteID={this.props.curSuiteID}
            />
            :
            <SuiteList
                userSuites={this.props.userSuites} 
                handleSuiteClick= {this.props.handleSuiteClick} 
            />;

        return (content);
    }

}

export default SuiteLevelView;
