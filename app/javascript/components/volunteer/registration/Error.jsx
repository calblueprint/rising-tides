import React from "react";
import PropTypes from "prop-types";
import Button from "../../helpers/Button";

class Error extends React.Component {
  static propTypes = { goBack: PropTypes.func.isRequired };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { goBack } = this.props;
    return (
      <div className="flex flex-column items-center">
        <p>Error</p>
        <Button type="button-primary" onClick={goBack}>
          Go Back
        </Button>
      </div>
    );
  }
}

export default Error;
