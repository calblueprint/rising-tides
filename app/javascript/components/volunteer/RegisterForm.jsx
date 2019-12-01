import React from "react";
import axios from "axios";
import { isValidPhoneNumber } from "react-phone-number-input";
import Confirmation from "../helpers/Confirmation";
import Error from "../helpers/Error";
import FormContainer from "./registration/FormContainer";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    var skills_a = [];
    var i, skill;
    for (i in props.skills) {
        skill = props.skills[i];
        skills_a.push({
            id: i,
            uid: skill['id'],
            title: skill['name'],
            selected: false,
            key: 'skills'
        });
    }
    this.state = {
      pbPercentage: (1 / 4) * 100,
      currentStep: 1,
      phoneNumber: "",
      skills: skills_a,
      selectedProfileFile: null,
      selectedResumeFile: null,
      formErrors: {
        phoneNumber: ""
      },
      touched: {
        phoneNumber: false
      }
    };

    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected(id, key) {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp
    });
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
      case "phoneNumber": {
        const { phoneNumber } = this.state;
        if (!phoneNumber) {
          return "Required";
        }
        if (!isValidPhoneNumber(phoneNumber)) {
          return "Invalid phone number";
        }
        return "";
      }
      default:
        return false;
    }
  };

  handleRegistration = (values, actions) => {
    const {
      phoneNumber,
      skills,
      selectedProfileFile,
      selectedResumeFile
    } = this.state;
    const formData = new FormData();
    var i;
    for (i in this.state.skills) {
        if (this.state.skills[i].selected)
            formData.append("user[skill_ids][]", this.state.skills[i].uid);
    }
    formData.append("user[email]", values.email);
    formData.append("user[password]", values.password);
    formData.append("user[password_confirmation]", values.passwordConfirmation);
    formData.append("user[first_name]", values.firstName);
    formData.append("user[last_name]", values.lastName);
    formData.append("user[city]", values.city);
    formData.append("user[state]", values.state);
    formData.append("user[link]", values.link);
    formData.append("user[bio]", values.bio);
    formData.append("user[phone_number]", phoneNumber);
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
      formErrors,
      touched,
      phoneNumber,
      skills,
      selectedProfileFile,
      selectedResumeFile
    } = this.state;
    if (currentStep > 4) {
      return null;
    }
    return (
      <FormContainer
        currentStep={currentStep}
        next={this.next}
        prev={this.prev}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        handleRegistration={this.handleRegistration}
        handleProfileFileChange={this.handleProfileFileChange}
        handleResumeFileChange={this.handleResumeFileChange}
        toggleSelected={this.toggleSelected}
        phoneNumber={phoneNumber}
        skills={skills}
        selectedProfileFile={selectedProfileFile}
        selectedResumeFile={selectedResumeFile}
        deleteProfileFile={this.deleteProfileFile}
        deleteResumeFile={this.deleteResumeFile}
        pbPercentage={pbPercentage}
        formErrors={formErrors}
        touched={touched}
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
