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
        <p> Hello. You are a volunteer, and your email is {this.props.user.email}. </p>
        <button onClick={this.viewProfile}>Profile</button>

        <div>
            <button onClick={this.handleProjectsClick}>View Projects</button>
          </div>

          <div>
            <button onClick={this.handleProjectsClick}>View Applications</button>
          </div>

        <Logout/>
      </div>
    )
  }
}

export default Dashboard
