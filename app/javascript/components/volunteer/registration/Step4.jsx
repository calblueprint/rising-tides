import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

class Step4 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleProfileFileChange: PropTypes.func.isRequired,
    handleResumeFileChange: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
    formValid: PropTypes.bool.isRequired,
    selectedProfileFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }).isRequired,
    selectedResumeFile: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
      preview: PropTypes.string
    }).isRequired,
    deleteProfileFile: PropTypes.func.isRequired,
    deleteResumeFile: PropTypes.func.isRequired
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

  resume = () => {
    const {
      selectedResumeFile,
      handleResumeFileChange,
      deleteResumeFile
    } = this.props;
    if (
      Object.keys(selectedResumeFile).length === 0 &&
      selectedResumeFile.constructor === Object
    ) {
      return (
        <Dropzone
          onDrop={handleResumeFileChange}
          multiple={false}
          accept="application/pdf, application/msword, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document, images/png, images/jpeg"
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
              <h3>Choose a file or drag it here</h3>
              <i className="f5 silver">
                File must be a .pdf, .docx, .png, or .jpg file
              </i>
            </div>
          )}
        </Dropzone>
      );
    }
    return (
      <div className="flex items-center">
        <h4 className="ma0 mr2">{selectedResumeFile.name}</h4>
        <i
          className="fas fa-trash pointer"
          onClick={deleteResumeFile(true)}
          onKeyPress={deleteResumeFile(false)}
          role="button"
          tabIndex={0}
        />
      </div>
    );
  };

  render() {
    const { currentStep, handleChange, link } = this.props;

    if (currentStep !== 4) {
      return null;
    }
    return (
      <div>
        <section className="mb3">
          <h3>Add a photo of yourself</h3>
          {this.profile()}
        </section>
        <section className="mb3">
          <h3>
            Upload a resume <i className="f5">(optional)</i>
          </h3>
          {this.resume()}
        </section>
        <section className="mb3">
          <label htmlFor="link">
            <h3>
              Link to Linkedin Profile <i className="f5">(optional)</i>
            </h3>
            <input
              type="text"
              placeholder="ie. linkedin.com/in/john-doe/"
              value={link}
              id="link"
              onChange={handleChange("link")}
            />
          </label>
        </section>
      </div>
    );
  }
}

export default Step4;
