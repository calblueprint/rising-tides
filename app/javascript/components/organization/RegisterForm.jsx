/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
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
      // TODO: change photo to be of appropriate type
      photo: "",
      formErrors: { firstName: "", lastName: "", email: "" },
      nameValid: false,
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
        nameValid,
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
        this.state.nameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordMatch
    });
  };

  handleFileChange = e => {
    this.setState({ selected_file: e.target.files[0] });
  };

  handleUpload = () => {};

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleRegistration = e => {
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
    axios
      .post("/organizations", formData)
      .then(function(response) {
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onSubmit = (values, actions) => {
    const formData = new FormData();
    formData.append("organization[email]", values.email);
    formData.append("organization[password]", values.password);
    formData.append(
      "organization[password_confirmation]",
      values.password_confirmation
    );
    formData.append(
      "organization[contact_first_name]",
      values.contact_first_name
    );
    formData.append(
      "organization[contact_last_name]",
      values.contact_last_name
    );
    formData.append("organization[city]", values.city);
    formData.append("organization[state]", values.state);
    // formData.append("organization[link]", values.link);
    // formData.append("organization[description]", values.description);
    formData.append("organization[name]", values.name);
    formData.append(
      "organization[contact_phone_number]",
      values.contact_phone_number
    );
    formData.append("organization[profile_image]", values.photo);
    for (const val of formData.values()) {
      console.log(val);
    }
    // axios
    //   .post("/organizations", formData)
    //   .then(function(response) {
    //     window.location.href = "/";
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  };

  validate = type => value => {
    let error;
    if (!value) {
      error = "Required";
    } else {
      switch (type) {
        case "name":
          error = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/.test(
            value
          )
            ? ""
            : "Invalid organization name";
          break;
        case "email":
          error = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? ""
            : "Invalid email address";
          break;
        case "password":
          error = value.length >= 6 ? "" : "Too short!";
          break;
        case "password_confirmation":
          error =
            value.password_confirmation === value.password
              ? ""
              : "Passwords do not match";
          break;
        default:
          break;
      }
    }
    return error;
  };

  render() {
    const {
      name,
      email,
      password,
      password_confirmation,
      contact_first_name,
      contact_last_name,
      contact_phone_number,
      city,
      state,
      link,
      description,
      formValid,
      formErrors
    } = this.state;

    return (
      <div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            contact_first_name: "",
            contact_last_name: "",
            contact_phone_number: "",
            photo: ""
          }}
          onSubmit={this.onSubmit}
          render={({ errors, touched }) => (
            <Form>
              <section className="flex flex-column mb3">
                <label htmlFor="name">
                  <h3>Organization Name</h3>
                  <Field
                    type="text"
                    name="name"
                    validate={this.validate("name")}
                    className="w-100"
                  />
                  <ErrorMessage name="name" className="error" component="div" />
                </label>
              </section>
              <section className="flex flex-column mb3">
                <label htmlFor="email">
                  <h3>Login Email</h3>
                  <Field
                    type="text"
                    name="email"
                    validate={this.validate("email")}
                    className="w-100"
                  />
                  <ErrorMessage
                    name="email"
                    className="error"
                    component="div"
                  />
                </label>
              </section>
              <section className="flex mb3">
                <label htmlFor="password" className="mr3 w-50">
                  <h3>Password</h3>
                  <Field
                    type="password"
                    name="password"
                    validate={this.validate("password")}
                  />
                  <ErrorMessage
                    name="password"
                    className="error"
                    component="div"
                  />
                </label>
                <label htmlFor="password_confirmation" className="ml3 w-50">
                  <h3>Verify Password</h3>
                  <Field
                    type="password"
                    name="password_confirmation"
                    validate={this.validate("password_confirmation")}
                  />
                  <ErrorMessage
                    name="password_confirmation"
                    className="error"
                    component="div"
                  />
                </label>
              </section>
              <section className="flex mb3">
                <label htmlFor="contact_first_name" className="mr3 w-50">
                  <h3>First Name</h3>
                  <Field
                    type="text"
                    name="contact_first_name"
                    validate={this.validate("contact_first_name")}
                  />
                  <ErrorMessage
                    name="contact_first_name"
                    className="error"
                    component="div"
                  />
                </label>
                <label htmlFor="contact_last_name" className="ml3 w-50">
                  <h3>Last Name</h3>
                  <Field
                    type="text"
                    name="contact_last_name"
                    validate={this.validate("contact_last_name")}
                  />
                  <ErrorMessage
                    name="contact_last_name"
                    className="error"
                    component="div"
                  />
                </label>
              </section>
              <section className="flex flex-column mb3">
                <label htmlFor="contact_phone_number">
                  <h3>Phone Number</h3>
                  <Field
                    type="text"
                    name="contact_phone_number"
                    validate={this.validate("contact_phone_number")}
                    className="w-100"
                  />
                  <ErrorMessage
                    name="contact_phone_number"
                    className="error"
                    component="div"
                  />
                </label>
              </section>
              <section className="flex flex-column mb3">
                <label htmlFor="photo">
                  <h3>Add a Photo</h3>
                  <Field type="file" name="photo" />
                </label>
              </section>
              <button
                type="submit"
                value="Next Step"
                // disabled={!formValid}
              >
                Complete organization registration!
              </button>
            </Form>
          )}
        />

        <a onClick={this.goBack}>Back</a>
        <div>
          <div>
            {Object.keys(formErrors).map((fieldName, i) => {
              if (formErrors[fieldName].length > 0) {
                return (
                  <p key={i}>
                    {fieldName} {formErrors[fieldName]}
                  </p>
                );
              }
              return "";
            })}
          </div>
        </div>
        <form>
          <fieldset>
            <label htmlFor="name">Organization name (required)</label>
            <br />
            <input
              type="text"
              placeholder="Organization"
              value={name}
              id="name"
              onChange={this.handleChange("name")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email (required)</label>
            <br />
            <input
              type="text"
              placeholder="ie. johndoe@email.com"
              value={email}
              id="email"
              onChange={this.handleChange("email")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">
              Password (required, 6 characters minimum)
            </label>
            <br />
            <input
              type="password"
              placeholder="ie. password123"
              value={password}
              id="password"
              onChange={this.handleChange("password")}
            />
            <br />
            <label htmlFor="password_confirmation">Confirm password</label>
            <br />
            <input
              type="password"
              placeholder="ie. password123"
              value={password_confirmation}
              id="password_confirmation"
              onChange={this.handleChange("password_confirmation")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="contact_first_name">Contact First Name</label>
            <br />
            <input
              type="text"
              placeholder="ie. John"
              value={contact_first_name}
              id="contact_first_name"
              onChange={this.handleChange("contact_first_name")}
            />
            <br />
            <label htmlFor="contact_last_name">Contact Last Name</label> <br />
            <input
              type="text"
              placeholder="ie. Doe"
              value={contact_last_name}
              id="contact_last_name"
              onChange={this.handleChange("contact_last_name")}
            />
            <br />
            <label htmlFor="contact_phone_number">Contact Phone number</label>
            <br />
            <input
              type="text"
              placeholder="ie. (123)456-7890"
              value={contact_phone_number}
              id="contact_phone_number"
              onChange={this.handleChange("contact_phone_number")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="city">City</label>
            <br />
            <input
              type="text"
              placeholder="ie. San Francisco"
              value={city}
              id="city"
              onChange={this.handleChange("city")}
            />
            <br />
            <label htmlFor="state">State (abbreviation)</label> <br />
            <input
              type="text"
              placeholder="ie. CA"
              value={state}
              id="state"
              onChange={this.handleChange("state")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Link</label> <br />
            <input
              type="text"
              placeholder="ie. organization.com"
              value={link}
              id="link"
              onChange={this.handleChange("link")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="description">Bio</label>
            <br />
            <textarea
              placeholder="Tell us about your organization!"
              value={description}
              rows="6"
              cols="50"
              onChange={this.handleChange("description")}
              id="description"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="photo">Photo</label>
            <br />
            <input type="file" onChange={this.handleFileChange} />
          </fieldset>
        </form>
        <fieldset>
          <button
            type="submit"
            value="Next Step"
            disabled={!formValid}
            onClick={this.handleRegistration}
          >
            Complete organization registration!
          </button>
        </fieldset>
      </div>
    );
  }
}
export default RegisterForm;
