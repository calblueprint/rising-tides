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
        <section className="flex">
          <label htmlFor="firstName" className="mr3 w-50">
            <h3>First Name</h3>
            <Field type="text" name="firstName" className="w-100" />
            <ErrorMessage name="firstName" className="error" component="div" />
          </label>
          <label htmlFor="lastName" className="ml3 w-50">
            <h3>Last Name</h3>
            <Field type="text" name="lastName" className="w-100" />
            <ErrorMessage name="lastName" className="error" component="div" />
          </label>
        </section>
        <section className="flex flex-column">
          <label htmlFor="email">
            <h3>Email</h3>
            <Field type="text" name="email" />
            <ErrorMessage name="email" className="error" component="div" />
          </label>
        </section>
        <section className="flex flex-column">
          <label htmlFor="password" className="mb3">
            <h3>Password</h3>
            <Field type="password" name="password" />
            <ErrorMessage name="password" className="error" component="div" />
            <i className="f6">must be at least 6 characters long</i>
          </label>
          <label htmlFor="passwordConfirmation">
            <h3>Verify Password</h3>
            <Field type="password" name="passwordConfirmation" />
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
