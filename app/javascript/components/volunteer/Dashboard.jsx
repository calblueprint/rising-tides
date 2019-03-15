import React from "react";
import Logout from "./Logout";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.updateEvents();
  }

  viewProfile = ({ user }) => {
    window.location.href = `/users/${user.id}`;
  };

  handleProjectsClick = e => {
    e.preventDefault();

    window.location.href = "/projects";
  };

  handleApplicationsClick = e => {
    e.preventDefault();

    window.location.href = "/applications";
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Volunteer Dashboard</h1>
        <p>
          Hello. You are an volunteer, and your email is {this.props.user.email}
          .
        </p>

        <div className="input-contianer">
          <div>
            <a onClick={this.viewProfile}>Profile</a>
          </div>

          <div>
            <a onClick={this.handleProjectsClick}>View Projects</a>
          </div>

          <div>
            <a onClick={this.handleApplicationsClick}>View Applications</a>
          </div>
        </div>

        <Logout />
      </div>
    );
  }
}

export default Dashboard;
