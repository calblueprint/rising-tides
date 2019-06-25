/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

class Step1 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentStep } = this.props;

    if (currentStep !== 1) {
      return null;
    }
    return (
      <>
        <section className="flex flex-column">
          <label htmlFor="name">
            <h3>Organization Name</h3>
            <Field type="text" name="name" />
            <ErrorMessage name="name" className="error" component="div" />
          </label>
        </section>
        <section className="flex flex-column">
          <label htmlFor="email">
            <h3>Login Email</h3>
            <Field type="text" name="email" />
            <ErrorMessage name="email" className="error" component="div" />
          </label>
        </section>
        <section className="flex">
          <label htmlFor="password" className="mr3 w-50">
            <h3>Password</h3>
            <Field type="password" name="password" className="w-100" />
            <i className="f6">must be at least 6 characters long</i>
            <ErrorMessage name="password" className="error" component="div" />
          </label>
          <label htmlFor="passwordConfirmation" className="ml3 w-50">
            <h3>Verify Password</h3>
            <Field
              type="password"
              name="passwordConfirmation"
              className="w-100"
            />
            <ErrorMessage
              name="passwordConfirmation"
              className="error"
              component="div"
            />
          </label>
        </section>
      </>
    );
  }
}

export default Step1;
