import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    className: "",
    children: "",
    onClick: ()=>{},
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
            className={`${className} fw5 f4 ba bw1 primary-border-color ph3 pv2 dib black bg-primary flex justify-center`}
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
            className={`${className} fw5 f4 ba bw1 primary-border-color ph3 pv2 dib black bg-white flex justify-center`}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
        );
      case "button-primary-submit":
        return (
          <button
            type="submit"
            className={`${className} fw5 f4 ba bw1 primary-border-color ph3 pv2 dib black bg-primary flex justify-center`}
            disabled={disabled}
          >
            {children}
          </button>
        );
      case "button-secondary-submit":
        return (
          <button
            type="submit"
            className={`${className} fw5 f4 ba bw1 primary-border-color ph3 pv2 dib black bg-white flex justify-center`}
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
