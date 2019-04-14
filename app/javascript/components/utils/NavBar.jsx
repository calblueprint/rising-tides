import React from "react";
import logo from "images/risingtides.svg";
import PropTypes from "prop-types";


class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.goToDashboard = this.goToDashboard.bind(this);
    this.goToVolunteerProfile = this.goToVolunteerProfile.bind(this);
    this.goToOrganizationProfile = this.goToOrganizationProfile.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.goToBrowse = this.goToBrowse.bind(this);
    this.userType = this.props.userType;
  }

  goToDashboard = () => {
    window.location.href = `/`;
  };

  goToProfile = () => {
    if (this.props.user) {
        window.location.href = `/users/${this.props.user.id}`;
    } else {
        window.location.href = `/users/${this.props.organization.id}`;
    }
  }

  goToOrganizationProfile = () => {
    window.location.href = `/organizations/${this.props.user.id}`;
  };

  goToBrowse = () => {
    window.location.href = `/projects`;
  };

  renderProfile() {
    let profile = null;
    if (this.props.userType == 0) {
      profile = <li className="fr f4 w4 tc"> 
                  <a className="f4 no-link black hover-black" onClick={this.goToOrganizationProfile}>{this.props.user.name}</a>
                </li>
    } else {
      profile = <li className="fr f4 w4 tc"> 
                  <a className="f4 no-link black hover-black" onClick={this.goToVolunteerProfile}>{this.props.user.first_name}</a>
                </li>
    }
    return profile
  }

  render() {
    return (<div className="navbar overflow-auto pr4">
    <img className="fl h3 w-auto logo-padding" alt="The Rising Tides Logo" src={logo} onClick={this.goToDashboard} />
    <ul className="ul">
      {this.renderProfile()}
      <li className="fr f4 w4 tc"> 
        <a className="f4 no-link black hover-black" onClick={this.goToBrowse}>Search</a>
      </li>
      <li className="fr f4 w4 tc"> 
        <a className="b f4 no-link black hover-black" onClick={this.goToDashboard}>Dashboard</a>
      </li>
    </ul>
  </div>)
  }
}

NavBar.propTypes = {
  user: PropTypes.object,
  userType: PropTypes.number
};

export default NavBar;
