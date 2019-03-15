import React from "react";
import axios from "axios";

class Logout extends React.Component {
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

  handleLogout = e => {
    e.preventDefault();
    axios
      .delete("/users/sign_out", {})
      .then(function(response) {
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="input-contianer">
        <button onClick={this.handleLogout}>Sign Out</button>
      </div>
    );
  }
}
export default Logout;
