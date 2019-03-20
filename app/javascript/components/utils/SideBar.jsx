import React from "react";
import PropTypes from "prop-types";


class SideBar extends React.Component {

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
    window.location.href = `/users/${this.props.id}`;
  };

  goToBrowse = () => {
    window.location.href = `/projects`;
  };

  render() {
    return (<div className="fixed bg-white w-25 ph3 h-100">
    <div>
      <p className="roboto f4" onClick={this.goToDashboard}>
        Rising Tides
      </p>
    </div>
    <br/>
    <div className="hover-bg-light-blue h3 pa1" onClick={this.goToDashboard}>
      <p className="roboto f5 hover-white">
        Dashboard
      </p>
    </div>

    <div className="hover-bg-light-blue h3 pa1" onClick={this.goToProfile}>
      <p className="roboto f5 hover-white">
       Profile
      </p>
    </div>

    <div className="hover-bg-light-blue h3 pa1" onClick={this.goToBrowse}>
      <p className="roboto f5 hover-white">
        Browse Projects
      </p>
    </div>

  </div>)
  }
}

SideBar.propTypes = {
  id: PropTypes.number
}

export default SideBar;
