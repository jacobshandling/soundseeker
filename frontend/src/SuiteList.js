import React from "react";

class SuiteList extends React.Component {
    render() {
        const suites = [];

        for (var suiteID in this.props.userSuites) {
            const suiteObject = this.props.userSuites[suiteID];
            suites.push(
                <li key={suiteObject.id}>
                    <button className="listed-suite" onClick={() => this.props.handleSuiteClick(suiteObject)}>{suiteObject.name}</button>
                </li>
            );
            }

        return ( 
            <div>
                <h2>Suites</h2>
                <ul>
                    {suites}
                </ul>
            </div>
        );
    }
}

export default SuiteList;