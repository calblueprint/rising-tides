/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';

class ProjectView extends React.Component {

  // constructor(props) {
  //   super();
  //   this.state = {
  //     project: null
  //   };
  // }

  // componentDidMount() {
  //   axios.get('/api/projects/' + this.props.project.id)
  //     .then(res => {
  //       this.setState({ project: res.data });
  //       console.log(this.state);
  //     })
  //     .catch(res => {
  //       console.log("ERROR" + res.data);
  //     });
  // }

  render() {
    const { project } = this.props;

    return (
      <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
      </div>
    );

    // return (
    //   <div></div>
    // );
  }
}

export default ProjectView;