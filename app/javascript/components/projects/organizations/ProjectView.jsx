/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';
import ApplicationRow from './ApplicationRow'

class ProjectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          applications: []
      }
    }

      componentDidMount() {
        axios.get(`/api/projects/${this.props.project.id}/applications`).then(ret => {
          let applications = ret.data;
          this.setState({ applications });
      })
    }

    render() {
        const { project } = this.props;
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
          <h1>View Project</h1>
          <h3>{project.title}</h3>
          <h4>Description</h4>
          <p>{project.description}</p>
          <br />

          <h3> Project Applications </h3>
          {applicationList}

          </div>
      );
  }
}

export default ProjectView;