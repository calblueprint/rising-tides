import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../../helpers/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import ProgressBar from "../../helpers/ProgressBar";

class RegisterForm extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    formErrors: PropTypes.shape({
      phoneNumber: PropTypes.string
    }).isRequired,
    touched: PropTypes.shape({
      phoneNumber: PropTypes.bool
    }).isRequired,
    handleRegistration: PropTypes.func.isRequired,
    handleProfileFileChange: PropTypes.func.isRequired,
    handleResumeFileChange: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    selectedProfileFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }).isRequired,
    selectedResumeFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }).isRequired,
    deleteProfileFile: PropTypes.func.isRequired,
    deleteResumeFile: PropTypes.func.isRequired,
    pbPercentage: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton() {
    const { currentStep, next } = this.props;
    if (currentStep < 4) {
      return (
        <Button type="button-primary" onClick={next}>
          Next
        </Button>
      );
    }
    return null;
  }

  backButton() {
    const { currentStep, prev } = this.props;
    if (currentStep !== 1 && currentStep < 5) {
      return (
        <Button type="button-secondary" onClick={prev}>
          Back
        </Button>
      );
    }
    return null;
  }

  submitButton() {
    const { currentStep } = this.props;
    if (currentStep === 4) {
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
  }

  render() {
    const {
      currentStep,
      handleChange,
      handleBlur,
      handleProfileFileChange,
      handleResumeFileChange,
      selectedProfileFile,
      selectedResumeFile,
      deleteProfileFile,
      deleteResumeFile,
      handleRegistration,
      phoneNumber,
      pbPercentage,
      formErrors,
      touched
    } = this.props;

    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),
      password: Yup.string()
        .min(6, "Too Short!")
        .required("Password is required"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      skills: Yup.string().required("Required"),
      bio: Yup.string().required("Required"),
      link: Yup.string().url("Invalid link")
    });

    return (
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          city: "",
          state: "",
          skills: "",
          bio: "",
          link: ""
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
                handleChange={handleChange}
                handleBlur={handleBlur}
                formErrors={formErrors}
                touched={touched}
                phoneNumber={phoneNumber}
              />
              <Step3 currentStep={currentStep} />
              <Step4
                currentStep={currentStep}
                handleResumeFileChange={handleResumeFileChange}
                handleProfileFileChange={handleProfileFileChange}
                phoneNumber={phoneNumber}
                selectedProfileFile={selectedProfileFile}
                selectedResumeFile={selectedResumeFile}
                deleteProfileFile={deleteProfileFile}
                deleteResumeFile={deleteResumeFile}
              />
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
