/**
 * @prop application - application object associated with this row
 */

import React from "react";
import axios from "axios";

class ApplicationView extends React.Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleInterview = this.handleInterview.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  handleAccept = e => {
    e.preventDefault();
    console.log(error.response.data.message)
    axios
      .post(`/api/applications/${this.props.application.id}/decide`, {
        decision: 'accepted'
      })
      .then(function(response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleInterview = e => {
    e.preventDefault();
    console.log(error.response.data.message)
    axios
      .post(`/api/applications/${this.props.application.id}/decide`, {
        decision: 'interviewing'
      })
      .then(function(response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleReject = e => {
    e.preventDefault();

    axios
      .post(`/api/applications/${this.props.application.id}/decide`, {
        decision: 'denied'
      })
      .then(function(response) {
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleVolunteerClick = e => {
    e.preventDefault();

    window.location.href = `/users/${this.props.user.id}`;
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = `/projects/${this.props.application.project_id}`;
  };

  render() {
    const { application } = this.props;

    let status = <span>Pending...</span>;

    if (application.status != null) {
      if (application.status === 'interviewing') {
        status = <span className="approved">Interviewing</span>;
      } else if (application.status === 'denied') {
        status = <span className="denied">Denied</span>;
      } else if (application.status === 'accepted') {
        status = <span className="approved">Accepted</span>;
      }
    }

    let buttons = <span />;

    if (application.status === null || application.status === 'pending') {
      buttons = (
        <div>
          <button onClick={this.handleAccept}>Interview</button>
          <button onClick={this.handleReject}>Reject</button>
        </div>
      );
    }

    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <h3>
          Applicant:
          {" "}
          <a onClick={this.handleVolunteerClick}>
            {this.props.user.first_name} 
            {' '}
            {this.props.user.last_name}
          </a>
        </h3>
        <h3>
            Status: {status}
        </h3>
        <h3>
          Why are you interested in working on this project? (2-3 sentences)
        </h3>
        <p>
          {application.question1}
        </p>
        <h3>
          What experience could you contribute to this project? (2-3 sentences)
        </h3>
        <p> 
          {application.question2}
        </p>
        <h3>Skills</h3>
        <p> 
          {application.question3}
        </p>

        {buttons}
      </div>
    );
  }
}

export default ApplicationView;
