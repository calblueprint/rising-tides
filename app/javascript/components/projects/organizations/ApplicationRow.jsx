/**
* @prop application - application object associated with this row
*/

import React from "react";
import axios from 'axios';

class ApplicationRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: null,
    };
  }

  componentDidMount() {
    axios.get(`/api/projects/${this.props.application.project_id}`).then(ret => {
      let project = ret.data;
      this.setState({ project });
    })
  }

  goToApplication = () => {
    window.location.href = `/applications/${this.props.application.id}`;
  }

  render() {
    const { application } = this.props;
    const { project } = this.state;
    const id = application.id;

    let status = <span>Pending...</span>;

    if (application.status != null) {
        if (application.status == 2) {
            status = <span className="approved">Approved</span>;
        } else if (application.status == 1) {
            status = <span className="denied">Denied</span>;
        }
    }

    if (project != null) {
      return (
        <div className="project-card" onClick={this.goToApplication}>
          <div className="project-card-container">
            <h3 className="project-name">{project.title}</h3>
            <p className="project-description">{status}</p>
            <br />
            <p className="project-description">{application.question1}</p>
            <p className="project-description">{application.question2}</p>
            <p className="project-description">{application.question3}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="project-card" onClick={this.goToApplication}>
          <div className="project-card-container">
            <h3 className="project-name">Loading...</h3>
            <p className="project-description">{status}</p>
            <br />
            <p className="project-description">{application.question1}</p>
            <p className="project-description">{application.question2}</p>
            <p className="project-description">{application.question3}</p>
          </div>
        </div>
      );
    }
  }
}

export default ApplicationRow;