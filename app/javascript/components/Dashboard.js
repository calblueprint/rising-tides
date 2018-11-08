import React from "react"

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    // this.updateEvents();
  }

  render() {
    const { user } = this.props;

    let actionButton = <span>No Leader Button for you!</span>;

    if (user.role == "CommunityLeader") {
      actionButton = <a href="#">Leader Button</a>;
    }

    return (
      <div>{actionButton}</div>
    );
  }
}
export default Dashboard