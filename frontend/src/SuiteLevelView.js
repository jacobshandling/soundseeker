import React from 'react';

import BlobLevelView from './BlobLevelView'
import SuiteList from './SuiteList'

class SuiteLevelView extends React.Component {

    render() {
        const mainContent = this.props.curSuite ?
            <BlobLevelView 
                curSuite={this.props.curSuite}
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
