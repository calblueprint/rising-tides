import React from "react";
import axios from "axios";

class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      title: null,
      description: null,
      overview: null,
      volunteer_requirements: null,
      deliverable: null,
      question1: null,
      question2: null,
      question3: null,
      project_type_id: 1,
      skills: new Array(this.props.skills.length),
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

  _handleSkillChange = name => {
    if (!this._handlers[name]) {
      this._handlers[name] = event => {
        this.setState({ [name]: event.target.value });
      };
    }
    return this._handlers[name];
  }

  handleSubmit(e) {
    e.preventDefault();
    const payload = {
      project: {
        title: this.state.title,
        description: this.state.description,
        organization_id: this.props.organization.id,
        overview: this.state.overview,
        volunteer_requirements: this.state.volunteer_requirements,
        deliverable: this.state.deliverable,
        question1: this.state.question1,
        question2: this.state.question2,
        question3: this.state.question3,
        project_type_id: this.state.project_type_id
      }
    };

    axios
      .post("/api/projects", payload)
      .then(res => {
        this.setState({ success: 1 });
        window.location.href = "/projects";
      })
      .catch(res => {
        this.setState({ success: 0 });
        console.log(res);
      });

    console.log(this.state);
    return false;
  }

  goBack = (e) => {
    e.preventDefault();
    window.location = "/projects";
  };

  render() {
    const projectTypes = this.props.project_types.map((project, index) => {
      return <option value={project.id}>{project.name}</option>;
    });

    let skills = this.props.skills.map((skill, index) => {
      return <span><input type="checkbox" name={"skills[" + index + "]"} value={skill.id} /> {skill.name} <br /></span>
    });

    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <h1>New Project</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span className="container-label">Title</span>
            <input
              type="text"
              placeholder="i.e. Assessing Adaptation Options"
              className="input-box"
              onChange={this.handleChange("title")}
            />
          </label>
          <br />
          <label>
            <span className="container-label">Project Type</span>
            <select
              className="input-box"
              onChange={this.handleChange("project_type_id")}
            >
              {projectTypes}
            </select>
          </label>
          <br />
          <label>
            <span className="container-label">Brief Description</span>
            <textarea
              className="input-area"
              placeholder="i.e. Identify The Best Climate Change Adaptation Approaches For Your Community, Historic Property, or Landscape"
              onChange={this.handleChange("description")}
            />
          </label>
          <br />
          <label>
            <span className="container-label">Project Plan</span>
            <textarea
              type="text"
              className="input-area"
              onChange={this.handleChange("overview")}
            />
          </label>
          <br />
          <label>
            <span className="container-label">Professional Skills Needed</span>
            <textarea
              type="text"
              className="input-area"
              onChange={this.handleChange("volunteer_requirements")}
            />
          </label>
          <br />
          <label>
            <span className="container-label">Project Outputs</span>
            <textarea
              type="text"
              className="input-area"
              onChange={this.handleChange("deliverable")}
            />
          </label>
          <br />
          <label>
            <span className="container-label">Our Community Needs This If:</span>
            <textarea
              type="text"
              className="input-area"
              onChange={this.handleChange("question1")}
            />
          </label>
          <br />
          <label>
            <span className="container-label">
              The Right Volunteer for this Project Is:
            </span>
            <textarea
              type="text"
              className="input-area"
              onChange={this.handleChange("question2")}
            />
          </label>
          <br />
          <label>
            <span className="container-label">What You Give, What You Get:</span>
            <textarea
              type="text"
              className="input-area"
              onChange={this.handleChange("question3")}
            />
          </label>
          <br />
          <label>
            <span class="container-label">Select skill:</span>
            {skills}
          </label>
          <br />
          <input className="button" value="Create" type="submit" />
        </form>
      </div>
    );
  }
}

export default NewProjectForm;
