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
          <h1> application.user_id </h1>
        </a>
        <hr />
      </div>
    );
  }
}

export default ApplicationRow;