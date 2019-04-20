import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

class Step2 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    contactFirstName: PropTypes.string.isRequired,
    contactLastName: PropTypes.string.isRequired,
    contactPhoneNumber: PropTypes.string.isRequired,
    handleProfileFileChange: PropTypes.func.isRequired,
    selectedProfileFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }).isRequired,
    deleteProfileFile: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  profile = () => {
    const {
      selectedProfileFile,
      handleProfileFileChange,
      deleteProfileFile
    } = this.props;
    if (
      Object.keys(selectedProfileFile).length === 0 &&
      selectedProfileFile.constructor === Object
    ) {
      return (
        <Dropzone
          onDrop={handleProfileFileChange}
          multiple={false}
          accept="image/jpeg, image/png"
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps({
                className:
                  "dropzone flex flex-column justify-center items-center pv3 pointer white"
              })}
            >
              <input {...getInputProps()} />
              <i className="fas fa-cloud-upload-alt" />
              <h3>Choose a photo or drag it here</h3>
              <i className="f5 silver">File must be a .png or .jpg file</i>
            </div>
          )}
        </Dropzone>
      );
    }
    return (
      <div className="flex items-center">
        {this.file()}
        <h4 className="ma0 ml3 mr2">{selectedProfileFile.name}</h4>
        <i
          className="fas fa-trash pointer"
          onClick={deleteProfileFile(true)}
          onKeyPress={deleteProfileFile(false)}
          role="button"
          tabIndex={0}
        />
      </div>
    );
  };

  file = () => {
    const { selectedProfileFile } = this.props;
    if (
      Object.keys(selectedProfileFile).length === 0 &&
      selectedProfileFile.constructor === Object
    ) {
      return null;
    }
    return (
      <img src={selectedProfileFile.preview} alt="hi" className="h3 mw5" />
    );
  };

  render() {
    const {
      currentStep,
      handleChange,
      contactFirstName,
      contactLastName,
      contactPhoneNumber
    } = this.props;

    if (currentStep !== 2) {
      return null;
    }
    return (
      <div>
        <h2 className="underline mb3">Lead Contact Information</h2>
        <section className="flex mb3">
          <label htmlFor="firstName" className="mr3 w-50">
            <h3>First Name</h3>
            <input
              type="text"
              value={contactFirstName}
              id="firstName"
              onChange={handleChange("contactFirstName")}
              className="w-100"
            />
          </label>
          <label htmlFor="lastName" className="ml3 w-50">
            <h3>Last Name</h3>
            <input
              type="text"
              value={contactLastName}
              id="contactLastName"
              onChange={handleChange("contactLastName")}
              className="w-100"
            />
          </label>
        </section>
        <div className="flex flex-column mb3">
          <label htmlFor="phoneNumber">
            <h3>Phone Number</h3>
            <input
              type="text"
              value={contactPhoneNumber}
              id="phoneNumber"
              onChange={handleChange("contactPhoneNumber")}
            />
          </label>
        </div>
        <section className="mb3">
          <h3>Add a photo</h3>
          {this.profile()}
        </section>
      </div>
    );
  }
}

export default Step2;
