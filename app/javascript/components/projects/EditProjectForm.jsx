import React from "react";
import axios from 'axios';

class EditProjectForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
      project: {},
      message: '',
      error: ''
    };
    axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handlers = [];
  }

  componentDidMount() {
    console.log("Fetching from: " + '/api/projects/' + this.props.project.id);
    axios.get('/api/projects/' + this.props.project.id)
      .then(res => {
        this.setState({ project: res.data });
        console.log(this.state);
      })
      .catch(res => {
        console.log("ERROR" + res.data);
      });
  }

  _handleChange = name => {
    if (!this._handlers[name]) {
      this._handlers[name] = event => {
        var { project } = this.state;
        project[name] = event.target.value;
        this.setState({project});
      };
    }
    return this._handlers[name];
  }

  _handleSubmit(e) {
    e.preventDefault();
    const payload = {
      project: this.state.project
    }

    axios.put('/api/projects/' + this.state.project.id, payload)
      .then(res => {
        this.setState({
          "message": res.data.message,
          "error": res.data.error
        });
        window.location.href = '/projects/' + this.state.project.id;
      })
      .catch(res => {
        this.setState({
          "message": res.data.message,
          "error": res.data.error
        });
        console.log("ERROR" + res.data);
      });

    return false;
  }

  render() {
    return (
      <div>
        <h1>Edit Project</h1>
        <form onSubmit={this._handleSubmit}>
          <h4>Title</h4>
          <input type="text"
                 onChange={this._handleChange('title')}
                 value={this.state.project.title} />
          <h4>Description</h4>
          <textarea onChange={this._handleChange('description')}
                    value={this.state.project.description}>
          </textarea>
          <br />
          <input value="Edit" type="submit" />
        </form>
      </div>
    );
  }

}

export default EditProjectForm;