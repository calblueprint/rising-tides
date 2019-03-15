/**
 * @prop application - application object associated with this row
 */

import React from "react";

class PhotoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  componentDidMount() {}

  render() {
    const { photo } = this.props;

    if (photo != null) {
      return (
        <div className="project-card">
          <img src={photo} />
        </div>
      );
    }
    return <div className="project-card">No photo</div>;
  }
}

export default PhotoView;
