/**
* @prop application - application object associated with this row
*/

import React from "react";

class ApplicationRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  componentDidMount() {
    axios.get(`/api/projects/${this.props.application.project_id}`).then(ret => {
      let project = ret.data;
      this.setState({ project });
      console.log(this.state)
      console.log(this.props)
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
            status = <span class="approved">Approved</span>;
        } else if (application.status == 1) {
            status = <span class="denied">Denied</span>;
        }
    }

    return (
      <div class="project-card" onClick={this.goToApplication}>
        <div class="project-card-container">
          <h3 class="project-name">{project.title}</h3>
          <p class="project-description">{status}</p>
          <br />
          <p class="project-description">{application.question1}</p>
          <p class="project-description">{application.question2}</p>
          <p class="project-description">{application.question3}</p>
        </div>
      </div>
    );
  }
}

export default ApplicationRow;