import React from "react";
import axios from "axios";
import ProjectCard from '../utils/ProjectCard';
import FlashMessage from '../utils/FlashMessage'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: props.organization
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
    const { organization } = this.state;
    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : "https://media.licdn.com/dms/image/C4E03AQFbjc-XoDAJtA/profile-displayphoto-shrink_200_200/0?e=1559779200&v=beta&t=zCNkokfNKlZr1fjfa-ztpX7dMsji-hUfPYu21S7Qhzg";
    let profileImage = <img className="h-100 w4"  src={profileUrl} />;
    let projectList;

    if (this.state.projects && this.state.projects.length !== 0) {
      projectList = this.state.projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />
      });
    } else {
      projectList = <div>No Results</div>;
    }
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
                            <a className="pa0 ph1 ml3 mb1" target="_blank" href={`http://${this.props.organization.link}`}>
                                <img src="/images/linkedin-icon.png" style={{ width: '21px', height: '21px' }} />
                            </a>
                        </div>
                        <div className="flex">
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

                <h3 className="pt5">Description</h3>
                {this.props.organization.description}

                <h3 className="pt5">Projects</h3>
                {projectList}
            </div>
        </div>
    );
  }
}
export default Profile;
