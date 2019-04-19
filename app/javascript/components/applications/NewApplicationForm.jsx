import React from "react";
import axios from "axios";
import FlashMessage from '../utils/FlashMessage'

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
    window.location.href = `/projects/${this.props.project.id}`;
  };

  handleSubmit() {
    const payload = {
      application: {
        question1: this.state.question1,
        question2d: this.state.question2,
        question3: "",
        project_id: this.props.project.id,
        user_id: this.props.user.id
      }
    };

    axios
      .post("/api/applications", payload)
      .then(res => {
        const { application, message } = res.data;
        if (message) {
          this.flash_message.flashMessage(
            message
          );
        }
        window.location.href = `/applications/${application.id}`;
      }).catch(res => {
        this.flash_message.flashError(
            res.response.data.message
        );
      });

    console.log(this.state);
    return false;
  }

  render() {
    const { project } = this.props;
    return (
        <div className="w-100 h-100 tc bg-white">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            <div
                className="h5 absolute w-100 bg-moon-gray"
                style={{zIndex: -1}}></div>
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
                <h1 className="f1 ma0">Application - {project.title}</h1>
                <h3 className="mt3">What we are looking for</h3>
                <p>{project.description}</p>
                <h3 className="mt5">Why are you interested?</h3>
                <textarea
                    rows="6"
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    onChange={this.handleChange("question1")}></textarea>
                <h3 className="mt3">Describe your relevant experience.</h3>
                <textarea
                    rows="6"
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    onChange={this.handleChange("question2")}></textarea>
                <div className="mt5">
                    <a className="fl std-button-black ph3 pv1 fw4 f5" onClick={this.goBack}>
                        Cancel
                    </a>
                    <a className="fr std-button ph3 pv1 fw4 f5 ml3" onClick={() => this.handleSubmit()}>
                        Submit
                    </a>
                    <a className="fr std-button-white ph3 pv1 fw4 f5">
                        Save for later
                    </a>
                </div>
            </div>
        </div>
    );
  }
}

export default NewApplicationForm;
