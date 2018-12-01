/**
* @prop application - application object associated with this row
*/

import React from "react";
import axios from 'axios';

class ApplicationRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  goToApplication = () => {
    window.location.href = `/applications/${this.props.application.id}`;
  }

  componentDidMount() {
    axios.get(`/api/projects/${this.props.application.project_id}`).then(ret => {
      let project = ret.data;
      this.setState({ project });
      console.log(this.state)
      console.log(this.props)
    })
  }

  render() {
    const { application } = this.props;
    const { project } = this.state;
    const id = application.id;

    if (project != null) {
      return (
        <div class="project-card" onClick={this.goToApplication}>
          <div class="project-card-container">
            <h3 class="project-name">{project.title}</h3>
            <p class="project-description">{application.question1}</p>
            <p class="project-description">{application.question2}</p>
            <p class="project-description">{application.question3}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div class="project-card" onClick={this.goToApplication}>
          <div class="project-card-container">
            <p class="project-description">Loading...</p>
          </div>
        </div>
      );
    }
  }
}

export default ApplicationRow;