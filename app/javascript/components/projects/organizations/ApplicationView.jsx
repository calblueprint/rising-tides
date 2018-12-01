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
        this.handleReject = this.handleReject.bind(this);
    }

    handleAccept = (e) => {
        e.preventDefault();

        axios
            .post(`/api/applications/${this.props.application.id}/decide`, {
                decision: 2
            })
            .then(function(response) {
                window.location.reload();
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    handleReject = (e) => {
        e.preventDefault();

        axios
            .post(`/api/applications/${this.props.application.id}/decide`, {
                decision: 1
            })
            .then(function(response) {
                window.location.reload();
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    handleVolunteerClick = e => {
        e.preventDefault();

        window.location = `/users/${this.props.user.id}`;
    };

    goBack = e => {
        e.preventDefault();
        window.location = `/projects/${this.props.application.project_id}`;
    };

    render() {
        const { application } = this.props;

        let status = <span>Pending...</span>;

        if (application.status != null) {
            if (application.status == 2) {
                status = <span className="approved">Approved</span>;
            } else if (application.status == 1) {
                status = <span className="denied">Denied</span>;
            }
        }

        let buttons = <span></span>;

        if (application.status == null || application.status == 0) {
            buttons = <div>
                <button onClick={this.handleAccept}>Accept</button>
                <button onClick={this.handleReject}>Reject</button>
            </div>;
        }

        return (
            <div>
                <a onClick={this.goBack}>Back</a>
                <h3>Applicant: <a onClick={this.handleVolunteerClick}>{this.props.user.first_name} {this.props.user.last_name}</a></h3>
                <h3> Status: {status} </h3>
                <h3>Question 1</h3>
                <p> {application.question1} </p>
                <h3>Question 2</h3>
                <p> {application.question2} </p>
                <h3>Question 3</h3>
                <p> {application.question3} </p>

                {buttons}
            </div>
        );
    }
}

export default ApplicationView;
