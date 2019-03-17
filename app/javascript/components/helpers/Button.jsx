import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ""
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    const { type } = this.props;
    switch (type) {
      case "button-primary":
        return (
          <button
            className={`${
              this.props.className
            } roboto f3 link dim br2 ph3 pv2 mb2 dib white bg-primary-button`}
          >
            {this.props.children}
          </button>
        );
      case "button-secondary":
        return (
          <button
            className={`${
              this.props.className
            } f3 link dim br2 ba bw1 ph3 pv2 mb2 dib black bg-white`}
          >
            {this.props.children}
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
