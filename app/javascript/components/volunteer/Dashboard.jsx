import React from "react"
import Logout from "./Logout"
class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // this.updateEvents();
  }

  viewProfile = () => {
    window.location = `/users/${this.props.user.id}`;
  }

  handleProjectsClick = (e) => {
    e.preventDefault()

    window.location = "/projects"
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Volunteer Dashboard</h1>
        <p> Hello. You are an volunteer, and your email is {this.props.user.email}. </p>
        <button onClick={this.viewProfile}>Profile</button>

        <div>
            <a onClick={this.handleProjectsClick}>View Projects</a>
          </div>

          <div>
            <a onClick={this.handleProjectsClick}>View Applications</a>
          </div>

        <Logout/>
      </div>
    )
  }
}

export default Dashboard
