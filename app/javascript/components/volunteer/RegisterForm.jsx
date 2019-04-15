import React from "react";
import axios from "axios";
import Confirmation from "./registration/Confirmation";
import Error from "./registration/Error";
import FormContainer from "./registration/FormContainer";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pbPercentage: (1 / 4) * 100,
      currentStep: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      phoneNumber: "",
      city: "",
      state: "",
      link: "",
      skills: "",
      bio: "",
      selectedProfileFile: {},
      selectedResumeFile: {},
      formErrors: { firstName: "", lastName: "", email: "", password: "" },
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordMatch: false,
      formValid: false
    };

    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
  }

  validateField = (fieldName, value) => {
    const { formErrors, password } = this.state;
    let {
      firstNameValid,
      lastNameValid,
      emailValid,
      passwordValid,
      passwordMatch
    } = this.state;
    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length > 0;
        formErrors.firstName = firstNameValid
          ? ""
          : " is not a valid first name";
        break;
      case "lastName":
        lastNameValid = value.length > 0;
        formErrors.lastName = lastNameValid ? "" : " is not a valid last name";
        break;
      case "email":
        emailValid =
          value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
        formErrors.email = emailValid ? "" : " is an invalid email";
        break;
      case "password":
        passwordValid = value.length >= 6;
        formErrors.password = passwordValid ? "" : " is too short";
        break;
      case "passwordConfirmation":
        passwordMatch = value.match(password) !== null;
        formErrors.password = passwordMatch ? "" : " does not match";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        firstNameValid,
        lastNameValid,
        emailValid,
        passwordValid,
        passwordMatch
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const {
      firstNameValid,
      lastNameValid,
      emailValid,
      passwordValid,
      passwordMatch
    } = this.state;
    this.setState({
      formValid:
        firstNameValid &&
        lastNameValid &&
        emailValid &&
        passwordValid &&
        passwordMatch
    });
  };

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
        selectedProfileFile: {}
      });
    }
  };

  deleteResumeFile = click => e => {
    const { key } = e;
    if (click || key === "Enter") {
      this.setState({
        selectedResumeFile: {}
      });
    }
  };

  handleUpload = () => {};

  handleChange = name => e => {
    const { value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleRegistration = e => {
    console.log("entered registration");
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      phoneNumber,
      city,
      state,
      link,
      skills,
      bio,
      selectedProfileFile,
      selectedResumeFile
    } = this.state;
    const formData = new FormData();
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append("user[passwordConfirmation]", passwordConfirmation);
    formData.append("user[firstName]", firstName);
    formData.append("user[lastName]", lastName);
    formData.append("user[city]", city);
    formData.append("user[state]", state);
    formData.append("user[link]", link);
    formData.append("user[bio]", bio);
    formData.append("user[skills]", skills);
    formData.append("user[phoneNumber]", phoneNumber);
    formData.append("user[profile_image]", selectedProfileFile[0]);
    formData.append("user[resume]", selectedResumeFile[0]);
    console.log("formData appended");
    axios
      .post("/users", formData)
      .then(response => {
        console.log("sent");
        this.setState({ currentStep: 5 });
        URL.revokeObjectURL(selectedProfileFile.preview);
      })
      .catch(error => {
        console.log(error);
        this.setState({ currentStep: 6 });
      });
  };

  form = () => {
    const {
      pbPercentage,
      currentStep,
      formErrors,
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      phoneNumber,
      city,
      state,
      link,
      skills,
      selectedProfileFile,
      selectedResumeFile,
      bio,
      formValid
    } = this.state;
    if (currentStep > 4) {
      return null;
    }
    return (
      <FormContainer
        currentStep={currentStep}
        next={this.next}
        prev={this.prev}
        handleRegistration={this.handleRegistration}
        handleProfileFileChange={this.handleProfileFileChange}
        handleResumeFileChange={this.handleResumeFileChange}
        handleChange={this.handleChange}
        formErrors={formErrors}
        formValid={formValid}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        passwordConfirmation={passwordConfirmation}
        phoneNumber={phoneNumber}
        city={city}
        state={state}
        skills={skills}
        selectedProfileFile={selectedProfileFile}
        selectedResumeFile={selectedResumeFile}
        deleteProfileFile={this.deleteProfileFile}
        deleteResumeFile={this.deleteResumeFile}
        bio={bio}
        link={link}
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
