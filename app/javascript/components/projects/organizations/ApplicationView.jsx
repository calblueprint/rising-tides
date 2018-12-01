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
    }

    handleAccept = e => {
        e.preventDefault();

        axios
            .post(`/api/applications/${this.props.application.id}/decide`, {
                decision: 2
            })
            .then(function(response) {
                window.location = "/projects";
            })
            .catch(function(error) {
                console.log(error);
            });
    };
    handleReject = e => {
        e.preventDefault();

        axios
            .post(`/api/applications/${this.props.application.id}/decide`, {
                decision: 1
            })
            .then(function(response) {
                window.location = "/projects";
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    goBack = (e) => {
        e.preventDefault();
        window.location = `/projects/${this.props.application.project_id}`;
      }

    render() {
        const { application } = this.props;

        let status = <span>Pending...</span>;

        if (application.status != null) {
            if (application.status == 2) {
                status = <span class="approved">Approved</span>;
            } else if (application.status == 1) {
                status = <span class="denied">Denied</span>;
            }
        }

        return (
            <div>
                <a onClick={this.goBack}>Back</a>
                <h3> Applicant </h3>
                <h4> {status} </h4>
                <p> {application.user_id} </p>
                <h3>Question 1</h3>
                <p> {application.question1} </p>
                <h3>Question 2</h3>
                <p> {application.question2} </p>
                <h3>Question 3</h3>
                <p> {application.question3} </p>

                <div>
                    <button onClick={this.handleAccept}>Accept</button>
                    <button onClick={this.handleReject}>Reject</button>
                </div>
            </div>
        );
    }
}

export default ApplicationView;
