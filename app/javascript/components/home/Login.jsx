import React from "react";
import axios from "axios";
import FlashMessage from '../utils/FlashMessage'

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
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSignup() {
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    if (this.state.selectedType === "volunteer") {
      axios
        .post("/users/sign_in", {
          user: data
        }).then(function(response) {
          window.location.href = "/";
        }).catch(res => {
          this.flash_message.flashError(
            res.response.data
          );
        });
    } else if (this.state.selectedType === "organization") {
      axios
        .post("/organizations/sign_in", {
          organization: data
        }).then(function(response) {
          window.location.href = "/";
        }).catch(res => {
          this.flash_message.flashError(
            res.response.data
          );
        });
    } else {
        this.flash_message.flashMessage(
            "You must select either \"Volunteer\" or \"Organization\""
        );
    }
  };

  render() {
    return (
      <div>
        <FlashMessage onRef={ref => (this.flash_message = ref)} />
        <h2>Login</h2>
          <div>
            <label>
              <input
                type="radio"
                value="volunteer"
                onChange={this.handleChange("selectedType")}
                checked={this.state.selectedType === "volunteer"}
              />
              Volunteer
            </label>

            <label>
              <input
                type="radio"
                value="organization"
                onChange={this.handleChange("selectedType")}
                checked={this.state.selectedType === "organization"}
              />
              Organization
            </label>
          </div>
          <br />
          <div>
            <input
              className="input-box"
              type="text"
              id="email"
              placeholder="email"
              onChange={this.handleChange("email")}
            />
            <br />
            <input
              className="input-box"
              type="password"
              id="password"
              placeholder="password"
              onChange={this.handleChange("password")}
            />
          </div>
          <br />
          <div className="input-contianer">
            <button onClick={() => this.handleSignup()}>Login</button>
          </div>
      </div>
    );
  }
}
export default Login;
