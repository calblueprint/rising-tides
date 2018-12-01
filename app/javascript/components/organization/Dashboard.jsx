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
    window.location = `/organizations/${this.props.organization.id}`;
  }

  handleCreateProjectClick = (e) => {
    e.preventDefault()

    window.location = "/projects/new"

  }

  handleProjectsClick = (e) => {
    e.preventDefault()

    window.location = "/projects"
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Organization Dashboard</h1>
        <p> Hello. You are an organization, and your email is {this.props.organization.email}. </p>
        <button onClick={this.viewProfile}>Profile</button>

        <div class="input-contianer">
          <div>
            <a onClick={this.handleCreateProjectClick}>Create a Project</a>
          </div>

           <div>
            <a onClick={this.handleProjectsClick}>Your Projects</a>
          </div>
        </div>

        <Logout/>
      </div>
    )
  }
}

export default Dashboard
