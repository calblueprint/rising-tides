import React from "react";
import PropTypes from "prop-types";
import { Form } from "formik";
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
    handleRegistration: PropTypes.func.isRequired,
    handleProfileFileChange: PropTypes.func.isRequired,
    handleResumeFileChange: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    formErrors: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string
    }).isRequired,
    formValid: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
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
    bio: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
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
    const { currentStep, formValid, handleRegistration } = this.props;
    if (currentStep === 4) {
      return (
        <Button
          type="button-primary"
          value="Next Step"
          disabled={!formValid}
          onClick={handleRegistration}
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
      formErrors,
      handleChange,
      handleProfileFileChange,
      handleResumeFileChange,
      handleRegistration,
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      phoneNumber,
      city,
      state,
      skills,
      selectedProfileFile,
      selectedResumeFile,
      deleteProfileFile,
      deleteResumeFile,
      bio,
      link,
      formValid,
      pbPercentage
    } = this.props;

    return (
      <div className="w-100 flex flex-column items-center">
        <div>
          <div>
            {Object.keys(formErrors).map((fieldName, i) => {
              if (formErrors[fieldName].length > 0) {
                return (
                  <p key={i}>
                    {fieldName} {formErrors[fieldName]}
                  </p>
                );
              }
              return "";
            })}
          </div>
        </div>
        <div className="form-h w-33 flex flex-column justify-between">
          <div>
            <form className="w-100 flex flex-column">
              <Step1
                currentStep={currentStep}
                handleChange={handleChange}
                firstName={firstName}
                lastName={lastName}
                email={email}
                password={password}
                passwordConfirmation={passwordConfirmation}
              />
              <Step2
                currentStep={currentStep}
                handleChange={handleChange}
                phoneNumber={phoneNumber}
                city={city}
                state={state}
                skills={skills}
              />
              <Step3
                currentStep={currentStep}
                handleChange={handleChange}
                bio={bio}
              />
              <Step4
                currentStep={currentStep}
                handleChange={handleChange}
                handleResumeFileChange={handleResumeFileChange}
                handleRegistration={handleRegistration}
                handleProfileFileChange={handleProfileFileChange}
                selectedProfileFile={selectedProfileFile}
                selectedResumeFile={selectedResumeFile}
                deleteProfileFile={deleteProfileFile}
                deleteResumeFile={deleteResumeFile}
                link={link}
                formValid={formValid}
              />
            </form>
          </div>
          <div className="flex flex-column">
            <div className="flex flex-row-reverse justify-between">
              {this.submitButton()}
              {this.nextButton()}
              {this.backButton()}
            </div>
            <ProgressBar percentage={pbPercentage} currentStep={currentStep} />
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
