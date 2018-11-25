import React from "react";
import $ from 'jquery';
import axios from 'axios';
 class RegisterForm extends React.Component {
   constructor() {
    super();
    this.state = {
      org_name: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      city: "",
      state_abbrev: "",
      link: "",
      description: "",
      selectedFile: null,
       //TODO: change photo to be of appropriate type
      photo: "",
      form_errors: {org_name: '', first_name: '', last_name: '', email: ''},
      org_name_valid: false,
      first_name_valid: false,
      last_name_valid: false,
      email_valid: false,
      password_valid: false,
      password_match: false,
      form_valid: false,
    };
    this.isEdit = true;
    this.handleChange = this.handleChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
   validateField(fieldName, value) {
    let form_errors = this.state.form_errors;
    let org_name_valid = this.state.org_name_valid;
    let first_name_valid = this.state.first_name_valid;
    let last_name_valid = this.state.last_name_valid;
    let email_valid = this.state.email_valid;
    let password_valid = this.state.password_valid;
    let password_match = this.state.password_match;
     switch(fieldName) {
      case 'org_name':
        org_name_valid = value.length > 0;
        form_errors.org_name = org_name_valid ? '': ' is not a valid organization name';
        break;
      case 'first_name':
        first_name_valid = value.length > 0;
        form_errors.first_name = first_name_valid ? '': ' is not a valid first name';
        break;
      case 'last_name':
        last_name_valid = value.length > 0;
        form_errors.last_name = last_name_valid ? '': ' is not a valid last name';
        break;
      case 'email':
        email_valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        form_errors.email = email_valid ? '' : ' is an invalid email';
        break;
      case 'password':
        password_valid = value.length >= 6;
        form_errors.password = password_valid ? '': ' is too short';
        break;
      case 'password_confirmation':
        password_match = value.match(this.state.password);
        form_errors.password = password_match ? '': ' does not match';
        break;
      default:
        break;
    }
    this.setState({form_errors: form_errors,
                    org_name_valid: org_name_valid,
                    first_name_valid: first_name_valid,
                    last_name_valid: last_name_valid,
                    email_valid: email_valid,
                    password_valid: password_valid,
                    password_match: password_match
                  }, this.validateForm);
  }
   validateForm() {
    this.setState({form_valid: this.state.org_name_valid
                            && this.state.first_name_valid
                            && this.state.last_name_valid
                            && this.state.email_valid
                            && this.state.password_valid
                            && this.state.password_match});
  }
   handleFileChange(e) {
    this.setState({selectedFile: e.target.files[0]})
  }
   handleUpload() {
    const formData = new FormData()
    formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
     //TODO: post photo to correct domain
    axios.post('my-domain.com/file-upload', formData)
  }
   handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
       () => { this.validateField(name, value) });
  }
   handleRegistration(e) {
    const data = {
      email: this.state.email,
      // password: this.state.password,
      // password_confirmation: this.state.password_confirmation,
      org_name: this.state.org_name,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      city: this.state.city,
      state: this.state.state_abbrev,
      link: this.state.link,
      description: this.state.description,
      phone_number: this.state.phone_number
    }
     axios
      .post("/orgs", {
        org: data
      })
      .then(function(response) {
        window.location = "/"
      })
      .catch(function(error) {
        console.log(error)
      })
  }
   render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className='formErrors'>
            {Object.keys(this.state.form_errors).map((fieldName, i) => {
              if(this.state.form_errors[fieldName].length > 0){
                return (
                  <p key={i}>{fieldName} {this.state.form_errors[fieldName]}</p>
                )
              } else {
                return '';
              }
            })}
          </div>
        </div>
         <form className="register_org_form">
          <fieldset className="input-container">
            <label htmlFor="org_name" className="label label--newline">Organization Name (required)</label>
            <br/>
            <input type="text" placeholder="ie. The Arctic Institute" className="input"
              value={this.state.org_name} name="org_name" id="org_name"
              onChange={this.handleChange} />
          </fieldset>
          <fieldset className="input-container">
            <label htmlFor="first_name" className="label label--newline">(Person of contact) First Name (required)</label>
            <br/>
            <input type="text" placeholder="ie. John" className="input"
              value={this.state.first_name} name="first_name" id="first_name"
              onChange={this.handleChange} />
            <br/>
             <label htmlFor="last_name" className="label label--newline">(Person of contact) Last Name (required)</label>
            <br/>
            <input type="text" placeholder="ie. Doe" className="input"
              value={this.state.last_name} name="last_name" id="last_name"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="email" className="label label--newline">Email (required)</label>
            <br/>
            <input type="text" placeholder="ie. info@thearcticinstitute.org" className="input"
              value={this.state.email} name="email" id="email"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="password" className="label label--newline">Password (required, 6 characters minimum)</label>
            <br/>
            <input type="password" placeholder="ie. password123" className="input"
              value={this.state.password} name="password" id="password"
              onChange={this.handleChange} />
            <br/>
             <label htmlFor="password_confirmation" className="label label--newline">Confirm password</label>
            <br/>
            <input type="password" placeholder="ie. password123" className="input"
              value={this.state.password_confirmation} name="password_confirmation" id="password_confirmation"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="phone_number" className="label label--newline">Phone number</label>
            <br/>
            <input type="text" placeholder="ie. (202)350-1384" className="input"
              value={this.state.phone_number} name="phone_number" id="phone_number"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="city" className="label label--newline">City</label>
            <br/>
            <input type="text" placeholder="ie. Washington" className="input"
              value={this.state.city} name="city" id="city"
              onChange={this.handleChange} />
            <br/>
             <label htmlFor="state_abbrev" className="label label--newline">State (abbreviation)</label>
            <br/>
            <input type="text" placeholder="ie. DC" className="input"
              value={this.state.state_abbrev} name="state_abbrev" id="state_abbrev"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="link" className="label label--newline">Link</label>
            <br/>
            <input type="text" placeholder="ie. thearcticinstitute.org" className="input"
              value={this.state.link} name="link" id="link"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container name-container">
            <label htmlFor="description" className="label label--newline">Description of your organization</label>
            <br/>
            <textarea placeholder="ie. The Arctic Institute is an interdisciplinary, independent think tank focused on Arctic policy issues with a network of researchers across the world." value={this.state.description}
              name="description" rows="6" cols="50" onChange={this.handleChange}
              id="description" className="input"></textarea>
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="photo" className="label label--newline">Photo</label>
            <br/>
            <input type="file" onChange={this.handleFileChange}/>
            <button onClick={this.handleUpload}>Upload!</button>
          </fieldset>
        </form>
         <fieldset className="input-container">
          <button type="submit" name="submit" value="Next Step"
            className="button submit-button" disabled={!this.state.form_valid} onClick={this.handleRegistration}>
              Complete organization registration!
              <span className="fa fa-angle-right marginLeft-xxs"></span>
          </button>
        </fieldset>
       </div>
    );
  }
}
 export default RegisterForm;
