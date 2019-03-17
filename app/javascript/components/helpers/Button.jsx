import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.string
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
    console.log(this.props);
    const { type, children, className } = this.props;
    switch (type) {
      case "button-primary":
        return (
          <button
            type="button"
            className={`${className} roboto f4 link dim br3 ph3 pv2 mb2 dib white bg-primary`}
          >
            {children}
          </button>
        );
      case "button-secondary":
        return (
          <button
            type="button"
            className={`${className} roboto f4 link dim br3 ba bw1 primary-border-color ph3 pv2 mb2 dib primary-color bg-white`}
          >
            {children}
          </button>
        );
      // case "hover-button":
      //   return (
      //     <button
      //       className={`${
      //         this.props.className
      //       }hover-button pa2 white font pointer`}
      //     >
      //       {this.props.children}
      //     </button>
      //   );
      default:
        return <p>default</p>;
    }
  }
}

export default Button;
