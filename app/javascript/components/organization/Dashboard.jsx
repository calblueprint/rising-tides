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

  render() {
    console.log(this.props)
    return (
      <div>
        <p> Hello. You are an organization, and your email is {this.props.organization.email}. </p>
        <button onClick={this.viewProfile}>Profile</button>
        <Logout/>
      </div>
    )
  }
}

export default Dashboard
