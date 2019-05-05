import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import FlashMessage from '../utils/FlashMessage';
import profile_pic from "images/profile_pic.png";
import peter_pic from "images/peter.jpg";


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
                    <button className="white-on-grey accept-button f5 pa2 fr b" onClick={this.handleInterview}>Interview</button>
                    <button className="white-on-grey f5 w-auto tc pa2 white bg-black lato ba fr b mr3" onClick={this.handleDeny}>Reject</button>
                    </div>
                );
            } else if (this.props.application.status == "interviewing") {
                buttons = (
                    <div className="mv4">
                    <button className="white-on-grey accept-button f5 pa2 fr b" onClick={this.handleAccept}>Accept</button>
                    <button className="white-on-grey f5 w-auto tc pa2 white bg-black lato ba b fr mr3" onClick={this.handleDeny}>Reject</button>
                    </div>
                );
            }
        }
        return buttons;
    }

    displayWithdraw() {
        let withdraw = null;
        if (!this.props.organization && this.props.application.user_id == this.props.user.id && this.props.application.status != "denied") {
            withdraw = (<button className="white-on-grey f5 w-auto tc pa2 white bg-black lato ba mr3" onClick={this.handleDeny}>
                            Withdraw Application
                        </button>)
        }
        return withdraw;
    }

    displayStatus() {
      let rendered_status = (<div className="f5 fr pa2 w4 tc bg-light-gray">
                                Undefined Status
                            </div>)
      if (this.props.application.status === "pending") {
        rendered_status = (<div className="f5 fr pa2 w4 tc bg-accent">
                                Pending
                            </div>)
      } else if (this.props.application.status === "interviewing") {
        rendered_status = (<div className="f5 fr pa2 w4 tc bg-accent">
                                Interviewing
                          </div>)
      } else if (this.props.application.status === "accepted") {
        rendered_status = (<div className="f5 fr pa2 w4 tc white b accepted">
                                Accepted
                          </div>)
      } else if (this.props.application.status === "denied") {
        rendered_status = (<div className="f5 fr pa2 ba w5 tc">
                                No longer in consideration
                          </div>)
        }
        return rendered_status;
    }

    render() {
      let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : profile_pic;
      let profileImage = <img className="h-100 ba w4"  src={profileUrl} />;

      let linkedin = this.props.user.linkedin_url ? (<a className="pa0 ph1 ml3" style={{marginBottom: 21}} target="_blank" href={`http://${this.props.user.linkedin_url}`}>
                                            <i className="fab fa-linkedin f2 icon-link"></i>
                                            </a>) : null;
    
    let resume;
    if (!this.props.resume_url || this.props.resume_url ==="/profile_images/original/missing.png") {
        resume = null;
    } else {
        resume = (<a className="pa0 ph1 ml3" style={{marginBottom: 23}} target="_blank" href={this.props.resume_url}>
                    <i className="fas fa-file-alt f2 icon-link"></i>                            
                    </a>)}

    let skillList;

    if (this.props.user.skills) {
        skillList = this.props.user.skills.map((skill, index) => {
            return <div className="skill-pill">{skill.name}</div>;
        })
    } else {
        skillList = <div>No skills</div>;
    }

      return(
        <div className="w-100 h-100 tc">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            <div
                className="h5 absolute w-100 bg-black bg-image"
                style={{zIndex: -1}} />
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
                <div><h1 className="ma0 f1 mb4 truncate"> Application - {this.props.project.title} </h1></div>
                {this.displayStatus()}
                <div className="mb3">
                    {this.displayWithdraw()}
                </div>
                <br/>
                <div className="h4 flex items-end">
                    {profileImage}
                    <div className="w-100 m3 ph4 pt4">
                        <div className="flex items-end">
                            <h1 className="ma0 f1 icon-link mb3" onClick={this.handleVolunteerClick}>
                                {this.props.user.first_name} {this.props.user.last_name}
                            </h1>
                            {linkedin} {resume}
                        </div>
                        <div className="flex f5 b lato">
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

                <h2 className="pt4 f3">Skills</h2>
                {skillList}

                <h2 className="pt4 f3">Biography</h2>
                <p className="lato f5">{this.props.user.bio}</p>

                <h2 className="pt4 f3">Why are you interested?</h2>
                <p className="lato f5">{this.props.application.question1}</p>
                <h2 className="pt4 f3">Describe your relevant experience.</h2>
                <p className="lato f5">{this.props.application.question2} {this.props.application.question3}</p>
                {this.displayButtons()}
                <br/>
                <button className="white-on-grey f5 w-auto ba tc bg-white black pa2 lato " onClick={this.goBack}>
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