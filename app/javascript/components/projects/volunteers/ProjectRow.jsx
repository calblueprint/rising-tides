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
      <div>
        <a href="#" onClick={this.goToProject}>
          <h3>{project.title}</h3>
          <h4>{project.organization}</h4>
          <p>{project.description}</p>
        </a>
        <hr />
      </div>
    );
  }
}

export default ProjectRow;