import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

import Button from "../../helpers/Button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import ProgressBar from "../../helpers/ProgressBar";

// Field names of steps in the form
const STEPS = [
  [], // The first step is 1
  ["firstName", "lastName", "email", "password", "passwordConfirmation"],
  ["phoneNumber", "city", "state", "skills"],
  ["bio"],
  ["selectedProfileFile", "selectedResumeFile", "link"]
];

class FormContainer extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    handleRegistration: PropTypes.func.isRequired,
    handleProfileFileChange: PropTypes.func.isRequired,
    handleResumeFileChange: PropTypes.func.isRequired,
    selectedProfileFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }),
    selectedResumeFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }),
    deleteProfileFile: PropTypes.func.isRequired,
    deleteResumeFile: PropTypes.func.isRequired,
    pbPercentage: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton(errors) {
    const { currentStep, next } = this.props;
    const hasErrors =
      Object.keys(errors).filter(step => STEPS[currentStep].includes(step))
        .length > 0;

    if (currentStep < 4) {
      return (
        <Button type="button-primary" onClick={next} disabled={hasErrors}>
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
      handleProfileFileChange,
      handleResumeFileChange,
      selectedProfileFile,
      selectedResumeFile,
      deleteProfileFile,
      deleteResumeFile,
      handleRegistration,
      pbPercentage,
      style
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
      phoneNumber: Yup.string()
        .required("Required")
        .test("is-phone", "Invalid phone number", value =>
          isValidPhoneNumber(value)
        ),
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
          phoneNumber: "",
          city: "",
          state: "",
          skills: "",
          bio: "",
          link: ""
        }}
        onSubmit={handleRegistration}
        validationSchema={validationSchema}
        render={({ handleSubmit, errors }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className="form-h w-90 w-60-m w-33-l flex flex-column justify-between"
              style={style}
            >
              <div>
                <Step1 currentStep={currentStep} />
                <Step2 currentStep={currentStep} />
                <Step3 currentStep={currentStep} />
                <Step4
                  currentStep={currentStep}
                  handleResumeFileChange={handleResumeFileChange}
                  handleProfileFileChange={handleProfileFileChange}
                  selectedProfileFile={selectedProfileFile}
                  selectedResumeFile={selectedResumeFile}
                  deleteProfileFile={deleteProfileFile}
                  deleteResumeFile={deleteResumeFile}
                />
              </div>
              <div className="flex flex-column">
                <div className="flex flex-row-reverse justify-between">
                  {this.submitButton()}
                  {this.nextButton(errors)}
                  {this.backButton()}
                </div>
                <ProgressBar
                  percentage={pbPercentage}
                  currentStep={currentStep}
                />
              </div>
            </form>
          );
        }}
      />
    );
  }
}

export default FormContainer;
