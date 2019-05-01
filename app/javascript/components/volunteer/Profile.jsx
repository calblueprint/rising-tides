import React from "react";
import axios from "axios";
import ProjectCard from '../utils/ProjectCard';
import FlashMessage from '../utils/FlashMessage'
import Loader from '../utils/Loader'
import profile_pic from "images/profile_pic.png";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      loading: true
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
      this.setState({ 
        projects: projects,
        loading: false  });
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
<<<<<<< HEAD
    const { user } = this.state;
<<<<<<< HEAD
    let projectList;  
=======
<<<<<<< HEAD
>>>>>>> default profile pic
    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : profile_pic;
    let profileImage = <img className="h-100 w4"  src={profileUrl} />;
=======
    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : "https://media.licdn.com/dms/image/C4E03AQFbjc-XoDAJtA/profile-displayphoto-shrink_200_200/0?e=1559779200&v=beta&t=zCNkokfNKlZr1fjfa-ztpX7dMsji-hUfPYu21S7Qhzg";
    let profileImage = <img className="h-100 ba w4"  src={profile_pic} />;
>>>>>>> default profile pic
    let resumeUrl = this.props.resume_url ? this.props.resume_url : "";
    let resume = <a className="pa0 ph1 ml3" style={{marginBottom: 23}} target="_blank" href={resumeUrl}>
                    <i className="fas fa-file-alt f2"></i>                            
                </a>
    if (this.state.projects && this.state.projects.length !== 0) {
      projectList = this.state.projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />
      });
    } else {
      if (this.state.loading == false) {
            projectList = <div className="f4 tc pa3">There are no projects. </div>;
        }
    }
    let resume = <a className="dib ba bg-accent f5 w-auto pv1 mb4 ml3 lh-m" src={resumeUrl}>Resume</a>;
=======
    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : "https://media.licdn.com/dms/image/C4E03AQFbjc-XoDAJtA/profile-displayphoto-shrink_200_200/0?e=1559779200&v=beta&t=zCNkokfNKlZr1fjfa-ztpX7dMsji-hUfPYu21S7Qhzg";
    let profileImage = <img className="h-100 ba w4"  src={profile_pic} />;
    let projectList;
    if (this.state.projects && this.state.projects.length !== 0) {
        projectList = this.state.projects.map((project, index) => {
          return <ProjectCard project={project} key={index} />
        });
    } else {
    projectList = <div>No Results</div>;
    }

    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : profile_pic;
    if (profileUrl === "/profile_images/original/missing.png") {
        profileUrl = profile_pic;
    }
    let profileImage = <img className="h-100 ba w4"  src={profileUrl} />;
    let resumeUrl = this.props.resume_url ? this.props.resume_url : "";
    let resume = <a className="pa0 ph1 ml3" style={{marginBottom: 23}} target="_blank" href={resumeUrl}>
                    <i className="fas fa-file-alt f2"></i>                            
                </a>
>>>>>>> proj cards and fonts
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
                            <h1 className="ma0 truncate f1 mb3">
                                {this.props.user.first_name} {this.props.user.last_name}
                            </h1>
                            <a className="pa0 ph1 ml3" style={{marginBottom: 21}} target="_blank" href={`http://${this.props.user.link}`}>
                            <i className="fab fa-linkedin f2"></i>
                            </a>
                            <a className="pa0 ph1 ml3" style={{marginBottom: 23}} target="_blank" href={resumeUrl}>
                            <i class="fas fa-file-alt f2"></i>                            
                            </a>
                        </div>
                        <div className="flex lato b f5">
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
                <p className="f5">{this.props.user.skills}</p>

                <h2 className="pt4 f3">Biography</h2>
                <p className="f5">{this.props.user.bio}</p>

<<<<<<< HEAD
                <h3 className="pt5">Projects</h3>
                <Loader loading={this.state.loading} />
=======
                <h2 className="pt4 pb3 f3">Projects</h2>
>>>>>>> proj cards and fonts
                {projectList}
            </div>
            
        </div>
    );
  }
}
export default Profile;
