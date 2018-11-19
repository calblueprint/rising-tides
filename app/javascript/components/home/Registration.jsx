import React from "react"
import axios from "axios"

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  handleSignup(e) {
    e.preventDefault()

    const data = {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation
    }

    if (this.state.selectedType === "volunteer") {
      window.location = "/users/new"
    } 

    else if (this.state.selectedType === "organization") {
      axios
        .post("/organizations", {
          organization: data
          }
        )
        .then(function(response) {
          window.location = "/organizations/new"
        })
        .catch(function(error) {
          console.log(error)
        })
      }
    }

  render() {
    return (
      <div>
        <h2>Register</h2>
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

          <div>
            <button onClick={this.handleSignup}>Registration</button>
          </div>
        </form>

        <button>
          Back
        </button>

      </div>
    )
  }
}
export default Registration
