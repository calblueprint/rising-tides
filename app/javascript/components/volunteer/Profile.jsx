import React from "react";
import axios from "axios";
import ProjectCard from '../utils/ProjectCard';
import FlashMessage from '../utils/FlashMessage'
import profile_pic from "images/profile_pic.png";
import ProjectList from '../projects/ProjectList';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      hover: false
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

  goEdit = () => {
    window.location.href = "/users/edit";
  };


  checkIfUser = () => {
    if (this.props.user != null && this.props.curr_user != null){
      if (this.props.user.name == this.props.curr_user.name && this.props.user.email == this.props.curr_user.email){
      return (
        <a className="fr pa0 ph1 ml3 mb1 " target="_blank" onClick={this.goEdit}>
        <img src="/images/edit_pen.png"
            style={{ width: '21px', height: '21px'}}
            className="grayscale"/>
        </a>
      )}
    }
  }

  render() {
    const { user } = this.state;
    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : profile_pic;
    let profileImage = <img className="h-100 w4"  src={profileUrl} />;
    let resumeUrl = this.props.resume_url ? this.props.resume_url : "";
    let resume = <a className="pa0 ph1 ml3" style={{marginBottom: 23}} target="_blank" href={resumeUrl}>
                    <i className="fas fa-file-alt f2"></i>
                </a>
    return (
        <div className="w-100 h-100 tc">
            <div
                className="h5 absolute w-100 bg-black bg-image"
                style={{zIndex: -1}} />
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            {this.checkIfUser()}
                <div className="h4 flex items-end">
                    {profileImage}

                    <div className="w-100 m3 ph4 pt4">

                        <div className="flex items-end">
                        <h1 className=" fl ma0 f1 mb3">
                            {this.props.user.first_name} {this.props.user.last_name}
                        </h1>
                        <div className="fr">
                          <a className="pa0 ph1 ml3 mb1" target="_blank" href={`http://${this.props.user.link}`}>
                              <img src="/images/linkedin-icon.png" style={{ width: '21px', height: '21px' }} />
                          </a>
                          <div className="pb2 ml3">
                              {resume}
                          </div>
                        </div>
                        </div>
                        <div className="flex f5">
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

<<<<<<< HEAD
                <h2 className="pt4 f3">Projects</h2>
                <ProjectList projects={projects} loading={loading} />
=======
                <h3 className="pt5">Projects</h3>
>>>>>>> profiles
            </div>

        </div>
    );
  }
}
export default Profile;
