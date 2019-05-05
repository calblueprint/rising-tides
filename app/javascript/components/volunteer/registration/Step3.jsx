/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

class Step3 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentStep } = this.props;

    if (currentStep !== 3) {
      return null;
    }
    return (
      <div>
        <section>
          <label htmlFor="bio">
            <h3>Tell us a little bit about yourself</h3>
            <Field
              name="bio"
              component="textarea"
              row="14"
              style={{ resize: "none" }}
            />
            <ErrorMessage name="bio" className="error" component="div" />
            {/* <textarea
              value={bio}
              rows={14}
              onChange={handleChange("bio")}
              id="bio"
              style={{ resize: "none" }}
            /> */}
          </label>
        </section>
      </div>
    );
  }
}

export default Step3;
