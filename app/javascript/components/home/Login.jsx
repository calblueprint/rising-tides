import React from "react";
import axios from "axios";
import FlashMessage from "../utils/FlashMessage";
import Button from "../helpers/Button";
import Modal from "./RegistrationOption";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSignin = event => {
    event.preventDefault();

    const { email, password, selectedType } = this.state;
    const data = {
      email,
      password
    };

    if (selectedType === "volunteer") {
      axios
        .post("/users/sign_in", {
          user: data
        })
        .then(function(response) {
          window.location.href = "/";
        })
        .catch(res => {
          this.flash_message.flashError(res.response.data);
        });
    } else if (selectedType === "organization") {
      axios
        .post("/organizations/sign_in", {
          organization: data
        })
        .then(function(response) {
          window.location.href = "/";
        })
        .catch(res => {
          this.flash_message.flashError(res.response.data);
        });
    } else {
      this.flash_message.flashMessage(
        'You must select either "Volunteer" or "Organization"'
      );
    }
  };

  render() {
    const { selectedType } = this.state;

    return (
      <form className="mt4">
        <FlashMessage onRef={ref => (this.flash_message = ref)} />
        <div className="flex flex-row justify-center mb3">
          <label
            className="flex flex-row justify-center mh2"
            htmlFor="login-volunteer-selection"
          >
            <input
              className="mh1"
              id="login-volunteer-selection"
              type="radio"
              value="volunteer"
              onChange={this.handleChange("selectedType")}
              checked={selectedType === "volunteer"}
            />
            Volunteer
          </label>

          <label
            className="flex flex-row justify-center mh2"
            htmlFor="login-organization-selection"
          >
            <input
              className="mh1"
              id="organization"
              type="radio"
              value="organization"
              onChange={this.handleChange("selectedType")}
              checked={selectedType === "organization"}
            />
            Organization
          </label>
        </div>
        <div className="flex flex-column mb3">
          <label htmlFor="login-email">
            Email
            <input
              className="input-box"
              type="text"
              id="login-email"
              onChange={this.handleChange("email")}
            />
          </label>
        </div>
        <div className="flex flex-column mb4">
          <label htmlFor="login-password">
            Password
            <input
              className="input-box"
              type="password"
              id="login-password"
              onChange={this.handleChange("password")}
            />
          </label>
          <a href="/" className="f6 no-underline">
            Forgot your password?
          </a>
        </div>
        <div className="flex login-buttons">
          <Modal
            className="mr3"
            title="Sign up"
            buttonType="button-secondary"
          />
          <div>
            <Button
              type="button-primary"
              onClick={this.handleSignin}
              className="ml3"
            >
              Sign In
            </Button>
          </div>
        </div>
      </form>
    );
  }
}
export default Login;
