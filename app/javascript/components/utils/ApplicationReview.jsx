import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import linkedin from "images/linked-in.png";

class ApplicationReview extends React.Component {
    constructor(props) {
        super(props);
        axios.defaults.headers.common = {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content")
          };
        this.handleDeny = this.handleDeny.bind(this);
        this.handleInterview = this.handleInterview.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleVolunteerClick = this.handleVolunteerClick.bind(this);
        this.displayButtons = this.displayButtons.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    handleDeny = e => {
    e.preventDefault();
    axios
        .post(`/api/applications/${this.props.application.id}/decide`, {
        decision: 'denied'
        })
        .then(function(response) {
        window.location.reload();
        })
        .catch(function(error) {
            this.flash_message.flashError(
                error.response.data.message
            );
        });
    };

    handleInterview = e => {
        e.preventDefault();
        axios
          .post(`/api/applications/${this.props.application.id}/decide`, {
            decision: 'interviewing'
          })
          .then(function(response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function(error) {
            this.flash_message.flashError(
                error.response.data.message
                );
            });
      };
    
    handleAccept = e => {
        e.preventDefault();
        axios
            .post(`/api/applications/${this.props.application.id}/decide`, {
            decision: 'accepted'
            })
            .then(function(response) {
            console.log(response);
            window.location.reload();
            })
            .catch(function(error) {
                this.flash_message.flashError(
                    error.response.data.message
                );
            });
    };

    handleVolunteerClick = e => {
    e.preventDefault();
    window.location.href = `/users/${this.props.user.id}`;
    };

    goBack = e => {
        e.preventDefault();
        window.location.href = "/applications";
    };

    displayButtons() {
        let buttons = null;
        if (this.props.organization) {
            console.log('org signed in');
            if (this.props.application.status === null || this.props.application.status === "pending") {
                buttons = (
                    <div>
                    <button className="fl" onClick={this.handleAccept}>Interview</button>
                    <button className="fl" onClick={this.handleDeny}>Reject</button>
                    </div>
                );
            } else if (this.props.application.status == "interviewing") {
                console.log('interviewing');
                buttons = (
                    <div>
                    <button onClick={this.handleAccept}>Accept</button>
                    <button onClick={this.handleDeny}>Reject</button>
                    </div>
                );
            }
        }
        return buttons;
    }

    render() {
      let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : "https://media.licdn.com/dms/image/C4E03AQFbjc-XoDAJtA/profile-displayphoto-shrink_200_200/0?e=1559779200&v=beta&t=zCNkokfNKlZr1fjfa-ztpX7dMsji-hUfPYu21S7Qhzg";
      let profileImage = <img className="h-100 w4"  src={profileUrl} />;
      let resume = <a className="dib std-button f7 pa1 lh-m">Resume</a>
      return(
        <div className="w-100 h-100 tc">
            <div className="tl fl w-100 pl6 pr6 pt5 pb5">
                <h1 className="ma0 f1 mb5 truncate"> Application - {this.props.project.title} </h1>
                <button>{this.props.application.status}</button>
                <div className="h4 flex items-end">
                    {profileImage}
                    <div className="w-100 m3 ph4 pt4">
                        <div className="flex items-end">
                            <h1 className="ma0 f1 mb3" onClick={this.handleVolunteerClick}>
                                {this.props.user.first_name} {this.props.user.last_name}
                            </h1>
                            <a className="pa0 ph1 ml3 mb1" href={`http://${this.props.user.linkedin_url}`}>
                                <img src={linkedin} style={{ width: '21px', height: '21px' }} />
                            </a>
                            <div className="pb2 ml3">
                                {resume}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="mt1-ns">
                                {this.props.user.email}
                            </div>
                            <span className="pl3 mt1-ns">|</span>
                            <div className="pl3 mt1-ns">
                                {this.props.user.phone_number}
                            </div>
                            <span className="pl3 mt1-ns">|</span>
                            <div className="pl3 mt1-ns">
                                {this.props.user.city}, {this.props.user.state}
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="pt5">Skills</h3>
                <p className="lato">{this.props.user.skills}</p>

                <h3 className="pt5">Biography</h3>
                <p className="lato">{this.props.user.bio}</p>

                <h3 className="pt5">Why are you interested?</h3>
                <p className="lato">{this.props.application.question1}</p>
                <h3 className="pt5">Describe your relevant experience.</h3>
                <p className="lato">{this.props.application.question2} {this.props.application.question3}</p>
                {this.displayButtons()}
                <button className="f5 w-auto tc pa2 white bg-black lato b" onClick={this.goBack}>
                    Back
                </button>
            </div>
      </div>

      )
    }
}

ApplicationReview.propTypes = {
    application: PropTypes.object,
    user: PropTypes.object,
    project: PropTypes.object,
    organization: PropTypes.object
  };

export default ApplicationReview;