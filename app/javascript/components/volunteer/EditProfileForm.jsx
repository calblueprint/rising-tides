import React from "react";
import axios from "axios";
import Dropdown from '../utils/Dropdown';
// import { Field, ErrorMessage } from "formik";

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    var skills = [];
    for (i in props.skills){
      skill = props.skills[i];
      skills.push({
          id: i,
          uid: skill['id'],
          title: skill['name'],
          key: 'skills'
      });
    }

    this.state = {
      user: this.props.user,
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
    // this.handleChange = this.handleChange.bind(this);
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
        formErrors.first_name = first_nameValid
          ? ""
          : " is not a valid first name";
        break;
      case "last_name":
        last_nameValid = value.length > 0;
        formErrors.last_name = last_nameValid ? "" : " is not a valid last name";
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
    );
  };

  handleFileChange = e => {
    this.setState({ selected_file: e.target.files[0] });
  };

  handleResumeFileChange = e => {
    this.setState({ selected_resume_file: e.target.files[0] });
  };


  handleChange = name => event => {
    var user = this.state.user;
    user[name] = event.target.value;
    this.setState({ user: user });
  };


  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  handleSubmit() {
    const formData = new FormData();
    let { selected_file, selected_resume_file } = this.state;
    formData.append("user[email]", this.state.user.email);
    formData.append("user[password]", this.state.user.password);
    formData.append(
      "user[password_confirmation]",
      this.state.user.password_confirmation
    );
    formData.append(
      "user[first_name]",
      this.state.user.first_name
    );
    formData.append(
      "user[last_name]",
      this.state.user.last_name
    );
    formData.append("user[city]", this.state.user.city);
    formData.append("user[state]", this.state.user.state);
    formData.append("user[link]", this.state.user.linkedIn);
    formData.append("user[bio]", this.state.user.bio);
    formData.append(
      "user[phone_number]",
      this.state.user.phone_number
    );
    formData.append("user[profile_image]", selected_file);
    formData.append("user[resume]", selected_resume_file);
    let { user } = this.props;
    axios
      .patch(`/api/users/` + user.id, formData)
      .then(function(response) {
        console.log(response);
        console.log(response.data.message);
        window.location.href = "/users/" + user.id;
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.response.data.message);
        // console.log(error);
      });

  }

  render() {
    const { user} = this.state;
    return (
      <div className="w-100 h-100 bg-white">
        <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">

            <h1 className="f1 ma0">Edit Profile</h1>

            <div className="flex justify-between w-100">
              <div className="dib w-100 mr3">
                <h3 className="mt5">First Name</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("first_name")}
                    defaultValue={this.state.user.first_name}
                />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt5">Last Name</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("last_name")}
                    defaultValue={this.state.user.last_name}
                />
              </div>
            </div>
            <h3 className="mt3">Email</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="text"
                onChange={this.handleChange("email")}
                defaultValue={this.state.user.email}
            />
            <h3 className="mt3">Password</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="password"
                onChange={this.handleChange("password")}
                defaultValue={"*****"}
            />
            <h3 className="mt3">Verify Password</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="password"
                onChange={this.handleChange("password_confirmation")}
                defaultValue={"*****"}
            />
            <div className="flex justify-between w-100">
              <div className="dib w-100 mr3">
                <h3 className="mt3">City</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("city")}
                    defaultValue={this.state.user.city}
                />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt3">State</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("state")}
                    defaultValue={this.state.user.state}
                />
              </div>
            </div>
            <div className="dib w-30">
              <h3 className="mt3">Skills</h3>
            </div>
            <h3 className="mt3">Add a photo</h3>
            <input
              className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
              type="file"
              onChange={this.handleFileChange}
              defaultValue={this.state.user.profileImage}
            />
            <h3 className="mt3">Add a resume</h3>
            <input
              className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
              type="file"
              onChange={this.handleResumeFileChange}
              defaultValue={this.state.user.resume}
            />
            <h3 className="mt3">LinkedIn Profile</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="url"
                onChange={this.handleChange("linkedin")}
                defaultValue={this.state.linkedIn}
            />
            <h3 className="mt3">Tell us a little about yourself.</h3>
            <textarea
              className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
              placeholder={"Tell us a little about yourself!"}
              value={this.state.user.bio}
              rows="6"
              cols="50"
              onChange={this.handleChange("bio")}
              id="description"
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
