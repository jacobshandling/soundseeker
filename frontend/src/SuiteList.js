import React from "react";
import Suite from './Suite';

class SuiteList extends React.Component {
    render() {
        const suites = [];
        for (var suiteID in this.props.userSuiteMap) {
            suites.push(
                <Suite
                    suiteObject={this.props.userSuiteMap[suiteID]}
                    toggleViewSuite={this.props.toggleViewSuite}
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
