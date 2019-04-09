import React from "react";
import logo from "images/rising-tides-logo.png";
import PropTypes from "prop-types";


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
      <li className="fr f4 w4 tc"> 
        <a className="f4 no-link black hover-black" onClick={this.goToProfile}>{this.props.user.first_name}</a>
      </li>
      <li className="fr f4 w4 tc"> 
        <a className="f4 no-link black hover-black" onClick={this.goToBrowse}>Search</a>
      </li>
      <li className="fr f4 w4 tc"> 
        <a className="b f4 no-link black hover-black" onClick={this.goToDashboard}>Dashboard</a>
      </li>
    </ul>
    <br/><br/>
    <hr className="hr-navbar fr pr5"/>
  </div>)
  }
}

NavBar.propTypes = {
  user: PropTypes.object,
};

export default NavBar;
