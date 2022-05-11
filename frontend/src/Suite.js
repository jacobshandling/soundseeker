import React from "react";

class Suite extends React.Component {
    render() {
            const suite = this.props.suiteObject;
            return (
                <li key={suite.id} className="listed-content">
                    <h3>{suite.name}</h3>
                    <span className="listed-content-actions">
                        <button onClick={() => this.props.toggleViewSuite(suite)}>View</button>
                        <button onClick={() => this.props.toggleEditSuite(suite)}>Edit</button>
                    </span>
                </li>
            );
        }

}

export default Suite;