import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import linkedin from "images/linked-in.png";
import FlashMessage from '../utils/FlashMessage';


class ApplicationView extends React.Component {
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
        this.displayStatus = this.displayStatus.bind(this);
        this.displayWithdraw = this.displayWithdraw.bind(this);
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
        .catch(res => {
            this.flash_message.flashError(
                res.response.data.message
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
          .catch(res => {
            this.flash_message.flashError(
                res.response.data.message
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
            .catch(res => {
                this.flash_message.flashError(
                    res.response.data.message
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
            if (this.props.application.status === null || this.props.application.status === "pending") {
                buttons = (
                    <div className="mv4">
                    <button className="accept-button f5 pa2 fr" onClick={this.handleInterview}>Interview</button>
                    <button className="deny-button f5 mr4 pa2 fr" onClick={this.handleDeny}>Reject</button>
                    </div>
                );
            } else if (this.props.application.status == "interviewing") {
                buttons = (
                    <div className="mv4">
                    <button className="accept-button f5 pa2 fr" onClick={this.handleAccept}>Accept</button>
                    <button className="deny-button f5 mr4 pa2 fr" onClick={this.handleDeny}>Reject</button>
                    </div>
                );
            }
        }
        return buttons;
    }

    displayWithdraw() {
        let withdraw = null;
        if (this.props.user && this.props.application.status != "denied") {
            withdraw = (<button className="deny-button f5 mr4 pa2" onClick={this.handleDeny}>
                            Withdraw Application
                        </button>)
        }
        return withdraw;
    }

    displayStatus() {
      let rendered_status = (<div className="fl f5 pa2 w4 tc bg-light-gray">
                                Undefined Status
                            </div>)
      if (this.props.application.status === "pending") {
        rendered_status = (<div className="fl f5 pa2 w4 tc bg-accent">
                                Pending
                            </div>)
      } else if (this.props.application.status === "interviewing") {
        rendered_status = (<div className="fl f5 pa2 w4 tc bg-accent">
                                Interviewing
                          </div>)
      } else if (this.props.application.status === "accepted") {
        rendered_status = (<div className="fl f5 pa2 w4 tc accepted">
                                Accepted
                          </div>)
      } else if (this.props.application.status === "denied") {
        rendered_status = (<div className="fl f5 pa2 ba w5 tc">
                                No longer in consideration
                          </div>)
      }
      return rendered_status;
    }

    render() {
      let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : "https://media.licdn.com/dms/image/C4E03AQFbjc-XoDAJtA/profile-displayphoto-shrink_200_200/0?e=1559779200&v=beta&t=zCNkokfNKlZr1fjfa-ztpX7dMsji-hUfPYu21S7Qhzg";
      let profileImage = <img className="h-100 w4"  src={profileUrl} />;
      let resume = <a className="dib std-button w3 f7 pa1 lh-m">Resume</a>
      return(
        <div className="w-100 h-100 tc">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            <div className="tl fl w-100 pl6 pr6 pt5 pb5">
                <h1 className="ma0 f1 mb4 truncate"> Application - {this.props.project.title} </h1>
                <div className="mb5">
                    {this.displayStatus()} {this.displayWithdraw()}
                </div>
                <br/>
                <div className="h4 flex items-end">
                    {profileImage}
                    <div className="w-100 m3 ph4 pt4">
                        <div className="flex items-end">
                            <h1 className="ma0 f1 mb3">
                                {this.props.user.first_name} {this.props.user.last_name}
                            </h1>
                            <br/>
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
                <br/>
                <button className="f5 w-auto tc pa2 white bg-black lato b" onClick={this.goBack}>
                    Back
                </button>
            </div>
      </div>

      )
    }
}

ApplicationView.propTypes = {
    application: PropTypes.object,
    user: PropTypes.object,
    project: PropTypes.object,
    organization: PropTypes.object
  };

export default ApplicationView;