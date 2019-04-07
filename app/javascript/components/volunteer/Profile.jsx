import React from "react";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      dataLoaded: false
    };
  }

  componentDidMount() {
    axios.get(`/users/${this.props.user.id}`).then(data => {
      this.setState({
        user: data,
        dataLoaded: true
      });
    });
  }

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  render() {
    const { user, dataLoaded } = this.state;
    let pageContent;
    if (!dataLoaded) {
      return <div className="">Loading...</div>;
    }
    let profileUrl = this.props.profile_image_url ? this.props.profile_image_url : "https://media.licdn.com/dms/image/C4E03AQFbjc-XoDAJtA/profile-displayphoto-shrink_200_200/0?e=1559779200&v=beta&t=zCNkokfNKlZr1fjfa-ztpX7dMsji-hUfPYu21S7Qhzg";
    let profileImage = <img className="h-100 w4"  src={profileUrl} />;
    let resumeUrl = this.props.resume_url ? this.props.resume_url : "";
    let resume = <a className="fl pa0 pv0 ph3 resume-button f7 lh-m" src={resumeUrl}>resume</a>;
    return (
        <div className="w-100 h-100 tc">
            <div className="tl fl w-100 pa6">
                <div className="h4 flex">
                    {profileImage}
                    <div className="w-100 h-100 m3 ph4 pt4">
                        <div className="h2 f1">
                            {this.props.user.first_name} {this.props.user.last_name}
                        </div>
                        <hr />
                        <div className="h1 flex">
                            <div className="ph3 mt1-ns">
                                <h3 className="f7 ma0 light-grey">Email</h3>
                                {this.props.user.email}
                            </div>
                            <div className="ph3 mt1-ns">
                                <h3 className="f7 ma0 light-grey">Phone number</h3>
                                {this.props.user.phone_number}
                            </div>
                            <div className="ph3 mt1-ns">
                                <h3 className="f7 ma0 light-grey">Location</h3>
                                {this.props.user.city}, {this.props.user.state}
                            </div>
                        </div>
                    </div>
                    <div className="h-100 w3 w-20">
                        <a className="fl pa0 ph1 mr2" target="_blank" href={`http://${this.props.user.link}`}>
                            <img src="/images/linkedin-icon.png" style={{ width: '21px', height: '21px' }} />
                        </a>
                        {resume}
                    </div>
                </div>

                <h3 className="pt5">Skills</h3>
                {this.props.user.skills}

                <h3 className="pt5">Biography</h3>
                {this.props.user.bio}

                <h3 className="pt5">Projects</h3>

                <br />
                <a onClick={this.goBack}>Back</a>
            </div>
        </div>
    );
  }
}
export default Profile;
