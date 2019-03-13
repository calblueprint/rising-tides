import React from "react";
import axios from "axios";

class NewApplicationForm extends React.Component {
  constructor(props) {
    super();
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
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handlers = [];
  }

  _handleChange = name => {
    if (!this._handlers[name]) {
      this._handlers[name] = event => {
        this.setState({ [name]: event.target.value });
      };
    }
    return this._handlers[name];
  };

  _handleSubmit(e) {
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

  goBack = e => {
    e.preventDefault();
    window.location = `/projects/${this.props.project_id}`;
  };

  render() {
    return (
      <div className="form-container">
        <a onClick={this.goBack}>Back</a>
        <h1>New Application</h1>
        <form onSubmit={this._handleSubmit}>
          <div className="input-container">
            <label>
              <span className="container-label">
                Why are you interested in working on this project? (2-3
                sentences)
              </span>
              <textarea
                className="input-area"
                onChange={this._handleChange("question1")}
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
                onChange={this._handleChange("question2")}
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              <span className="container-label">Skills</span>
              <textarea
                className="input-area"
                onChange={this._handleChange("question3")}
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
