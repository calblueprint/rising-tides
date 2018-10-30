/**
 * @prop initData - saved data associated with the basic portion of the pickup form
 * @prop nextStep - function handler to move on to next step of pickup creation
 * @prop close    - callback to close modal
 * @prop isEdit   - callback to close modal
 */

class RegisterModal extends DefaultForm {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      state: "",
      skills: "",
      bio: "",
    };
    this.isEdit = true;
    this._updateState = this._updateState.bind(this);
    this.close = this.close.bind(this);
    this._nextStep = this._nextStep.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = nextProps.initData;
  }

  _updateState(e) {
    let target = $(e.target);
    this.state[target.attr('name')] = target.val();
    this._nextStep(this.state, "basicForm", false);
  }

  open(e) {
    this.setState({ showModal: true });
  }

  close(e) {
    this.setState({ showModal: false });
  }

  _nextStep(data, key, validated, frequency) {
    if (data && key){
      this.setState({ [key]: data });
    }
    if (validated) {
      if (key === "basicForm" && frequency && frequency === "one_time") {
        this.setState({ step: this.state.step + 2 });
      }
      else {
        this.setState({ step: this.state.step + 1 });
      }
    }
  }

  render() {
    pageContent = 
      <div className="">
        <Modal.Body>
          <form className="modal-pickup-form">
            <div className="row marginTop-sm">
              <div className={this.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container">
                  <label htmlFor="name" className="label label--newline">Name (First Last)</label>
                  <br/>
                  <input type="text" placeholder="ie. John Doe" className="input"
                    value={this.state.name} name="name" id="name"
                    onChange={this._updateState} />
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className={this.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container">
                  <label htmlFor="city" className="label label--newline">City</label>
                  <br/>
                  <input type="text" placeholder="ie. San Francisco" className="input"
                    value={this.state.city} name="city" id="city"
                    onChange={this._updateState} />
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className={this.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container">
                  <label htmlFor="state" className="label label--newline">State (abbreviation)</label>
                  <br/>
                  <input type="text" placeholder="ie. CA" className="input"
                    value={this.state.state} name="state" id="state"
                    onChange={this._updateState} />
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className={this.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container name-container">
                  <label htmlFor="skills" className="label label--newline">Skills</label>
                  <br/>
                  <textarea placeholder="ie. Software Development" value={this.state.skills}
                    name="skills" rows="6" cols="50" onChange={this._updateState}
                    id="skills" className="input"></textarea>
                </fieldset>
              </div>
            </div>

            <div className="row marginTop-sm">
              <div className={this.isEdit ? `col-md-12` : `col-md-7`}>
                <fieldset className="input-container name-container">
                  <label htmlFor="bio" className="label label--newline">Bio</label>
                  <br/>
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
            onClick={this.close}>Cancel</button>
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
