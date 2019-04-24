import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import Button from "../../helpers/Button";
import ProgressBar from "../../helpers/ProgressBar";

class Step4 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentStep, handleChange, description } = this.props;

    if (currentStep !== 4) {
      return null;
    }
    return (
      <div>
        <section className="mb3">
          <label htmlFor="bio">
            <h3>Tell us about the organization&apos;s mission</h3>
            <textarea
              value={description}
              rows={14}
              onChange={handleChange("description")}
              id="bio"
              style={{ resize: "none" }}
            />
          </label>
        </section>
      </div>
    );
  }
}

export default Step4;
