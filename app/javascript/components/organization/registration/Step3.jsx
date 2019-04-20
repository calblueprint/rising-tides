import React from "react";
import PropTypes from "prop-types";

class Step3 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentStep, handleChange, city, state, link } = this.props;

    if (currentStep !== 3) {
      return null;
    }
    return (
      <div>
        <section className="flex mb3">
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
        </section>
        <section className="mb3">
          <label htmlFor="link">
            <h3>
              Website <i className="f5">(optional)</i>
            </h3>
            <input
              type="text"
              value={link}
              id="link"
              onChange={handleChange("link")}
            />
          </label>
        </section>
      </div>
    );
  }
}

export default Step3;
