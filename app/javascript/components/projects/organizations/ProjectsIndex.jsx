import React from "react";
import axios from 'axios';
import ProjectRow from './ProjectRow';

class ProjectsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get(`/api/organizations/${this.props.organization.id}/projects`).then(ret => {
      console.log(this.props)
      let projects = ret.data;
      this.setState({ projects });
    })
  }

  render() {
    let projectList;

    if (this.state.projects.length != 0) {
      projectList = this.state.projects.map((project, index) => {
        return <ProjectRow project={project} key={index} />
      });
    } else {
      projectList = (
        <li>
          No Results
        </li>
     )
    }

    return (
      <div>
        <h1>organizations </h1>
        <h1>Projects</h1>
          {projectList}
      </div>
    );
  }

}

export default ProjectsIndex;