import React from "react";
import axios from "axios";

class EditProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      message: "",
      error: ""
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

  componentDidMount() {
    console.log(
      `${"Fetching from: " + "/api/projects/"}${this.props.project.id}`
    );
    axios
      .get(`/api/projects/${this.props.project.id}`)
      .then(res => {
        this.setState({ project: res.data });
        console.log(this.state);
      })
      .catch(res => {
        console.log(`ERROR${res.data}`);
      });
  }

  handleChange = name => {
    if (!this.handlers[name]) {
      this.handlers[name] = event => {
        const { project } = this.state;
        project[name] = event.target.value;
        this.setState({ project });
      };
    }
    return this.handlers[name];
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  handleSubmit(e) {
    e.preventDefault();
    const payload = {
      project: this.state.project
    };

    axios
      .put(`/api/projects/${this.state.project.id}`, payload)
      .then(res => {
        this.setState({
          message: res.data.message,
          error: res.data.error
        });
        window.location.href = `/projects/${this.state.project.id}`;
      })
      .catch(res => {
        this.setState({
          message: res.data.message,
          error: res.data.error
        });
        console.log(`ERROR${res.data}`);
      });

    return false;
  }

  render() {
    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <h1>Edit Project</h1>
        <form onSubmit={this.handleSubmit}>
          <h4>Title</h4>
          <input
            type="text"
            onChange={this.handleChange("title")}
            value={this.state.project.title}
          />
          <h4>Brief Description</h4>
          <textarea
            onChange={this.handleChange("description")}
            value={this.state.project.description}
          />
          <br />
          <h4>Project Plan</h4>
          <textarea
            onChange={this.handleChange("overview")}
            value={this.state.project.overview}
          />
          <br />
          <h4>Professional Skills Needed</h4>
          <textarea
            onChange={this.handleChange("volunteer_requirements")}
            value={this.state.project.volunteer_requirements}
          />
          <br />
          <h4>Project Outputs</h4>
          <textarea
            onChange={this.handleChange("deliverable")}
            value={this.state.project.deliverable}
          />
          <br />
          <h4>Our Community Needs This If:</h4>
          <textarea
            onChange={this.handleChange("question1")}
            value={this.state.project.question1}
          />
          <br />
          <h4>The Right Volunteer for this Project Is:</h4>
          <textarea
            onChange={this.handleChange("question2")}
            value={this.state.project.question2}
          />
          <br />
          <h4>What You Give, What You Get:</h4>
          <textarea
            onChange={this.handleChange("question3")}
            value={this.state.project.question3}
          />
          <br />
          <input value="Edit" type="submit" />
        </form>
      </div>
    );
  }
}

export default EditProjectForm;
