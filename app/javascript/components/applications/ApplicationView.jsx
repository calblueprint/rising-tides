/**
* @prop project - project object associated with this row
*/

import React from "react";

class ApplicationView extends React.Component {

  goBack = (e) => {
    e.preventDefault();
    window.location = `/applications`;
  };

  render() {
    const { application } = this.props;

    return (
      <a onClick={this.goBack}>Back</a>
      <div>
          <h3>Why are you interested in working on this project? (2-3 sentences)</h3>
          <p>{application.question1}</p>
          <h3>What experience could you contribute to this project? (2-3 sentences)</h3>
          <p>{application.question2}</p>
          <h3>Skills</h3>
          <p>{application.question3}</p>
      </div>
    );
  }
}

export default ApplicationView;
