import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: "",
    children: ""
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, children, className, onClick } = this.props;
    switch (type) {
      case "button-primary":
        return (
          <button
            type="button"
            className={`${className} roboto w4 f4 link bdim br3 b--none ph3 pv2 dib white bg-primary pointer`}
            onClick={onClick}
          >
            {children}
          </button>
        );
      case "button-secondary":
        return (
          <button
            type="button"
            className={`${className} roboto w4 f4 link bdim br3 ba bw1 primary-border-color ph3 pv2 dib primary-color bg-white pointer`}
            onClick={onClick}
          >
            {children}
          </button>
        );
      default:
        return <p>default</p>;
    }
  }
}

export default Button;
