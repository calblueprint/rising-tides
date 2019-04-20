import React from "react";
import PropTypes from "prop-types";
import checkmark from "images/confirmation.png";
import Button from "./Button";

class Confirmation extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  home = () => {
    window.location.href = "/";
  };

  render() {
    const { email } = this.props;
    return (
      <div className="flex flex-column items-center">
        <img className="checkmark" alt="Success Checkmark" src={checkmark} />
        <h2>Verification link sent!</h2>
        <p>
          We emailed a confirmation link to {email}. Check your email to sign
          in.
        </p>
        <Button className="back-home" type="button-primary" onClick={this.home}>
          Return to Login
        </Button>
      </div>
    );
  }
}

export default Confirmation;
