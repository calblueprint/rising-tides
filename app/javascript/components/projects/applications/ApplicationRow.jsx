/**
* @prop application - application object associated with this row
*/

import React from "react";

class ApplicationRow extends React.Component {

  goToApplication = () => {
    window.location.href = `/applications/${this.props.application.id}`;
  }

  render() {
    const { application } = this.props;
    const id = application.id;

    return (
      <div>
        <a href="#" onClick={this.goToApplication}>
          Application Here
        </a>
        <hr />
      </div>
    );
  }
}

export default ApplicationRow;