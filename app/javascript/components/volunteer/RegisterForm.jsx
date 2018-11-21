import React from "react";
import $ from 'jquery';
import axios from 'axios';
 class RegisterForm extends React.Component {
   constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      city: "",
      state_abbrev: "",
      link: "",
      skills: "",
      bio: "",
      selectedFile: null,
       //TODO: change photo to be of appropriate type
      photo: "",
      form_errors: {first_name: '', last_name: '', email: ''},
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
    let first_name_valid = this.state.first_name_valid;
    let last_name_valid = this.state.last_name_valid;
    let email_valid = this.state.email_valid;
    let password_valid = this.state.password_valid;
    let password_match = this.state.password_match;
     switch(fieldName) {
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
                    first_name_valid: first_name_valid,
                    last_name_valid: last_name_valid,
                    email_valid: email_valid,
                    password_valid: password_valid,
                    password_match: password_match
                  }, this.validateForm);
  }
   validateForm() {
    this.setState({form_valid: this.state.first_name_valid
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
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      city: this.state.city,
      state_abbrev: this.state.state_abbrev,
      link: this.state.link,
      bio: this.state.bio,
      skills: this.state.skills,
      phone_number: this.state.phone_number
    }
     axios
      .post("/users", {
        user: data
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
         <form className="register_volunteer_form">
          <fieldset className="input-container">
            <label htmlFor="first_name" className="label label--newline">First Name (required)</label>
            <br/>
            <input type="text" placeholder="ie. John" className="input"
              value={this.state.first_name} name="first_name" id="first_name"
              onChange={this.handleChange} />
            <br/>
             <label htmlFor="last_name" className="label label--newline">Last Name (required)</label>
            <br/>
            <input type="text" placeholder="ie. Doe" className="input"
              value={this.state.last_name} name="last_name" id="last_name"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="email" className="label label--newline">Email (required)</label>
            <br/>
            <input type="text" placeholder="ie. johndoe@email.com" className="input"
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
            <input type="text" placeholder="ie. (123)456-7890" className="input"
              value={this.state.phone_number} name="phone_number" id="phone_number"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="city" className="label label--newline">City</label>
            <br/>
            <input type="text" placeholder="ie. San Francisco" className="input"
              value={this.state.city} name="city" id="city"
              onChange={this.handleChange} />
            <br/>
             <label htmlFor="state_abbrev" className="label label--newline">State (abbreviation)</label>
            <br/>
            <input type="text" placeholder="ie. CA" className="input"
              value={this.state.state_abbrev} name="state_abbrev" id="state_abbrev"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container">
            <label htmlFor="link" className="label label--newline">Link</label>
            <br/>
            <input type="text" placeholder="ie. linkedin.com/in/john-doe/" className="input"
              value={this.state.link} name="link" id="link"
              onChange={this.handleChange} />
          </fieldset>
           <fieldset className="input-container name-container">
            <label htmlFor="skills" className="label label--newline">Skills</label>
            <br/>
            <textarea placeholder="ie. Software Development" value={this.state.skills}
              name="skills" rows="6" cols="50" onChange={this.handleChange}
              id="skills" className="input"></textarea>
          </fieldset>
           <fieldset className="input-container name-container">
            <label htmlFor="bio" className="label label--newline">Bio</label>
            <br/>
            <textarea placeholder="Tell us about yourself!" value={this.state.bio}
              name="bio" rows="6" cols="50" onChange={this.handleChange}
              id="bio" className="input"></textarea>
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
              Complete volunteer registration!
              <span className="fa fa-angle-right marginLeft-xxs"></span>
          </button>
        </fieldset>
       </div>
    );
  }
}
 export default RegisterForm;
