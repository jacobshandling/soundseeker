import React from "react";

class SuiteList extends React.Component {
    render() {
        const suites = [];

        this.props.userSuites.forEach((suiteObject) => {
            suites.push(
                <li key={suiteObject.id}>
                    <button className="listed-suite" onClick={() => this.props.handleSuiteClick(suiteObject.id)}>{suiteObject.name}</button>
                </li>
            );
        });

        return ( 
            <ul>
                {suites}
            </ul>
        );
    }
}

export default SuiteList;