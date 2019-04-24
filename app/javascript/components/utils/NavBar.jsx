import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import logo from "images/risingtides.svg";
import onClickOutside from "react-onclickoutside"

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.updatePredicate = this.updatePredicate.bind(this);
    this.goToDashboard = this.goToDashboard.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.renderHamburger = this.renderHamburger.bind(this);
    this.goToBrowse = this.goToBrowse.bind(this);
    this.goToApplications = this.goToApplications.bind(this);
    this.goToMyProjects = this.goToMyProjects.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.toggleHamburger = this.toggleHamburger.bind(this);
    this.isOrganization = this.props.organization ? 1 : 0;
    this.isVolunteer = this.props.user ? 1 : 0; 
    this.state = {
      listOpen: false,
      viewHamburger: false,
      hamburgerOpen: false
    }
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ viewHamburger: window.innerWidth < 900 });
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

  handleClickOutside(e) {
    this.setState({
        listOpen: false,
        hamburgerOpen: false
    });
  }

  toggleList() {
    this.setState(prevState => ({
        listOpen: !prevState.listOpen
    }));
  }

  toggleHamburger() {
    this.setState(prevState => ({
         hamburgerOpen: !prevState.hamburgerOpen
    }));
  }

  renderHamburger() {
    let hamburger = <div>
                      <a onClick={() => this.toggleHamburger()}>
                        <i className="fa fa-bars fr pt2 f3"></i>
                      </a>
                      {this.state.hamburgerOpen ?  
                        <div className="ba fr dropdown-content h-auto">
                          <a className="shadow-bold f5" onClick={this.goToDashboard}>Dashboard</a>
                          <a className="bt shadow-bold pt2 f5" onClick={this.goToBrowse}>Browse Projects</a>
                          <a className="bt shadow-bold pt2 f5" onClick={this.goToProfile}>Profile</a>
                          <a className="bt shadow-bold pt2 f5" onClick={this.goToMyProjects}>Projects</a>
                          <a className="bt shadow-bold pt2 f5" onClick={this.goToApplications}>Applications</a>
                          <a className="bt shadow-bold pv2 pb2 f5" onClick={this.handleLogout}>Logout</a>
                        </div>:null
                      }
                    </div>
    return hamburger;
  }

  renderProfile() {
    let profile = null;
    if (this.isOrganization) {
    profile = <li className="fr f4 tl w-auto"> 
                <a className="f4 shadow-bold black" onClick={() => this.toggleList()}>
                  {this.props.organization.name} <i className="fa fa-caret-down ml1"></i>
                </a>
                {this.state.listOpen ?
                  <div className="ba fr dropdown-content h-auto">
                    <a className="shadow-bold" onClick={this.goToProfile}>Profile</a>
                    <a className="bt shadow-bold pt2" onClick={this.goToMyProjects}>Projects</a>
                    <a className="bt shadow-bold pt2" onClick={this.goToApplications}>Applications</a>
                    <a className="bt shadow-bold pt2 pb2" onClick={this.handleLogout}>Logout</a>
                  </div>:null
                }
              </li>
    } else if (this.isVolunteer) {
      profile = <li className="fr f4 tl w-auto"> 
                  <a className="f4 shadow-bold black" onClick={() => this.toggleList()}>
                    {this.props.user.first_name} <i className="fa fa-caret-down ml1"></i>
                  </a>
                  {this.state.listOpen ?
                    <div className="ba fr dropdown-content h-auto">
                      <a className="shadow-bold" onClick={this.goToProfile}>Profile</a>
                      <a className="bt shadow-bold pt2" onClick={this.goToMyProjects}>Projects</a>
                      <a className="bt shadow-bold pt2" onClick={this.goToApplications}>Applications</a>
                      <a className="bt shadow-bold pv2 pb2" onClick={this.handleLogout}>Logout</a>
                    </div>:null
                  }
              </li>         
      } else {
        profile = <li className="fr f4 tl w-auto"> 
                  <a className="f4 shadow-bold black" onClick={() => this.toggleList()}>
                    Welcome <i className="fa fa-caret-down ml1"></i>
                  </a>
                  {this.state.listOpen ?
                    <div className="ba fr dropdown-content h-auto">
                      <a className="shadow-bold" onClick={this.goToDashboard}>Sign In</a>
                      <a className="bt pt2 shadow-bold pb2" onClick={this.goToDashboard}>Create Account</a>
                    </div>:null
                  }
              </li>   
      }          
    return profile
  }

  render() {
    return (
    <div> {this.state.viewHamburger ? (
      <div className="navbar bb pr5">
        <img className="fl logo-navbar" alt="The Rising Tides Logo" src={logo} onClick={this.goToDashboard} />
        {this.renderHamburger()}
      </div>) :
      (<div className="navbar bb pr5">
      <img className="fl logo-navbar" alt="The Rising Tides Logo" src={logo} onClick={this.goToDashboard} />
      <ul className="ul">
        {this.renderProfile()}
        <li className="fr w-auto navbar-box tc"> 
          <a className="f4 shadow-bold" onClick={this.goToBrowse}>Browse Projects</a>
        </li>
        <li className="fr w-auto navbar-box tc"> 
          <a className="f4 shadow-bold" onClick={this.goToDashboard}>Dashboard</a>
        </li>
      </ul>
      </div>)}
  </div>);
  }
}

NavBar.propTypes = {
  user: PropTypes.object,
};

export default onClickOutside(NavBar);
