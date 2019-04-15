import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    className: "",
    children: "",
    disabled: false
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, children, className, onClick, disabled } = this.props;
    switch (type) {
      case "button-primary":
        return (
          <button
            type="button"
            className={`${className} fw5 f4 ba bw1 primary-border-color ph3 pv2 dib black bg-primary`}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        );
      case "button-secondary":
        return (
          <button
            type="button"
            className={`${className} fw5 f4 ba bw1 primary-border-color ph3 pv2 dib black bg-white`}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        );
      default:
        return (
          <button
            type="button"
            className={className}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        );
    }
  }
}

export default Button;
