import React from "react"
import $ from "jquery"
import axios from "axios"

class RegisterForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      contact_first_name: "",
      contact_last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      contact_phone_number: "",
      city: "",
      state: "",
      link: "",
      description: "",
      selected_file: null,
      //TODO: change photo to be of appropriate type
      photo: "",
      formErrors: { firstName: "", lastName: "", email: "" },
      nameValid: false,
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
    let nameValid = this.state.nameValid
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid
    let passwordMatch = this.state.passwordMatch
    switch (fieldName) {
      case "name":
        nameValid = value.length > 0
        formErrors.firstName = nameValid
          ? ""
          : " is not a valid first name"
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
        nameValid: nameValid,
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
        this.state.nameValid &&
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
    formData.append('organization[email]', this.state.email);
    formData.append('organization[password]', this.state.password);
    formData.append('organization[password_confirmation]', this.state.password_confirmation);
    formData.append('organization[contact_first_name]', this.state.contact_first_name);
    formData.append('organization[contact_last_name]', this.state.contact_last_name);
    formData.append('organization[city]', this.state.city);
    formData.append('organization[state]', this.state.state);
    formData.append('organization[link]', this.state.link);
    formData.append('organization[description]', this.state.description);
    formData.append('organization[name]', this.state.name);
    formData.append('organization[contact_phone_number]', this.state.contact_phone_number);
    formData.append(
      "organization[profile_image]",
      this.state.selected_file
    )
    axios
      .post("/organizations", formData)
      .then(function(response) {
        window.location = "/"
      })
      .catch(function(error) {
        console.log(error)
      })
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
            <label htmlFor="name">
              Organization name (required)
            </label> <br/>
            <input
              type="text"
              placeholder="Organization"
              value={this.state.name}
              id="name"
              onChange={this.handleChange("name")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">
              Email (required)
            </label> <br/>
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
            </label> <br/>
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
            </label> <br/>
            <input
              type="password"
              placeholder="ie. password123"
              value={this.state.password_confirmation}
              id="password_confirmation"
              onChange={this.handleChange("password_confirmation")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="contact_first_name">
              Contact First Name
            </label> <br/>
            <input
              type="text"
              placeholder="ie. John"
              value={this.state.contact_first_name}
              id="contact_first_name"
              onChange={this.handleChange("contact_first_name")}
            /> <br/>
            <label htmlFor="contact_last_name">
              Contact Last Name
            </label> <br/>
            <input
              type="text"
              placeholder="ie. Doe"
              value={this.state.contact_last_name}
              id="contact_last_name"
              onChange={this.handleChange("contact_last_name")}
            /> <br/>
            <label htmlFor="contact_phone_number">
              Contact Phone number
            </label> <br/>
            <input
              type="text"
              placeholder="ie. (123)456-7890"
              value={this.state.contact_phone_number}
              id="contact_phone_number"
              onChange={this.handleChange("contact_phone_number")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="city">
              City
            </label> <br/>
            <input
              type="text"
              placeholder="ie. San Francisco"
              value={this.state.city}
              id="city"
              onChange={this.handleChange("city")}
            /> <br/>
            <label htmlFor="state">
              State (abbreviation)
            </label> <br/>
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
            </label> <br/>
            <input
              type="text"
              placeholder="ie. organization.com"
              value={this.state.link}
              id="link"
              onChange={this.handleChange("link")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="description">
              Bio
            </label> <br/>
            <textarea
              placeholder="Tell us about your organization!"
              value={this.state.description}
              rows="6"
              cols="50"
              onChange={this.handleChange("description")}
              id="description"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="photo">
              Photo
            </label> <br/>
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
            Complete organization registration!
          </button>
        </fieldset>
      </div>
    )
  }
}
export default RegisterForm
