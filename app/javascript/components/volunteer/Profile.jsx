import React from "react";
import axios from "axios";
import ProjectCard from '../utils/ProjectCard';
import FlashMessage from '../utils/FlashMessage'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
  }

  componentDidMount() {
    var payload = {
        query: {
            with_user_id: this.props.user.id,
            with_limit: 3
        }
    }
    axios.post("/api/projects/filter", payload).then(res => {
      const { projects, message } = res.data;
      if (message) {
        this.flash_message.flashMessage(
          message
        );
      }
      this.setState({ projects });
    }).catch(res => {
      this.flash_message.flashError(
        res.response.data.message
      );
    });
  }

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  render() {
    const { user } = this.state;
    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : "https://media.licdn.com/dms/image/C4E03AQFbjc-XoDAJtA/profile-displayphoto-shrink_200_200/0?e=1559779200&v=beta&t=zCNkokfNKlZr1fjfa-ztpX7dMsji-hUfPYu21S7Qhzg";
    let profileImage = <img className="h-100 w4"  src={profileUrl} />;
    let resumeUrl = this.props.resume_url ? this.props.resume_url : "";
    let resume = <a className="dib std-button f7 lh-m" src={resumeUrl}>resume</a>;
    return (
        <div className="w-100 h-100 tc">
            <div
                className="h5 absolute w-100 bg-black bg-image"
                style={{zIndex: -1}} />
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
                <div className="h4 flex items-end">
                    {profileImage}
                    <div className="w-100 m3 ph4 pt4">
                        <div className="flex items-end">
                            <h1 className="ma0 f1 mb3">
                                {this.props.user.first_name} {this.props.user.last_name}
                            </h1>
                            <a className="pa0 ph1 ml3 mb1" target="_blank" href={`http://${this.props.user.link}`}>
                                <img src="/images/linkedin-icon.png" style={{ width: '21px', height: '21px' }} />
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
                {this.props.user.skills}

                <h3 className="pt5">Biography</h3>
                {this.props.user.bio}

                <h3 className="pt5">Projects</h3>
            </div>
            
        </div>
    );
  }
}
export default Profile;
