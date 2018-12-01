import React from "react";
import axios from 'axios';

class NewApplicationForm extends React.Component {

  constructor(props) {
    super();
    this.state = {
      success: null,
      question1: null,
      question2: null,
      question3: null,
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
      application: {
        question1: this.state.question1,
        question2: this.state.question2,
        question3: this.state.question3,
      },
      project_id: this.props.project_id,
    }

    axios.post('/api/applications', payload)
      .then(res => {
        this.setState({success: 1});
        window.location.href = `/applications/${res.data.application.id}`;
      })
      .catch(res => {
        this.setState({success: 0});
        console.log(res);
      });

    console.log(this.state);
    return false;
  }

  render() {
    return (
      <div>
        <h1>New Application</h1>
        <form onSubmit={this._handleSubmit}>
          <h4>Question 1</h4>
          <textarea onChange={this._handleChange('question1')}>
          </textarea>
          <h4>Question 2</h4>
          <textarea onChange={this._handleChange('question2')}>
          </textarea>
          <h4>Question 3</h4>
          <textarea onChange={this._handleChange('question3')}>
          </textarea>
          <br />
          <input value="Create" type="submit" />
        </form>
      </div>
    );
  }

}

export default NewApplicationForm;
