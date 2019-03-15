import React from "react";
import axios from "axios";

class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null
    };
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlers = [];
  }

  _handleChange = name => {
    if (!this.handlers[name]) {
      this.handlers[name] = event => {
        this.setState({ [name]: event.target.value });
      };
    }
    return this.handlers[name];
  };

  handleFileChange = e => {
    this.setState({ selected_file: e.target.files[0] });
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = `/projects/${this.props.project_id}`;
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.project);
    const formData = new FormData();
    formData.append("photo[project_id]", this.props.project_id);
    formData.append("photo[image]", this.state.selected_file);
    axios
      .post("/api/photos", formData)
      .then(function(response) {
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error);
      });

    console.log(this.state);
    return false;
  }

  render() {
    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <h1>New Photo</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={this.handleFileChange} />
          <br />
          <br />
          <input className="button" value="Create" type="submit" />
        </form>
      </div>
    );
  }
}

export default NewProjectForm;
