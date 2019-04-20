import React from "react";
import PropTypes from "prop-types";

class Step2 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      currentStep,
      handleChange,
      phoneNumber,
      city,
      state,
      skills
    } = this.props;

    if (currentStep !== 2) {
      return null;
    }
    return (
      <div>
        <div className="mb3">
          <label htmlFor="phoneNumber">
            <h3>Phone Number</h3>
            <input
              type="text"
              value={phoneNumber}
              id="phoneNumber"
              onChange={handleChange("phoneNumber")}
            />
          </label>
        </div>
        <div className="flex mb3">
          <label htmlFor="city" className="mr3 w-80">
            <h3>City</h3>
            <input
              type="text"
              value={city}
              id="city"
              onChange={handleChange("city")}
            />
          </label>
          <label htmlFor="state" className="ml3 w-20">
            <h3>State</h3>
            <input
              type="text"
              value={state}
              id="state"
              onChange={handleChange("state")}
            />
          </label>
        </div>
        <div className="mb3">
          <label htmlFor="skills">
            <h3>Skills</h3>
            <textarea
              value={skills}
              name="skills"
              rows={6}
              cols={50}
              onChange={handleChange("skills")}
              id="skills"
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Step2;
