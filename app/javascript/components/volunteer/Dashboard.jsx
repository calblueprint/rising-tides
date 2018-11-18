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

  render() {
    console.log(this.props)
    return (
      <div>
        <p> Hello. You are a volunteer, and your email is {this.props.user.email}. </p>

        <Logout/>
      </div>
    )
  }
}

export default Dashboard