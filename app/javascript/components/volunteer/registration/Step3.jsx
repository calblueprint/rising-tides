import React from "react";
import PropTypes from "prop-types";

class Step3 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    bio: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentStep, handleChange, bio } = this.props;

    if (currentStep !== 3) {
      return null;
    }
    return (
      <div>
        <section className="mb3">
          <label htmlFor="bio">
            <h3>Tell us a little bit about yourself</h3>
            <textarea
              value={bio}
              rows={14}
              onChange={handleChange("bio")}
              id="bio"
              style={{ resize: "none" }}
            />
          </label>
        </section>
      </div>
    );
  }
}

export default Step3;
