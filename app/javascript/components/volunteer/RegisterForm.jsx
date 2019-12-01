import React from "react";
import axios from "axios";
import Confirmation from "../helpers/Confirmation";
import Error from "../helpers/Error";
import FormContainer from "./registration/FormContainer";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pbPercentage: (1 / 4) * 100,
      currentStep: 1,
      selectedProfileFile: null,
      selectedResumeFile: null
    };

    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
  }

  handleProfileFileChange = file => {
    console.log(`profile ${file[0]}`);
    if (file[0] !== undefined) {
      this.setState({
        selectedProfileFile: Object.assign(file[0], {
          preview: URL.createObjectURL(file[0])
        })
      });
    } else {
      alert("Please use only files with *.png or *.jpg");
    }
  };

  handleResumeFileChange = file => {
    console.log(`resume ${file[0]}`);
    if (file[0] !== undefined) {
      this.setState({
        selectedResumeFile: file[0]
      });
    }
  };

  deleteProfileFile = click => e => {
    const { selectedProfileFile } = this.state;
    const { key } = e;
    if (click || key === "Enter") {
      URL.revokeObjectURL(selectedProfileFile.preview);
      this.setState({
        selectedProfileFile: null
      });
    }
  };

  deleteResumeFile = click => e => {
    const { key } = e;
    if (click || key === "Enter") {
      this.setState({
        selectedResumeFile: null
      });
    }
  };

  handleUpload = () => {};

  handleRegistration = (values, actions) => {
    const { selectedProfileFile, selectedResumeFile } = this.state;
    const formData = new FormData();

    formData.append("user[email]", values.email);
    formData.append("user[password]", values.password);
    formData.append("user[password_confirmation]", values.passwordConfirmation);
    formData.append("user[first_name]", values.firstName);
    formData.append("user[last_name]", values.lastName);
    formData.append("user[city]", values.city);
    formData.append("user[state]", values.state);
    formData.append("user[link]", values.link);
    formData.append("user[bio]", values.bio);
    formData.append("user[skills]", values.skills);
    formData.append("user[phone_number]", values.phoneNumber);
    if (selectedProfileFile) {
      formData.append("user[profile_image]", selectedProfileFile);
    }
    if (selectedResumeFile) {
      formData.append("user[resume]", selectedResumeFile);
    }

    axios
      .post("/users", formData)
      .then(response => {
        if (selectedProfileFile) {
          URL.revokeObjectURL(selectedProfileFile.preview);
        }
        actions.setSubmitting(false);
        this.setState({ currentStep: 5, email: values.email });
      })
      .catch(error => {
        console.log(error);
        actions.setSubmitting(false);
        this.setState({ currentStep: 6 });
      });
  };

  form = () => {
    const {
      pbPercentage,
      currentStep,
      selectedProfileFile,
      selectedResumeFile
    } = this.state;

    return (
      <FormContainer
        style={{ display: currentStep > 4 ? "none" : "block" }}
        currentStep={currentStep}
        next={this.next}
        prev={this.prev}
        handleRegistration={this.handleRegistration}
        handleProfileFileChange={this.handleProfileFileChange}
        handleResumeFileChange={this.handleResumeFileChange}
        selectedProfileFile={selectedProfileFile}
        selectedResumeFile={selectedResumeFile}
        deleteProfileFile={this.deleteProfileFile}
        deleteResumeFile={this.deleteResumeFile}
        pbPercentage={pbPercentage}
      />
    );
  };

  confirmation = () => {
    const { email, currentStep } = this.state;
    if (currentStep === 5) {
      return <Confirmation email={email} />;
    }
    return null;
  };

  registerError = () => {
    const { currentStep } = this.state;
    if (currentStep === 6) {
      return <Error goBack={this.backToStart} />;
    }
    return null;
  };

  next = () => {
    let { currentStep, pbPercentage } = this.state;
    currentStep = currentStep >= 3 ? 4 : currentStep + 1;
    pbPercentage = (currentStep / 4) * 100;
    this.setState({
      currentStep,
      pbPercentage
    });
  };

  prev = () => {
    let { currentStep, pbPercentage } = this.state;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    pbPercentage = (currentStep / 4) * 100;
    this.setState({
      currentStep,
      pbPercentage
    });
  };

  backToStart = e => {
    e.preventDefault();
    this.setState({ currentStep: 1, pbPercentage: (1 / 4) * 100 });
  };

  render() {
    return (
      <div className="vh-100 flex flex-column justify-center items-center">
        {this.form()}
        {this.confirmation()}
        {this.registerError()}
      </div>
    );
  }
}

export default RegisterForm;
