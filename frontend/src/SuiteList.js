import React from "react";

class SuiteList extends React.Component {
    render() {
        const suites = [];

        for (var suiteID in this.props.userSuiteMap) {
            const suiteObject = this.props.userSuiteMap[suiteID];
            suites.push(
                <li key={suiteObject.id} className="listed-content">
                    <h3>{suiteObject.name}</h3>
                    <span className="listed-content-actions">
                        <button onClick={() => this.props.handleSuiteClick(suiteObject)}>View</button>
                        <button onClick={() => this.props.toggleEditSuite(suiteObject)}>Edit</button>
                    </span>
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