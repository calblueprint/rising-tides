import React from "react";

class Form extends React.Component {
  constructor(props) {
    super();
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
}

export default Form;
