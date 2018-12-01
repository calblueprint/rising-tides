import React from "react";
import axios from 'axios';

class NewProjectForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
      success: null,
      title: null,
      description: null,
      overview: null,
      volunteer_requirements: null,
      deliverable: null,
      question1: null,
      question2: null,
      question3: null
    };
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
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
  }

  _handleSubmit(e) {
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
        question3: this.state.question3
      }
    }

    axios.post('/api/projects', payload)
      .then(res => {
        this.setState({success: 1});
        window.location.href = '/projects';
      })
      .catch(res => {
        this.setState({success: 0});
        console.log(res);
      });

    console.log(this.state);
    return false;
  }

  goBack = (e) => {
    e.preventDefault();
    window.location = "/projects";
  }

  render() {
    return (
      <div>
        <a onClick={this.goBack}>Back</a>
        <h1>New Project</h1>
        <form onSubmit={this._handleSubmit}>
          <label>
            <span class="container-label">Title</span>
            <input type="text"
                   placeholder="i.e. Assessing Adaptation Options"
                   class="input-box"
                   onChange={this._handleChange('title')} />
          </label>
          <br />
          <label>
            <span class="container-label">Brief Description</span>
            <textarea
                  class="input-area"
                  placeholder="i.e. Identify The Best Climate Change Adaptation Approaches For Your Community, Historic Property, or Landscape"
                  onChange={this._handleChange('description')}>
            </textarea>
          </label>
          <br />
          <label>
            <span class="container-label">Project Plan</span>
            <textarea type="text"
                   class="input-area"
                   onChange={this._handleChange('overview')}>
            </textarea>
          </label>
          <br />
          <label>
            <span class="container-label">Professional Skills Needed</span>
            <textarea type="text"
                   class="input-area"
                   onChange={this._handleChange('volunteer_requirements')}>
            </textarea>
          </label>
          <br />
          <label>
            <span class="container-label">Project Outputs</span>
            <textarea type="text"
                   class="input-area"
                   onChange={this._handleChange('deliverable')}>
            </textarea>
          </label>
          <br />
          <label>
            <span class="container-label">Our Community Needs This If:</span>
            <textarea type="text"
                   class="input-area"
                   onChange={this._handleChange('question1')}>
            </textarea>
          </label>
          <br />
          <label>
            <span class="container-label">The Right Volunteer for this Project Is:</span>
            <textarea type="text"
                   class="input-area"
                   onChange={this._handleChange('question2')}>
            </textarea>
          </label>
          <br />
          <label>
            <span class="container-label">What You Give, What You Get:</span>
            <textarea type="text"
                   class="input-area"
                   onChange={this._handleChange('question3')}>
            </textarea>
          </label>
          <br />
          <input class="button" value="Create" type="submit" />
        </form>
      </div>
    );
  }

}

export default NewProjectForm;
