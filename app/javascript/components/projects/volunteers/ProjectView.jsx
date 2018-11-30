/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';

class ProjectView extends React.Component {

  goToApplication = () => {
    window.location.href = `/projects/${this.props.project.id}/applications/new`;
  }

  render() {
    const { project } = this.props;

    return (
      <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href="#" onClick={this.goToApplication}>Apply</a>
      </div>
    );
  }
}

export default ProjectView;
