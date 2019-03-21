import React from "react";
import logo from "images/arctic-institute-logo.png";
import axios from "axios";
// import Registration from "./Registration";
// import Login from "./Login";
import Button from "../helpers/Button";

class Home extends React.Component {
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
        .catch(function(error) {
          console.error(error);
        });
    } else if (selectedType === "organization") {
      axios
        .post("/organizations/sign_in", {
          organization: data
        })
        .then(function(response) {
          window.location.href = "/";
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  render() {
    const { selectedType } = this.state;

    return (
      <div className="vh-100 flex flex-column items-center justify-center">
        <img className="w4 h4" alt="The Arctic Institute Logo" src={logo} />
        <h1 className="f2">WELCOME TO RISING TIDES</h1>
        {/* <Login /> 
        <Registration /> */}
        <form className="mt4">
          <div className="flex flex-row justify-center mb3">
            <label className="flex flex-row justify-center mh2" htmlFor="login-volunteer-selection">
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

            <label className="flex flex-row justify-center mh2" htmlFor="login-organization-selection">
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
            <label className="flex flex-column" htmlFor="login-email">
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
            <label className="flex flex-column" htmlFor="login-password">
              Password
              <input
                className="input-box"
                type="password"
                id="login-password"
                onChange={this.handleChange("password")}
              />
            </label>
            <a href="/" className="f6 no-underline">Forgot your password?</a>
          </div>
          <div className="login-buttons">
            <Button type="button-secondary" onClick={() => {}} className="mr3">
              Sign up
            </Button>
            <Button type="button-primary" onClick={this.handleSignin} className="ml3">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
