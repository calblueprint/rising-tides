/**
* @prop application - application object associated with this row
*/

import React from "react";
import axios from 'axios';

class ApplicationView extends React.Component {

  render() {
    const { application } = this.props;

    return (
      <div>
          <h3>ApplicationHere</h3>
      </div>
    );
  }
}

export default ApplicationView;