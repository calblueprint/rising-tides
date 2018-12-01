import React from "react";
import axios from 'axios';
import ApplicationRow from './ApplicationRow';

class ApplicationsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      applications: []
    };
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.user.id}/applications`).then(ret => {
      console.log(this.props)
      let applications = ret.data;
      this.setState({ applications });
    })
  }

  goBack = (e) => {
    e.preventDefault();
    window.location = "/";
  }

  render() {
    let applicationList;

    if (this.state.applications.length != 0) {
      applicationList = this.state.applications.map((application, index) => {
        return <ApplicationRow application={application} key={index} />
      });
    } else {
      applicationList = (
        <li>
          No Results
        </li>
     )
    }

    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <h1>Applications</h1>
        {applicationList}
      </div>
    );
  }

}

export default ApplicationsIndex;