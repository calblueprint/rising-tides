import React from "react"
import $ from "jquery"
import axios from "axios"
class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      city: "",
      state: "",
      link: "",
      skills: "",
      bio: "",
      selected_file: null,
      //TODO: change photo to be of appropriate type
      photo: "",
      formErrors: { firstName: "", lastName: "", email: "" },
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordMatch: false,
      formValid: false
    }

    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    }
  }

  validateField = (fieldName, value) => {
    let formErrors = this.state.formErrors
    let firstNameValid = this.state.firstNameValid
    let lastNameValid = this.state.lastNameValid
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid
    let passwordMatch = this.state.passwordMatch
    switch (fieldName) {
      case "first_name":
        firstNameValid = value.length > 0
        formErrors.firstName = firstNameValid
          ? ""
          : " is not a valid first name"
        break
      case "last_name":
        lastNameValid = value.length > 0
        formErrors.lastName = lastNameValid
          ? ""
          : " is not a valid last name"
        break
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        formErrors.email = emailValid ? "" : " is an invalid email"
        break
      case "password":
        passwordValid = value.length >= 6
        formErrors.password = passwordValid ? "" : " is too short"
        break
      case "password_confirmation":
        passwordMatch = value.match(this.state.password)
        formErrors.password = passwordMatch ? "" : " does not match"
        break
      default:
        break
    }
    this.setState(
      {
        formErrors: formErrors,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
        passwordMatch: passwordMatch
      },
      this.validateForm
    )
  }

  validateForm = () => {
    this.setState({
      formValid:
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordMatch
    })
  }

  handleFileChange = (e) => {
    this.setState({ selected_file: e.target.files[0] })
  }

  handleUpload = () => {
  }

  handleChange = name => event => {
    const value = event.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })
  }

  handleRegistration = (e) => {
    let formData = new FormData();
    formData.append('user[email]', this.state.email);
    formData.append('user[password]', this.state.password);
    formData.append('user[password_confirmation]', this.state.password_confirmation);
    formData.append('user[first_name]', this.state.first_name);
    formData.append('user[last_name]', this.state.last_name);
    formData.append('user[city]', this.state.city);
    formData.append('user[state]', this.state.state);
    formData.append('user[link]', this.state.link);
    formData.append('user[bio]', this.state.bio);
    formData.append('user[skills]', this.state.skills);
    formData.append('user[phone_number]', this.state.phone_number);
    formData.append(
      "user[profile_image]",
      this.state.selected_file
    )
    axios
      .post("/users", formData)
      .then(function(response) {
        window.location = "/"
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  goBack = (e) => {
    e.preventDefault();
    window.location = "/";
  }

  render() {
    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <div>
          <div>
            {Object.keys(this.state.formErrors).map((fieldName, i) => {
              if (this.state.formErrors[fieldName].length > 0) {
                return (
                  <p key={i}>
                    {fieldName} {this.state.formErrors[fieldName]}
                  </p>
                )
              } else {
                return ""
              }
            })}
          </div>
        </div>
        <form>
          <fieldset>
            <label htmlFor="first_name">
              First Name (required)
            </label>
            <input
              type="text"
              placeholder="ie. John"
              value={this.state.first_name}
              id="first_name"
              onChange={this.handleChange("first_name")}
            /> <br/>
            <label htmlFor="last_name">
              Last Name (required)
            </label>
            <input
              type="text"
              placeholder="ie. Doe"
              value={this.state.last_name}
              id="last_name"
              onChange={this.handleChange("last_name")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">
              Email (required)
            </label>
            <input
              type="text"
              placeholder="ie. johndoe@email.com"
              value={this.state.email}
              id="email"
              onChange={this.handleChange("email")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">
              Password (required, 6 characters minimum)
            </label>
            <input
              type="password"
              placeholder="ie. password123"
              value={this.state.password}
              id="password"
              onChange={this.handleChange("password")}
            /> <br/>
            <label
              htmlFor="password_confirmation"
            >
              Confirm password
            </label>
            <input
              type="password"
              placeholder="ie. password123"
              value={this.state.password_confirmation}
              id="password_confirmation"
              onChange={this.handleChange("password_confirmation")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="phone_number">
              Phone number
            </label>
            <input
              type="text"
              placeholder="ie. (123)456-7890"
              value={this.state.phone_number}
              id="phone_number"
              onChange={this.handleChange("phone_number")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="city">
              City
            </label>
            <input
              type="text"
              placeholder="ie. San Francisco"
              value={this.state.city}
              id="city"
              onChange={this.handleChange("city")}
            /> <br/>
            <label htmlFor="state">
              State (abbreviation)
            </label>
            <input
              type="text"
              placeholder="ie. CA"
              value={this.state.state}
              id="state"
              onChange={this.handleChange("state")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">
              Link
            </label>
            <input
              type="text"
              placeholder="ie. linkedin.com/in/john-doe/"
              value={this.state.link}
              id="link"
              onChange={this.handleChange("link")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="skills">
              Skills
            </label>
            <textarea
              placeholder="ie. Software Development"
              value={this.state.skills}
              name="skills"
              rows="6"
              cols="50"
              onChange={this.handleChange("skills")}
              id="skills"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="bio">
              Bio
            </label>
            <textarea
              placeholder="Tell us about yourself!"
              value={this.state.bio}
              rows="6"
              cols="50"
              onChange={this.handleChange("bio")}
              id="bio"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="photo">
              Photo
            </label>
            <input type="file" onChange={this.handleFileChange} />
          </fieldset>
        </form>
        <fieldset>
          <button
            type="submit"
            value="Next Step"
            disabled={!this.state.formValid}
            onClick={this.handleRegistration}
          >
            Complete volunteer registration!
          </button>
        </fieldset>
      </div>
    )
  }
}
export default RegisterForm
