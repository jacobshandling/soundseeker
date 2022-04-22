import React from "react";
import Suite from './Suite';

class SuiteList extends React.Component {
    render() {
        const suites = [];

        for (var suiteID in this.props.userSuiteMap) {
            const suiteObject = this.props.userSuiteMap[suiteID];
            suites.push(
                <Suite
                    suite={suiteObject}
                    handleSuiteClick={this.props.handleSuiteClick}
                    toggleEditSuite={this.props.toggleEditSuite}
                />
            );
        }
        return ( 
            <ul className="content-list">
                {suites}
            </ul>
        );
    }
}

export default SuiteList;