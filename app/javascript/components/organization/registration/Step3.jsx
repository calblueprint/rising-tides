/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
      <>
        <section className="flex mb3">
          <label htmlFor="city" className="mr3 w-80">
            <h3>City</h3>
            <Field type="text" name="city" />
            <ErrorMessage name="city" className="error" component="div" />
          </label>
          <label htmlFor="state" className="ml3 w-20">
            <h3>State</h3>
            <Field type="text" name="state" />
            <ErrorMessage name="state" className="error" component="div" />
          </label>
        </section>
        <section className="mb3">
          <label htmlFor="link">
            <h3>
              Website <i className="f5">(optional)</i>
            </h3>
            <Field type="text" name="link" />
            <ErrorMessage name="link" className="error" component="div" />
          </label>
        </section>
        <section className="mb3">
          <label htmlFor="description">
            <h3>Tell us about the organization&apos;s mission</h3>
            <Field
              name="description"
              component="textarea"
              row={6}
              style={{ resize: "none" }}
            />
            <ErrorMessage
              name="description"
              className="error"
              component="div"
            />
          </label>
        </section>
      </>
    );
  }
}

export default Step3;
