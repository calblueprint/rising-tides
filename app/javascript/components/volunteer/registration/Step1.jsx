import React from "react";
import PropTypes from "prop-types";

class Step1 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      currentStep,
      handleChange,
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation
    } = this.props;

    if (currentStep !== 1) {
      return null;
    }
    return (
      <div>
        <div className="flex mb3">
          <label htmlFor="firstName" className="mr3 w-50">
            <h3>First Name</h3>
            <input
              type="text"
              value={firstName}
              id="firstName"
              onChange={handleChange("firstName")}
              className="w-100"
            />
          </label>
          <label htmlFor="lastName" className="ml3 w-50">
            <h3>Last Name</h3>
            <input
              type="text"
              value={lastName}
              id="lastName"
              onChange={handleChange("lastName")}
              className="w-100"
            />
          </label>
        </div>
        <div className="flex flex-column mb3">
          <label htmlFor="email">
            <h3>Email</h3>
            <input
              type="text"
              value={email}
              id="email"
              onChange={handleChange("email")}
            />
          </label>
        </div>
        <div className="flex flex-column mb3">
          <label htmlFor="password" className="mb3">
            <h3>Password</h3>
            <input
              type="password"
              value={password}
              id="password"
              onChange={handleChange("password")}
            />
            <i className="f6">must be at least 6 characters long</i>
          </label>
          <label htmlFor="passwordConfirmation">
            <h3>Verify Password</h3>
            <input
              type="password"
              value={passwordConfirmation}
              id="passwordConfirmation"
              onChange={handleChange("passwordConfirmation")}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Step1;
