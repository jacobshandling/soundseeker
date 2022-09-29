import React from "react";

class Suite extends React.Component {
  render() {
    const suite = this.props.suiteObject;
    return (
      <li key={suite.id} className="listed-content">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{suite.name}</h3>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.props.toggleViewSuite(suite)}
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.props.toggleEditSuite(suite)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Suite;
