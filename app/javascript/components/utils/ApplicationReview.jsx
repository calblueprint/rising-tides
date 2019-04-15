import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import linkedin from "images/linked-in.png";

class AppReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          appStatus: this.props.application.status,
          //userType
        }
    }
    
    goBack = e => {
        e.preventDefault();
        window.location.href = "/applications";
    };

    render() {
      let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : "https://media.licdn.com/dms/image/C4E03AQFbjc-XoDAJtA/profile-displayphoto-shrink_200_200/0?e=1559779200&v=beta&t=zCNkokfNKlZr1fjfa-ztpX7dMsji-hUfPYu21S7Qhzg";
      let profileImage = <img className="h-100 w4"  src={profileUrl} />;
      //let resumeUrl = "";
      //let resume = <a className="dib std-button f7 lh-m" src={resumeUrl}>resume</a>
      let resume = <a className="dib std-button f7 pa1 lh-m">Resume</a>
      return(
        <div className="w-100 h-100 tc">
            <div className="tl fl w-100 pl6 pr6 pt5 pb5">
                <h1 className="ma0 f1 mb5 truncate"> Application - {this.props.project.title} </h1>
                <div className="h4 flex items-end">
                    {profileImage}
                    <div className="w-100 m3 ph4 pt4">
                        <div className="flex items-end">
                            <h1 className="ma0 f1 mb3">
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
                <p className="lato">{this.props.application.question2}</p>
            </div>
      </div>

        /* // <div>
        //   <a className="no-link black f2" onClick={this.goBack}>
        //     <i class="fas fa-angle-left"></i>
        //   </a>
        //   <h2 className="truncate ma3">Application - {this.props.project.title} </h2>
          // <h3 className="lato f3">Why are you interested?</h3>
          // <p className="lato">{this.props.application.question1}</p>
          // <br/>
          // <h3 className="lato f3">Describe your relevant experience.</h3>
          // <p className="lato">{this.props.application.question2}</p>
        // </div> */
      )
    }
}

AppReview.propTypes = {
    application: PropTypes.object,
    user: PropTypes.object,
    project: PropTypes.object,
    organization: PropTypes.object
  };

export default AppReview;