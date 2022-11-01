import React from "react";
import Suite from "./Suite";

class SuiteList extends React.Component {
  render() {
    const suites = [];
    for (let key in this.props.userSuiteMap) {
      suites.push(
        <Suite
          key={key}
          suiteObject={this.props.userSuiteMap[key]}
          toggleViewSuite={this.props.toggleViewSuite}
          toggleEditSuite={this.props.toggleEditSuite}
        />
      );
    };
    return <ul className="content-list">{suites}</ul>;
  }
}

export default SuiteList;
