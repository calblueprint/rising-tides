import React from "react";
import axios from 'axios';
import ProjectRow from './ProjectRow';

class ProjectsIndex extends React.Component {

  constructor(props) {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get('/api/projects').then(ret => {
      let projects = ret.data;
      this.setState({ projects });
      console.log(this.state);
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
        <h1>Projects</h1>
        <ul>
          {projectList}
        </ul>
      </div>
    );
  }

}

export default ProjectsIndex;