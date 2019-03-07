import React from "react"
import axios from "axios"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  };

  handleSignup = (e) => {
    e.preventDefault();

    const data = {
          email: this.state.email,
          password: this.state.password
    };

    if (this.state.selectedType === "volunteer") {
      axios
        .post("/users/sign_in", {
          user: data
        })
        .then(function(response) {
          window.location = "/"
        })
        .catch(function(error) {
          console.log(error)
        })
    }

    else if (this.state.selectedType === "organization") {
      axios
        .post("/organizations/sign_in", {
          organization: data
          }
        )
        .then(function(response) {
          window.location = "/"
        })
        .catch(function(error) {
          console.log(error)
        })
      }
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form>
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
              class="input-box"
              type="text"
              id="email"
              placeholder="email"
              onChange={this.handleChange("email")}
            />
            <br />
            <input
              class="input-box"
              type="password"
              id="password"
              placeholder="password"
              onChange={this.handleChange("password")}
            />
          </div>
          <br />
          <div class="input-contianer">
            <button onClick={this.handleSignup}>Login</button>
          </div>
        </form>

      </div>
    )
  }
}
export default Login
