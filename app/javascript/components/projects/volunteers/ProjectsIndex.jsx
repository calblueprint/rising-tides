import React from "react";
import axios from 'axios';
import ProjectCard from '../../utils/ProjectCard';

class ProjectsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get("/api/all_projects").then(ret => {
      const projects = ret.data;

      this.setState({ projects });
    });
  }

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  render() {
    let projectList;

    if (this.state.projects.length !== 0) {
      projectList = this.state.projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />
        //return <ProjectRow project={project} key={index} />
      });
    } else {
      projectList = <li>No Results</li>;
    }

    return (
      <div className="bg-light-gray h-100 w-100">
        <a onClick={this.goBack}>Back</a>
        <h1>Projects</h1>
        {projectList}
      </div>
    );
  }
}

export default ProjectsIndex;
