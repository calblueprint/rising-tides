import React from "react";

class Form extends React.Component {

  constructor(props) {
    super();
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

}

export default Form;