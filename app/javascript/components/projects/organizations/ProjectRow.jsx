/**
* @prop project - project object associated with this row
*/

import React from "react";

class ProjectRow extends React.Component {

  goToProject = () => {
    window.location.href = `/projects/${this.props.project.id}`;
  }

  render() {
    const { project } = this.props;
    const id = project.id;

    return (
      <div class="project-card" onClick={this.goToProject}>
        <div class="project-card-container">
          <h3 class="project-name">{project.title}</h3>
          <h4>{project.organization_id}</h4>
          <p class="project-description">{project.description}</p>
        </div>
      </div>
    );
  }
}

export default ProjectRow;