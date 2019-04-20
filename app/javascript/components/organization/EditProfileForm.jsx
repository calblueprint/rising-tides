import React from "react";
import axios from "axios";
import Dropdown from '../../utils/Dropdown';

class EditProfileForm extends React.components {
  constructor(props) {
    super(props);
    var name = props.name;
    var website = props.organization.website;
    var location = props.organization.lcoation;
    var passwrod = "*****";
    var password_confirmation = props.organization.password_confirmation;
    var profileImage = <span>No Image</span>;
    if (this.props.profileImage_url) {
      profileImage = <img src={this.props.profileImage_url} />;
    }
    var mission = props.organization.description;
    var contact_first_name = props.organization.contact_first_name;
    var contact_last_name = props.organization.contact_last_name;
    var contact_phone_number = props.organization.phone_number;
    var contact_selected_file = props.organization.contact_selected_file;
    this.state{
      name: name,
      website: website,
      location: location,
      password: password,
      password_confirmation: password_confirmation,
      profileImage: profileImage,
      mission: mission,
      contact_first_name: contact_first_name,
      contact_last_name: contact_last_name,
      contact_selected_file: contact_selected_file,
    }

  }

  validateField = (fieldName, value) => {
    const { formErrors } = this.state;
    let { nameValid } = this.state;
    let { website } = this.state;
    let { password } = this.state;
    let { password_confirmation } = this.state;
    switch (fieldName) {
      case "name":
        nameValid = value.length > 0;
        formErrors.firstName = nameValid ? "" : " is not a valid first name";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+).+([\w]{2,})$/i);
        formErrors.email = emailValid ? "" : " is an invalid website";
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
        nameValid,
        emailValid,
        password,
        password_confirmation
      },
      this.validateForm
    );
  };


  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  handleSubmit = e => {
    const formData = new FormData();
    formData.append("organization[email]", this.state.email);
    formData.append("organization[password]", this.state.password);
    formData.append(
      "organization[password_confirmation]",
      this.state.password_confirmation
    );
    formData.append(
      "organization[contact_first_name]",
      this.state.contact_first_name
    );
    formData.append(
      "organization[contact_last_name]",
      this.state.contact_last_name
    );
    formData.append("organization[city]", this.state.city);
    formData.append("organization[state]", this.state.state);
    formData.append("organization[link]", this.state.link);
    formData.append("organization[description]", this.state.description);
    formData.append("organization[name]", this.state.name);
    formData.append(
      "organization[contact_phone_number]",
      this.state.contact_phone_number
    );
    formData.append("organization[profile_image]", this.state.selected_file);
    formData.append("organization[contact_image]", this.state.contact_selected_file);
    axios
      .post("/organizations", formData)
      .then(function(response) {
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { organization} = this.state;
    return {
      <div className="w-100 h-100 bg-white">
        <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
            <
            <h1 className="f1 ma0">Edit Profile</h1>

            <h2 className="mt5">Organization Information</h2>
            <h3 className="mt2">Organization Name</h3>
            <input
                className="essay-box bg-light-gray mt1 w-100 pa3"
                type="text"
                onChange={this.handleChange("name")}
                value={this.state.name}
            />
            <h3 className="mt3">Website</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="date"
                onChange={this.handleChange("website")}
                value={this.state.link}
            />
            <div className="flex justify-between w-100">
              <div className="dib w-100 mr3">
                <h3 className="mt3">City</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("city")}
                    value={this.state.city}
                />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt3">State</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("state")}
                    value={this.state.state}
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
                  value={"*****"}
              />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt3">Verify Password</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="password"
                    onChange={this.handleChange("password_confirmation")}
                />
              </div>
            </div>
            <div className="dib w-100 ml3">
              <h3 className="mt3">Add a logo</h3>
              <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="file"
                onChange={this.handleFileChange}
                value={this.state.selected_file}
              />
            </div>
            <div className="dib w-100 ml3">
              <h3 className="mt3">Tell us about the organization's mission.</h3>
              <textarea
                placeholder="Tell us about your organization!"
                value={this.state.description}
                rows="6"
                cols="50"
                onChange={this.handleChange("description")}
                id="description"
              />
            </div>

            <h2 className="mt5">Contact Information</h2>
            <div className="flex justify-between w-100">
              <div className="dib w-100 ml3">
                <h3 className="mt3">First Name</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("contact_first_name")}
                    value={this.state.state}
                />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt3">Last Name</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("contact_last_name")}
                    value={this.state.state}
                />
              </div>
            </div>
            <div className="dib w-100 ml3">
              <h3 className="mt3">Phone Number</h3>
              <input
                  className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                  type="text"
                  onChange={this.handleChange("contact_phone_number")}
                  value={this.state.state}
              />
            </div>
            <div className="dib w-100 ml3">
              <h3 className="mt3">Add a Photo</h3>
              <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="file"
                onChange={this.handleFileChange}
                value={this.state.contact_selected_file}
              />
            </div>
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

    }
  }
}

export default EditProfileForm;
