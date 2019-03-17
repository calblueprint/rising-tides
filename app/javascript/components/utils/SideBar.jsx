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
    return (<div className="fixed bg-white w-25 h-100">
    <div>
      <p className="roboto f4" onClick={this.goToDashboard}>
        Rising Tides
      </p>
    </div>
    <br/>
    <div className="hover-bg-light-blue h3 pa1">
      <p className="roboto f5 hover-white" onClick={this.goToDashboard}>
        Dashboard
      </p>
    </div>

    <div className="hover-bg-light-blue h3 pa1">
      <p className="roboto f5 hover-white" onClick={this.goToProfile}>
       Profile
      </p>
    </div>

    <div className="hover-bg-light-blue h3 pa1">
      <p className="roboto f5 hover-white" onClick={this.goToBrowse}>
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
