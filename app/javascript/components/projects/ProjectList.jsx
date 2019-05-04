/**
 * @prop application - application object associated with this row
 */

import React from "react";
import axios from "axios";
import Loader from "../utils/Loader"
import ProjectCard from "../utils/ProjectCard"

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { projects, loading } = this.props;
    let projectList;

    if (projects.length) {
      projectList = projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />;
      });
    } else {
      if (!loading) {
        projectList = <div className="f4 tc pa3">There are no projects. </div>;
      }
    }
    return (
      <div>
          <Loader loading={loading} />
          <div className="flex flex-wrap justify-around">
            {projectList}
          </div>
      </div>
    );
  }
}

export default ProjectList;
