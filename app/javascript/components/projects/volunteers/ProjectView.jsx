/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';

class ProjectView extends React.Component {

  render() {
    const { project } = this.props;

    return (
      <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <div>
            <button onClick={this.handleProjectsClick}>Apply to Project</button>
          </div>
      </div>
    );
  }
}

export default ProjectView;