import React from "react";

class SuiteList extends React.Component {
    render() {
        const suites = [];

        for (var suiteID in this.props.userSuiteMap) {
            const suiteObject = this.props.userSuiteMap[suiteID];
            suites.push(
                <li key={suiteObject.id}>
                    <button className="listed-content" onClick={() => this.props.handleSuiteClick(suiteObject)}>{suiteObject.name}</button>
                </li>
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