import React from "react";
import axios from "axios";
import Dropdown from '../../utils/Dropdown';

class EditProfileForm extends React.components {
  constructor(props) {
    super(props);
    var firstName = props.volunteer.first_name;
    var lastName = props.volunteer.last_name;
    var email = props.volunteer.email;
    var passwrod = "*****";
    var phone_number = props.volunteer.phone_number;
    var city = props.volunteer.city;
    var state = props.volunteer.state;
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
    var profileImage = props.volunteer.selected_file;
    var resume = props.volunteer.selected_resume_file;
    var linkedIn = props.volunteer.link;
    var bio = props.volunteer.bio;

    this.state = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone_number: phone_number,
      city: city,
      state: state,
      skills: skills,
      profileImage: profileImage,
      resume: resume,
      linkedIn: linkedIn,
      bio: bio
    };
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleSelectedSingle = this.toggleSelectedSingle.bind(this);
    this.handlers = [];
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);

  }

  validateField = (fieldName, value) => {
    const { formErrors } = this.state;
    let { nameValid } = this.state;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    let { passwordMatch } = this.state;
    switch (fieldName) {
      case "name":
        nameValid = value.length > 0;
        formErrors.firstName = nameValid ? "" : " is not a valid first name";
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
    this.setState({
      formValid:
        this.state.firstNameValid &&
        this.state.lastNameValid &&
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
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  handleSubmit() {
    const formData = new FormData();
    formData.append("volunteer[email]", this.state.email);
    formData.append("volunteer[password]", this.state.password);
    formData.append(
      "volunteer[password_confirmation]",
      this.state.password_confirmation
    );
    formData.append(
      "volunteer[firstName]",
      this.state.firstName
    );
    formData.append(
      "volunteer[lastName]",
      this.state.lastName
    );
    formData.append("volunteer[city]", this.state.city);
    formData.append("volunteer[state]", this.state.state);
    formData.append("volunteer[link]", this.state.linkedIn);
    formData.append("volunteer[description]", this.state.bio);
    formData.append(
      "volunteer[phone_number]",
      this.state.phone_number
    );
    formData.append("volunteer[profile_image]", this.state.selected_file);
    axios
      .post("/volunteers", formData)
      .then(function(response) {
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error);
      });

  }

  render() {
    const { volunteer} = this.state;
    return {
      <div className="w-100 h-100 bg-white">
        <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
            <
            <h1 className="f1 ma0">Edit Profile</h1>

            <div className="flex justify-between w-100">
              <div className="dib w-100 mr3">
                <h3 className="mt5">First Name</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("firstName")}
                    value={this.state.firstName}
                />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt5">Last Name</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("lastName")}
                    value={this.state.lastName}
                />
              </div>
            </div>
            <h3 className="mt3">Email</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="password"
                onChange={this.handleChange("email")}
                value={this.state.email}
            />
            <h3 className="mt3">Password</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="password"
                onChange={this.handleChange("password")}
                value={"*****"}
            />
            <h3 className="mt3">Verify Password</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="password"
                onChange={this.handleChange("password_confirmation")}
            />
            <div className="flex justify-between w-100">
              <div className="dib w-100 mr3">
                <h3 className="mt5">City</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("city")}
                    value={this.state.city}
                />
              </div>
              <div className="dib w-100 ml3">
                <h3 className="mt5">State</h3>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="text"
                    onChange={this.handleChange("state")}
                    value={this.state.state}
                />
              </div>
            </div>
            <div className="dib w-30">
              <h3 className="mt3">Skills</h3>
              <Dropdown
                  titleHelper="Skill"
                  title="Select Skills..."
                  list={this.state.skills}
                  toggleItem={this.toggleSelected}
              />
            </div>



            <div className="dib w-100 ml3">
              <h3 className="mt3">Add a photo</h3>
              <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="file"
                onChange={this.handleFileChange}
                value={this.state.profileImage}
              />
            </div>
            <div className="dib w-100 ml3">
              <h3 className="mt3">Add a resume</h3>
              <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="file"
                onChange={this.handleFileChange}
                value={this.state.resume}
              />
            </div>
            <h3 className="mt3">LinkedIn Profile</h3>
            <input
                className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                type="date"
                onChange={this.handleChange("linkedin")}
                value={this.state.linkedIn}
            />
            <div className="dib w-100 ml3">
              <h3 className="mt3">Tell us a little about yourself.</h3>
              <textarea
                placeholder={"Tell us a little about yourself!"}
                value={this.state.bio}
                rows="6"
                cols="50"
                onChange={this.handleChange("description")}
                id="description"
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
