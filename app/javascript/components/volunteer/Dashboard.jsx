import React from "react"
import Logout from "./Logout"
import NavBar from "../utils/NavBar"


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.updateEvents();
  }

  viewProfile = () => {
    window.location = `/users/${this.props.user.id}`;
  };

  handleProjectsClick = (e) => {
    e.preventDefault();

    window.location = "/projects"
  };

  handleApplicationsClick = (e) => {
    e.preventDefault();

    window.location = "/applications"
  };

  render() {
    console.log(this.props);
    return (
      <div>
      <NavBar id={this.props.user.id}/>
      <div className="bg-light-gray h-100">
        <h1>Volunteer Dashboard</h1>
        <p> Hello. You are an volunteer, and your email is {this.props.user.email}. </p>
      </div>
      <div className="input-contianer pt7">
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
