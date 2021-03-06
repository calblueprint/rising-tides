/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-number-input";

class Step2 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    contactPhoneNumber: PropTypes.string.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleProfileFileChange: PropTypes.func.isRequired,
    selectedProfileFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }),
    deleteProfileFile: PropTypes.func.isRequired,
    formErrors: PropTypes.shape({
      contactPhoneNumber: PropTypes.string
    }).isRequired,
    touched: PropTypes.shape({
      contactPhoneNumber: PropTypes.bool
    }).isRequired
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
    if (!selectedProfileFile) {
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
          onClick={deleteProfileFile}
          onKeyPress={({ key }) => key === " " && deleteProfileFile()}
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
      contactPhoneNumber,
      handleBlur,
      handleChange,
      formErrors,
      touched
    } = this.props;

    if (currentStep !== 2) {
      return null;
    }
    return (
      <>
        <h2 className="underline mt0 mb3">Lead Contact Information</h2>
        <section className="flex">
          <label htmlFor="firstName" className="mr3 w-50">
            <h3>First Name</h3>
            <Field type="text" name="contactFirstName" className="w-100" />
            <ErrorMessage
              name="contactFirstName"
              className="error"
              component="div"
            />
          </label>
          <label htmlFor="lastName" className="ml3 w-50">
            <h3>Last Name</h3>
            <Field type="text" name="contactLastName" className="w-100" />
            <ErrorMessage
              name="contactLastName"
              className="error"
              component="div"
            />
          </label>
        </section>
        <section className="flex flex-column">
          <label htmlFor="contactPhoneNumber">
            <h3>Phone Number</h3>
            <PhoneInput
              name="contactPhoneNumber"
              country="US"
              showCountrySelect={false}
              value={contactPhoneNumber}
              onChange={handleChange("contactPhoneNumber")}
              onBlur={handleBlur("contactPhoneNumber")}
            />
            {formErrors.contactPhoneNumber && touched.contactPhoneNumber && (
              <div className="error">{formErrors.contactPhoneNumber}</div>
            )}
          </label>
        </section>
        <section>
          <h3>Add a photo</h3>
          {this.profile()}
          <ErrorMessage name="profileFile" className="error" component="div" />
        </section>
      </>
    );
  }
}

export default Step2;
