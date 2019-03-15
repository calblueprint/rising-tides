import React from "react";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSignup = e => {
    e.preventDefault();

    if (this.state.selectedType === "volunteer") {
      window.location.href = "/users/sign_up";
    } else if (this.state.selectedType === "organization") {
      window.location.href = "/organizations/sign_up";
    }
  };

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
          <br />
          <div>
            <button onClick={this.handleSignup}>Registration</button>
          </div>
        </form>
      </div>
    );
  }
}
export default Registration;
