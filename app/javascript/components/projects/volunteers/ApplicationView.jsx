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

    goBack = (e) => {
        e.preventDefault();
        window.location = "/applications";
      }

    render() {
        const { application } = this.props;

        return (
            <div>
                <a onClick={this.goBack}>Back</a>
                <h3> Applicant </h3>
                <h4> {application.status} </h4>
                <p> {application.user_id} </p>
                <h3>Why are you interested in working on this project? (2-3 sentences)</h3>
                <p> {application.question1} </p>
                <h3>What experience could you contribute to this project? (2-3 sentences)</h3>
                <p> {application.question2} </p>
                <h3>Skills</h3>
                <p> {application.question3} </p>
            </div>
        );
    }
}

export default ApplicationView;
