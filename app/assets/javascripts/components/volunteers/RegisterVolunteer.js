/**
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop nextStep - function handler to move on to next step of pickup creation
 * @prop close    - callback to close modal
 * @prop isEdit   - callback to close modal
 */

class RegisterVolunteer extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = this.props.initData;
    if (!this.state.name) {
      this.state.name = "";
    }
    if (!this.state.city) {
      this.state.city = "";
    }
    if (!this.state.state) {
      this.state.state = "";
    }
    if (!this.state.skills) {
      this.state.skills = [];
    }
    if (!this.state.bio) {
      this.state.skills = "";
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = nextProps.initData;
  }

  _updateState(e) {
    let target = $(e.target);
    this.state[target.attr('name')] = target.val();
    this.props.nextStep(this.state, "basicForm", false);
  }

  render() {
    pageContent = 
      <div className="">
        <Modal.Body>
          <form className="modal-pickup-form">
            <div className="row marginTop-sm">
              <div className={this.props.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container">
                  <label htmlFor="name" className="label label--newline">Name (First Last)</label>
                  <input type="text" placeholder="ie. John Doe" className="input"
                    value={this.state.name} name="name" id="name"
                    onChange={this._updateState} />
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className={this.props.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container">
                  <label htmlFor="city" className="label label--newline">City</label>
                  <input type="text" placeholder="ie. San Francisco" className="input"
                    value={this.state.city} name="city" id="city"
                    onChange={this._updateState} />
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className={this.props.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container">
                  <label htmlFor="state" className="label label--newline">State (abbreviation)</label>
                  <input type="text" placeholder="ie. CA" className="input"
                    value={this.state.state} name="state" id="state"
                    onChange={this._updateState} />
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className={this.props.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container name-container">
                  <label htmlFor="skills" className="label label--newline">Skills</label>
                  <textarea placeholder="ie. Software Development" value={this.state.skills}
                    name="skills" rows="6" cols="50" onChange={this._updateState}
                    id="skills" className="input"></textarea>
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className={this.props.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container name-container">
                  <label htmlFor="bio" className="label label--newline">Bio</label>
                  <textarea placeholder="Tell us about yourself!" value={this.state.bio}
                    name="bio" rows="6" cols="50" onChange={this._updateState}
                    id="bio" className="input"></textarea>
                </fieldset>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="button button--text-alert marginRight-xs pull-left"
            onClick={this.props.close}>Cancel</button>
          <button type="submit" name="submit" value="Next Step"
            className="button submit-button" onClick={this._nextStep}>
              Next
              <span className="fa fa-angle-right marginLeft-xxs"></span>
          </button>
        </Modal.Footer>
      </div>;
    return (
      <div className="">
        <div className="container">
          {pageContent}
        </div>
      </div>
    );
  }
}

RegisterVolunteer.propTypes = {
  initData : React.PropTypes.object.isRequired,
  nextStep : React.PropTypes.func.isRequired,
  close    : React.PropTypes.func.isRequired,
};
