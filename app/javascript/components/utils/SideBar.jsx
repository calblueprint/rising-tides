import React from "react";
import axios from 'axios';


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
    return (<div className="sidebar">
    <div>
      <a onClick={this.goToDashboard}>Dashboard</a>
    </div>

    <div>
      <a onClick={this.goToProfile}>Profile</a>
    </div>

    <div>
      <a onClick={this.goToBrowse}>Browse Projects</a>
    </div>
  </div>)
  }
}

// SideBar.propTypes = {
//   id: PropTypes.number
// }

export default SideBar;
