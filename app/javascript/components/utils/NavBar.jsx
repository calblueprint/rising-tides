import React from "react";
import logo from "images/rising-tides-logo.png";


class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.goToDashboard = this.goToDashboard.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToBrowse = this.goToBrowse.bind(this);
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
  };

  goToBrowse = () => {
    window.location.href = `/projects`;
  };

  render() {
    return (<div className="navbar overflow-auto pr4">
    <img className="fl h3 w-auto" alt="The Rising Tides Logo" src={logo} onClick={this.goToDashboard} />
    <ul className="ul">
      <li className="fr f4 w4 tc" onClick={this.goToBrowse}>Search</li>
      <li className="fr f4 w4 tc" onClick={this.goToDashboard}>Dashboard</li>
      <li className="fr f4 w4 tc" onClick={this.goToProfile}>Profile</li>
    </ul>
    <br/><br/>
    <hr className="hr-navbar fr pr5"/>
  </div>)
  }
}


export default NavBar;
