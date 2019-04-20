import React from "react";
import PropTypes from "prop-types";

class Step1 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
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
      name,
      email,
      password,
      passwordConfirmation
    } = this.props;

    if (currentStep !== 1) {
      return null;
    }
    return (
      <div>
        <section className="flex flex-column mb3">
          <label htmlFor="name">
            <h3>Organization Name</h3>
            <input
              type="text"
              value={name}
              id="name"
              onChange={handleChange("name")}
            />
          </label>
        </section>
        <section className="flex flex-column mb3">
          <label htmlFor="email">
            <h3>Login Email</h3>
            <input
              type="text"
              value={email}
              id="email"
              onChange={handleChange("email")}
            />
          </label>
        </section>
        <section className="flex mb3">
          <label htmlFor="password" className="mr3 w-50">
            <h3>Password</h3>
            <input
              type="password"
              value={password}
              id="password"
              onChange={handleChange("password")}
              className="w-100"
            />
            <i className="f6">must be at least 6 characters long</i>
          </label>
          <label htmlFor="passwordConfirmation" className="ml3 w-50">
            <h3>Verify Password</h3>
            <input
              type="password"
              value={passwordConfirmation}
              id="passwordConfirmation"
              onChange={handleChange("passwordConfirmation")}
              className="w-100"
            />
          </label>
        </section>
      </div>
    );
  }
}

export default Step1;
