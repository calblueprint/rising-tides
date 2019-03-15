import React from "react";
import axios from "axios";

class NewApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      question1: null,
      question2: null,
      question3: null
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

  handleChange = name => {
    if (!this.handlers[name]) {
      this.handlers[name] = event => {
        this.setState({ [name]: event.target.value });
      };
    }
    return this.handlers[name];
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = `/projects/${this.props.project_id}`;
  };

  handleSubmit(e) {
    e.preventDefault();
    const payload = {
      application: {
        question1: this.state.question1,
        question2: this.state.question2,
        question3: this.state.question3,
        project_id: this.props.project_id,
        user_id: this.props.user.id
      }
    };

    axios
      .post("/api/applications", payload)
      .then(res => {
        this.setState({ success: 1 });
        window.location.href = `/applications/${res.data.application.id}`;
      })
      .catch(res => {
        this.setState({ success: 0 });
        console.log(res);
      });

    console.log(this.state);
    return false;
  }

  render() {
    return (
      <div className="form-container">
        <a onClick={this.goBack}>Back</a>
        <h1>New Application</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <label>
              <span className="container-label">
                Why are you interested in working on this project? (2-3
                sentences)
              </span>
              <textarea
                className="input-area"
                onChange={this.handleChange("question1")}
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              <span className="container-label">
                What experience could you contribute to this project? (2-3
                sentences)
              </span>
              <textarea
                className="input-area"
                onChange={this.handleChange("question2")}
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              <span className="container-label">Skills</span>
              <textarea
                className="input-area"
                onChange={this.handleChange("question3")}
              />
            </label>
          </div>
          <br />
          <input className="button" value="Create" type="submit" />
        </form>
      </div>
    );
  }
}

export default NewApplicationForm;
