/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';

class ProjectRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      organization: null,
    };
  }

  componentDidMount() {
    if (this.props.project.organization_id != null) {
      console.log(this.props);
      axios.get(`/api/organizations/${this.props.project.organization_id}`).then(ret => {
        let organization = ret.data;
        this.setState({ organization });
      })
    } else {
      console.log(`Project ${this.props.project.id} not tied to an organization!`);
    }
  }

  goToProject = () => {
    window.location.href = `/projects/${this.props.project.id}`;
  }

  render() {
    const { project } = this.props;
    const { organization } = this.state;
    const id = project.id;

    if (organization != null) {
      return (
        <div className="project-card" onClick={this.goToProject}>
          <div className="project-card-container">
            <h3>{project.title}</h3>
            <h3>Organization: {organization.name}</h3>
            <h4>{project.organization_id}</h4>
            <p>{project.description}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="project-card" onClick={this.goToProject}>
          <div className="project-card-container">
            <h3>{project.title}</h3>
            <h3>Organization: Loading...</h3>
            <h4>{project.organization_id}</h4>
            <p>{project.description}</p>
          </div>
        </div>
      );
    }
  }
}

export default ProjectRow;