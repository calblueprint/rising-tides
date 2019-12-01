import React from "react";
import axios from "axios";
import Dropdown from '../utils/Dropdown';


class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.profileImage_url) {
      profileImage = <img src={this.props.profileImage_url} />;
    }
    this.state = {
      organization: this.props.organization,
      formErrors: { first_name: "", last_name: "", email: "" },
      first_nameValid: false,
      last_nameValid: false,
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
    this.handlers = [];
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  validateField = (fieldName, value) => {
    const { formErrors } = this.state;
    let { first_nameValid } = this.state;
    let { last_nameValid } = this.state;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    let { passwordMatch } = this.state;
    switch (fieldName) {
      case "first_name":
        first_nameValid = value.length > 0;
        formErrors.contact_first_name = contact_first_nameValid
          ? ""
          : " is not a valid first name";
        break;
      case "last_name":
        last_nameValid = value.length > 0;
        formErrors.contact_last_name = contact_last_nameValid ? "" : " is not a valid last name";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? "" : " is an invalid email";
        break;
      case "password":
        passwordValid = value.length >= 6;
        formErrors.password = passwordValid ? "" : " is too short";
        break;
      case "password_confirmation":
        passwordMatch = value.match(this.state.password);
        formErrors.password = passwordMatch ? "" : " does not match";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        first_nameValid,
        last_nameValid,
        emailValid,
        passwordValid,
        passwordMatch
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid:
        this.state.first_nameValid &&
        this.state.last_nameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordMatch
    });
  };

  handleFileChange = e => {
    this.setState({ selected_file: e.target.files[0] });
  };

  handleResumeFileChange = e => {
    this.setState({ selected_resume_file: e.target.files[0] });
  };


  handleChange = name => event => {
    var organization = this.state.organization;
    organization[name] = event.target.value;
    this.setState({ organization: organization });
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  handleSubmit() {
    const formData = new FormData();
    const { selected_file, contact_selected_file, organization } = this.state;
    formData.append("organization[email]", organization.email);
    formData.append("organization[password]", organization.password);
    formData.append(
      "organization[password_confirmation]",
      organization.password_confirmation
    );
    formData.append(
      "organization[contact_first_name]",
      organization.contact_first_name
    );
    formData.append(
      "organization[contact_last_name]",
      organization.contact_last_name
    );
    formData.append("organization[city]", organization.city);
    formData.append("organization[state]", organization.state);
    formData.append("organization[link]", organization.link);
    formData.append("organization[description]", organization.description);
    formData.append("organization[name]", organization.name);
    formData.append(
      "organization[contact_phone_number]",
      organization.contact_phone_number
    );
    formData.append("organization[profile_image]", selected_file);
    formData.append("organization[contact_selected_file]", contact_selected_file);

    axios
      .patch("/api/organizations/" + organization.id, formData)
      .then(() => {
        window.location.href = "/organizations/" + organization.id;
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.response.data.message);
      });
  };

  render() {
    const { organization } = this.state;
    return (
      <div className="w-100 h-100 bg-white">
        <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">

            <h1 className="f1 ma0">Edit Profile</h1>

            <h2 className="mt5">Organization Information</h2>
            <h3 className="mt2">Organization Name</h3>
            <input
                className="essay-box bg-light-gray mt1 w-100 pa3"
                type="text"
                onChange={this.handleChange("name")}
                defaultValue={organization.name}
            />
            <h3 className="mt3">Website</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="email"
                onChange={this.handleChange("website")}
                defaultValue={organization.website}
            />
            <div className="flex justify-between w-100">
              <div className="dib w-100 mr3">
                <h3 className="mt3">City</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("city")}
                    defaultValue={organization.city}
                />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt3">State</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("state")}
                    defaultValue={organization.state}
                />
              </div>
            </div>
            <div className="flex justify-between w-100">
              <div className="dib w-100 mr3">
              <h3 className="mt3">Password</h3>
              <input
                  className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                  type="password"
                  onChange={this.handleChange("password")}
                  defaultValue={"*****"}
              />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt3">Verify Password</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="password"
                    onChange={this.handleChange("password_confirmation")}
                    defaultValue={"*****"}
                />
              </div>
            </div>
            <h3 className="mt3">Add a logo</h3>
            <input
              className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
              type="file"
              onChange={this.handleFileChange}
              defaultValue={organization.profile_image}
            />
            <h3 className="mt3">Tell us about the organization's mission.</h3>
            <textarea
              className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
              placeholder="Tell us about your organization!"
              defaultValue={organization.description}
              rows="6"
              cols="50"
              onChange={this.handleChange("description")}
              id="description"
            />
            <h2 className="mt5">Contact Information</h2>
            <div className="flex justify-between w-100">
              <div className="dib w-100 mr3">
                <h3 className="mt3">First Name</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("contact_first_name")}
                    defaultValue={organization.contact_first_name}
                />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt3">Last Name</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("contact_last_name")}
                    defaultValue={organization.contact_last_name}
                />
              </div>
            </div>
            <h3 className="mt3">Phone Number</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="tel"
                onChange={this.handleChange("contact_phone_number")}
                defaultValue={organization.contact_phone_number}
            />
            <h3 className="mt3">Add a Photo</h3>
            <input
              className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
              type="file"
              onChange={this.handleFileChange}
              defaultValue={organization.contact_selected_file}
            />
            <div className="mt5">
                <a className="fl std-button-black ph3 pv1 fw4 f5" onClick={this.goBack}>
                    Cancel
                </a>
                <a className="fr std-button ph3 pv1 fw4 f5 ml3" onClick={() => this.handleSubmit()}>
                    Save
                </a>
            </div>


        </div>
      </div>
    )
  }
}

export default EditProfileForm;
