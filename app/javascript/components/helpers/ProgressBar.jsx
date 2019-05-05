import React from "react";
import PropTypes from "prop-types";

class ProgressBar extends React.Component {
  static propTypes = {
    percentage: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { percentage, currentStep } = this.props;
    if (currentStep > 4) {
      return null;
    }
    return (
      <div className="progress-bar relative w-100 mt3 br-pill ba b--black">
        <div
          className="filler bg-black h-100"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
}

export default ProgressBar;
