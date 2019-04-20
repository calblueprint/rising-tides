/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import axios from "axios";
import Confirmation from "../helpers/Confirmation";
import Error from "../helpers/Error";
import FormContainer from "./registration/FormContainer";
// import { Formik, Form, Field, ErrorMessage } from "formik";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pbPercentage: (1 / 4) * 100,
      currentStep: 1,
      name: "",
      contactFirstName: "",
      contactLastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      contactPhoneNumber: "",
      city: "",
      state: "",
      link: "",
      description: "",
      selectedProfileFile: {},
      formErrors: { firstName: "", lastName: "", email: "" },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordMatch: false,
      contactFirstNameValid: false,
      contactLastNameValid: false,
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
      nameValid,
      emailValid,
      passwordValid,
      passwordMatch,
      contactFirstNameValid,
      contactLastNameValid
    } = this.state;
    switch (fieldName) {
      case "name":
        nameValid = value.length > 0;
        formErrors.name = nameValid ? "" : " is not a valid organization name";
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
      case "contactFirstName":
        contactFirstNameValid = value.length > 0;
        formErrors.firstName = contactFirstNameValid
          ? ""
          : " is not a valid first name";
        break;
      case "contactLastName":
        contactLastNameValid = value.length > 0;
        formErrors.lastName = contactLastNameValid
          ? ""
          : " is not a valid last name";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        nameValid,
        emailValid,
        passwordValid,
        passwordMatch,
        contactFirstNameValid,
        contactLastNameValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const {
      nameValid,
      emailValid,
      passwordValid,
      passwordMatch,
      contactFirstNameValid,
      contactLastNameValid
    } = this.state;
    this.setState({
      formValid:
        nameValid &&
        emailValid &&
        passwordValid &&
        passwordMatch &&
        contactFirstNameValid &&
        contactLastNameValid
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

  handleUpload = () => {};

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleRegistration = e => {
    console.log("entered registration");
    const {
      name,
      email,
      password,
      passwordConfirmation,
      contactFirstName,
      contactLastName,
      contactPhoneNumber,
      city,
      state,
      link,
      description,
      selectedProfileFile
    } = this.state;
    const formData = new FormData();
    formData.append("organization[email]", email);
    formData.append("organization[password]", password);
    formData.append(
      "organization[password_confirmation]",
      passwordConfirmation
    );
    formData.append("organization[contact_first_name]", contactFirstName);
    formData.append("organization[contact_last_name]", contactLastName);
    formData.append("organization[city]", city);
    formData.append("organization[state]", state);
    formData.append("organization[link]", link);
    formData.append("organization[description]", description);
    formData.append("organization[name]", name);
    formData.append("organization[contact_phone_number]", contactPhoneNumber);
    formData.append("organization[profile_image]", selectedProfileFile[0]);
    console.log("formData appended");
    axios
      .post("/organizations", formData)
      .then(response => {
        console.log("sent");
        this.setState({ currentStep: 5 });
        URL.revokeObjectURL(selectedProfileFile.preview);
      })
      .catch(function(error) {
        console.log(error);
        this.setState({ currentStep: 6 });
      });
  };

  form = () => {
    const {
      pbPercentage,
      currentStep,
      name,
      email,
      password,
      passwordConfirmation,
      contactFirstName,
      contactLastName,
      contactPhoneNumber,
      city,
      state,
      link,
      description,
      selectedProfileFile,
      formValid,
      formErrors
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
        handleChange={this.handleChange}
        formErrors={formErrors}
        formValid={formValid}
        name={name}
        email={email}
        password={password}
        passwordConfirmation={passwordConfirmation}
        contactFirstName={contactFirstName}
        contactLastName={contactLastName}
        contactPhoneNumber={contactPhoneNumber}
        city={city}
        state={state}
        link={link}
        description={description}
        selectedProfileFile={selectedProfileFile}
        deleteProfileFile={this.deleteProfileFile}
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
