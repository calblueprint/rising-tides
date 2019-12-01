/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import axios from "axios";
import { isValidPhoneNumber } from "react-phone-number-input";
import Confirmation from "../helpers/Confirmation";
import Error from "../helpers/Error";
import FormContainer from "./registration/FormContainer";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pbPercentage: (1 / 3) * 100,
      currentStep: 1,
      email: "",
      contactPhoneNumber: "",
      selectedProfileFile: null,
      formErrors: {
        contactPhoneNumber: ""
      },
      touched: {
        contactPhoneNumber: false
      }
    };

    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
  }

  handleProfileFileChange = file => {
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

  deleteProfileFile = () => {
    const { selectedProfileFile } = this.state;
    if (selectedProfileFile) {
      URL.revokeObjectURL(selectedProfileFile.preview);
      this.setState({
        selectedProfileFile: null
      });
    }
  };

  handleBlur = field => event => {
    const { touched, formErrors } = this.state;
    this.setState(
      {
        touched: { ...touched, [field]: true }
      },
      () => {
        this.setState({
          formErrors: {
            ...formErrors,
            [field]: this.validateField(field)
          }
        });
      }
    );
  };

  handleChange = field => event => {
    this.setState({ [field]: event === undefined ? "" : event });
  };

  validateField = field => {
    switch (field) {
      case "contactPhoneNumber": {
        const { contactPhoneNumber } = this.state;
        if (!contactPhoneNumber) {
          return "Required";
        }
        if (!isValidPhoneNumber(contactPhoneNumber)) {
          return "Invalid phone number";
        }
        return "";
      }
      default:
        return false;
    }
  };

  handleRegistration = (values, actions) => {
    console.log("entered registration");
    const { contactPhoneNumber, selectedProfileFile } = this.state;
    const formData = new FormData();
    formData.append("organization[email]", values.email);
    formData.append("organization[password]", values.password);
    formData.append(
      "organization[password_confirmation]",
      values.passwordConfirmation
    );
    formData.append(
      "organization[contact_first_name]",
      values.contactFirstName
    );
    formData.append("organization[contact_last_name]", values.contactLastName);
    formData.append("organization[city]", values.city);
    formData.append("organization[state]", values.state);
    formData.append("organization[link]", values.link);
    formData.append("organization[description]", values.description);
    formData.append("organization[name]", values.name);
    formData.append("organization[contact_phone_number]", contactPhoneNumber);
    if (selectedProfileFile) {
      formData.append("organization[profile_image]", selectedProfileFile);
    }
    axios
      .post("/organizations", formData)
      .then(response => {
        if (selectedProfileFile) {
          URL.revokeObjectURL(selectedProfileFile.preview);
        }
        actions.setSubmitting(false);
        this.setState({ currentStep: 5 });
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
      contactPhoneNumber,
      selectedProfileFile,
      formErrors,
      touched
    } = this.state;
    if (currentStep > 3) {
      return null;
    }
    return (
      <FormContainer
        currentStep={currentStep}
        next={this.next}
        prev={this.prev}
        handleRegistration={this.handleRegistration}
        handleProfileFileChange={this.handleProfileFileChange}
        handleBlur={this.handleBlur}
        handleChange={this.handleChange}
        formErrors={formErrors}
        touched={touched}
        contactPhoneNumber={contactPhoneNumber}
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
    currentStep = currentStep >= 3 ? 3 : currentStep + 1;
    pbPercentage = (currentStep / 3) * 100;
    this.setState({
      currentStep,
      pbPercentage
    });
  };

  prev = () => {
    let { currentStep, pbPercentage } = this.state;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    pbPercentage = (currentStep / 3) * 100;
    this.setState({
      currentStep,
      pbPercentage
    });
  };

  backToStart = e => {
    e.preventDefault();
    this.setState({ currentStep: 1, pbPercentage: (1 / 3) * 100 });
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
