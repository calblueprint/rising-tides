/**
* @prop application - application object associated with this row
*/

import React from "react";

class ApplicationRow extends React.Component {

  goToApplication = () => {
    window.location.href = `/applications/${this.props.application.id}`;
  }

  render() {
    const { application } = this.props;
    const id = application.id;

    return (
      <div class="project-card" onClick={this.goToApplication}>
        <div class="project-card-container">
          <h3 class="project-name">{application.id}</h3>
          <p class="project-description">{application.question1}</p>
          <p class="project-description">{application.question2}</p>
          <p class="project-description">{application.question3}</p>
        </div>
      </div>
    );
  }
}

export default ApplicationRow;