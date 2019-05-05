import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import Button from "../helpers/Button";

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    buttonType: PropTypes.string.isRequired
  };

  static defaultProps = {
    className: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleOrgRegistration = event => {
    event.preventDefault();
    window.location.href = "/organizations/sign_up";
  };

  handleVolunteerRegistration = event => {
    event.preventDefault();
    window.location.href = "/users/sign_up";
  };

  render() {
    const { title, className, buttonType } = this.props;
    const { show } = this.state;
    return (
      <div>
        <ReactModal
          overlayClassName="fixed absolute--fill bg-dim flex justify-center items-center"
          className="modal absolute flex flex-column justify-center items-center bg-white br3"
          isOpen={show}
          onRequestClose={this.hideModal}
          ariaHideApp={false}
        >
          {/* <button type="button" onClick={this.hideModal}>
            Close
          </button> */}
          <div>
            <h2 className="mt0 mb4">Sign up as...</h2>
            <div className="flex">
              <Button
                className="mr3"
                type="button-secondary"
                onClick={this.handleOrgRegistration}
              >
                Organization
              </Button>
              <Button
                className="ml3"
                type="button-primary"
                onClick={this.handleVolunteerRegistration}
              >
                Volunteer
              </Button>
            </div>
          </div>
        </ReactModal>
        <Button
          className={className}
          type={buttonType}
          onClick={this.showModal}
        >
          {title}
        </Button>
      </div>
    );
  }
}

export default Modal;
