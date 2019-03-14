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
    axios
      .get(`/api/organizations/${this.props.organization.id}/projects`)
      .then(ret => {
        console.log(this.props);
        const projects = ret.data;
        this.setState({ projects });
      });
  }

  handleCreateProjectClick = e => {
    e.preventDefault();
    window.location.href = "/projects/new";
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  render() {
    let projectList;

    if (this.state.projects.length !== 0) {
      projectList = this.state.projects.map((project, index) => {
        return <ProjectRow project={project} key={index} />;
      });

    } else {
      projectList = <li>No Results</li>;
    }

    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <h1>Projects</h1>
        <div
          className="project-card center-card"
          onClick={this.handleCreateProjectClick}
        >
          <div className="project-card-container">
            <h3 className="project-name">
              <span className="card-center-text">Add Project</span>
            </h3>
          </div>
        </div>
        {projectList}
      </div>
    );
  }
}

export default ProjectsIndex;
