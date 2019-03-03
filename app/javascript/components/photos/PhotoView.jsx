/**
* @prop application - application object associated with this row
*/

import React from "react";
import axios from 'axios';

class PhotoView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  componentDidMount() {
  }

  render() {
    const { photo } = this.props;

    if (photo != null) {
      return (
        <div className="project-card">
          <img src={photo} />
        </div>
      );
    } else {
      return (
        <div className="project-card" >
          No photo
        </div>
      );
    }
  }
}

export default PhotoView;