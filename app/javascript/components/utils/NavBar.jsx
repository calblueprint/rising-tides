import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.goToDashboard = this.goToDashboard.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.goToBrowse = this.goToBrowse.bind(this);
    this.goToApplications = this.goToApplications.bind(this);
    this.goToMyProjects = this.goToMyProjects.bind(this);
    this.handleMouseDropdown = this.handleMouseDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.isOrganization = this.props.organization ? 1 : 0;
    this.isVolunteer = this.props.user ? 1 : 0; //0 is Organization; 1 is Volunteer
    this.state = {
      viewDropdown: false
    }
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
  }

  goToDashboard = () => {
    window.location.href = `/`;
  };

  goToProfile = () => {
    if (this.isOrganization) {
      window.location.href = `/organizations/${this.props.organization.id}`;
    } else if (this.isVolunteer) {
      window.location.href = `/users/${this.props.user.id}`;
    } else {
      window.location.href = `/`;
    }
  }

  goToBrowse = () => {
    window.location.href = `/projects`;
  };

  goToMyProjects = e => {
    e.preventDefault();
    window.location.href = '/my-projects';
  };

  goToApplications = (e) => {
    e.preventDefault();
    window.location = "/applications";
  };

  handleLogout = e => {
    e.preventDefault();
    if (this.isOrganization) {
      axios
      .delete("/organizations/sign_out", {})
      .then(function(response) {
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error);
      });
    } else if (this.isVolunteer) {
      axios
      .delete("/users/sign_out", {})
      .then(function(response) {
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error);
      });
    } else {
      console.log("not signed in");
    }
  };

  handleMouseDropdown() {
    this.setState((prevState) => ({viewDropdown: !prevState.viewDropdown}));
  }

  renderProfile() {
    let profile = null;
    if (this.isOrganization) {
    profile = <li className="fr f4 w4 tl dropdown"> 
                <a className="f4 black" onClick={this.handleMouseDropdown}>
                  {this.props.organization.name} <i className="fa fa-caret-down ml1"></i>
                </a>
                {this.state.viewDropdown ?
                  <div className="ba dropdown-content h-auto">
                    <a onClick={this.goToProfile}>Profile</a>
                    <a className="bt pt2" onClick={this.goToMyProjects}>My Projects</a>
                    <a className="bt pt2" onClick={this.goToApplications}>Applications</a>
                    <a className="bt pt2 pb2" onClick={this.handleLogout}>Logout</a>
                  </div>:null
                }
              </li>
    } else if (this.isVolunteer) {
      profile = <li className="fr f4 w4 tl dropdown"> 
                  <a className="f4 black" onClick={this.handleMouseDropdown}>
                    {this.props.user.first_name} <i className="fa fa-caret-down ml1"></i>
                  </a>
                  {this.state.viewDropdown ?
                    <div className="ba dropdown-content h-auto">
                      <a onClick={this.goToProfile}>Profile</a>
                      <a className="bt pt2" onClick={this.goToMyProjects}>My Projects</a>
                      <a className="bt pt2" onClick={this.goToApplications}>Applications</a>
                      <a className="bt pv2 pb2" onClick={this.handleLogout}>Logout</a>
                    </div>:null
                  }
              </li>         
      } else {
        profile = <li className="fr f4 w4 tl dropdown"> 
                  <a className="f4 black" onClick={this.handleMouseDropdown}>
                    Welcome <i className="fa fa-caret-down ml1"></i>
                  </a>
                  {this.state.viewDropdown ?
                    <div className="ba dropdown-content h-auto">
                      <a onClick={this.goToDashboard}>Sign In</a>
                      <a className="bt pt2 pb2" onClick={this.goToDashboard}>Create Account</a>
                    </div>:null
                  }
              </li>   
      }          
    return profile
  }

  render() {
    return (
    <div className="navbar overflow-auto pr4">
    <img className="fl logo-navbar" alt="The Rising Tides Logo" src={logo} onClick={this.goToDashboard} />
    <ul className="ul">
      {this.renderProfile()}
      <li className="fr f4 w4 tc"> 
        <a className="f4" onClick={this.goToBrowse}>Search</a>
      </li>
      <li className="fr f4 w4 tc"> 
        <a className="f4" onClick={this.goToDashboard}>Dashboard</a>

      </li>
    </ul>
  </div>)
  }
}

NavBar.propTypes = {
  user: PropTypes.object,
  //userType: PropTypes.number
};

export default NavBar;
