import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../../helpers/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import ProgressBar from "../../helpers/ProgressBar";

class RegisterForm extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    handleRegistration: PropTypes.func.isRequired,
    handleProfileFileChange: PropTypes.func.isRequired,
    formErrors: PropTypes.shape({
      contactPhoneNumber: PropTypes.string
    }).isRequired,
    touched: PropTypes.shape({
      contactPhoneNumber: PropTypes.bool
    }).isRequired,
    contactPhoneNumber: PropTypes.string.isRequired,
    selectedProfileFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }).isRequired,
    deleteProfileFile: PropTypes.func.isRequired,
    pbPercentage: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton = () => {
    const { currentStep, next } = this.props;
    if (currentStep < 3) {
      return (
        <Button type="button-primary" onClick={next}>
          Next
        </Button>
      );
    }
    return null;
  };

  backButton = () => {
    const { currentStep, prev } = this.props;
    if (currentStep !== 1 && currentStep < 4) {
      return (
        <Button type="button-secondary" onClick={prev}>
          Back
        </Button>
      );
    }
    return null;
  };

  submitButton = () => {
    const { currentStep, formErrors } = this.props;
    if (currentStep === 3) {
      return (
        <Button
          type="button-primary-submit"
          value="Next Step"
          disabled={false}
          className="self-end"
        >
          Sign up
        </Button>
      );
    }
    return null;
  };

  // validate = (values, props) => {
  //   const errors = {};
  //   if (!values.name) {
  //     errors.name = "Required";
  //   } else if (
  //     !/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/.test(
  //       values.name
  //     )
  //   ) {
  //     errors.name = "Invalid organization name";
  //   }
  //   if (!values.email) {
  //     errors.email = "Required";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "Invalid email address";
  //   }
  //   if (!values.password) {
  //     errors.password = "Required";
  //   } else if (values.password.length < 6) {
  //     errors.password = "Too short!";
  //   }
  //   if (!values.passwordConfirmation) {
  //     errors.passwordConfirmation = "Required";
  //   } else if (values.passwordConfirmation !== values.password) {
  //     errors.passwordConfirmation = "Passwords do not match";
  //   }

  //   return errors;
  // };

  render() {
    const {
      pbPercentage,
      currentStep,
      contactPhoneNumber,
      handleProfileFileChange,
      selectedProfileFile,
      deleteProfileFile,
      handleRegistration,
      handleChange,
      handleBlur,
      formErrors,
      touched
    } = this.props;

    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),
      password: Yup.string()
        .min(6, "Too Short!")
        .required("Password is required"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      contactFirstName: Yup.string().required("Required"),
      contactLastName: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      link: Yup.string().url("Invalid link"),
      description: Yup.string().required("Required")
    });

    return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          contactFirstName: "",
          contactLastName: "",
          contactPhoneNumber: "",
          city: "",
          link: "",
          description: ""
        }}
        onSubmit={handleRegistration}
        validationSchema={validationSchema}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="form-h w-90 w-60-m w-33-l flex flex-column justify-between"
          >
            <div>
              <Step1 currentStep={currentStep} />
              <Step2
                currentStep={currentStep}
                contactPhoneNumber={contactPhoneNumber}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleProfileFileChange={handleProfileFileChange}
                selectedProfileFile={selectedProfileFile}
                deleteProfileFile={deleteProfileFile}
                formErrors={formErrors}
                touched={touched}
              />
              <Step3 currentStep={currentStep} />
            </div>
            <div className="flex flex-column">
              <div className="flex flex-row-reverse justify-between">
                {this.submitButton()}
                {this.nextButton()}
                {this.backButton()}
              </div>
              <ProgressBar
                percentage={pbPercentage}
                currentStep={currentStep}
              />
            </div>
          </form>
        )}
      />
    );
  }
}

export default RegisterForm;
