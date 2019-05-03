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
      organization: props.organization,
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
            with_organization_id: this.props.organization.id,
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
        loading: false });
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
    let projectList;

    if (this.state.projects && this.state.projects.length !== 0) {
      projectList = this.state.projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />
      });
    } else {
      if (this.state.loading == false) {
            projectList = <div className="f4 tc pa3"> There are no projects. </div>;
        }
    }

    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : profile_pic;
    if (profileUrl === "/profile_images/original/missing.png") {
        profileUrl = profile_pic;
    }
    let profileImage = <img className="h-100 ba w4"  src={profileUrl} />;
    
    return (
        <div className="w-100 h-100 tc">
           <div
                className="h5 absolute w-100 bg-black bg-image"
                style={{zIndex: -1}} />
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
                <div className="h4 flex items-end">
                    {profileImage}
                    <div className="w-100 m3 ph4 pt4">
                        <div className="flex items-end">
                            <h1 className="ma0 f1 mb3">
                                {this.props.organization.name}
                            </h1>
                            <a className="pa0 ph1 ml3" style={{marginBottom: 21}} target="_blank" href={`http://${this.props.organization.link}`}>
                            <i className="fab fa-linkedin f2"></i>
                            </a>
                        </div>
                        <div className="flex lato b f5">
                            <div className="mt1-ns">
                                {this.props.organization.email}
                            </div>
                            <span className="pl3 mt1-ns">|</span>
                            <div className="pl3 mt1-ns">
                                {this.props.organization.contact_phone_number}
                            </div>
                            <span className="pl3 mt1-ns">|</span>
                            <div className="pl3 mt1-ns">
                                {this.props.organization.city}, {this.props.organization.state}
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="pt4 f3">Description</h2>
                <p className="f5">{this.props.organization.description}</p>

                <h2 className="pt4 f3 pb3">Projects</h2>
                <Loader loading={this.state.loading} />
                {projectList}
            </div>
        </div>
    );
  }
}
export default Profile;
