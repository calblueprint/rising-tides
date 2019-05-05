/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

class Step3 extends React.Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentStep } = this.props;

    if (currentStep !== 3) {
      return null;
    }
    return (
      <>
        <section className="flex">
          <label htmlFor="city" className="mr3 w-80">
            <h3>City</h3>
            <Field type="text" name="city" />
            <ErrorMessage name="city" className="error" component="div" />
          </label>
          <label htmlFor="state" className="ml3 w-20">
            <h3>State</h3>
            <Field component="select" name="state">
              <option value="" />
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="DC">DC</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
              <option value="AS">AS</option>
              <option value="GU">GU</option>
              <option value="MP">MP</option>
              <option value="PR">PR</option>
              <option value="VI">VI</option>
            </Field>
            <ErrorMessage name="state" className="error" component="div" />
          </label>
        </section>
        <section>
          <label htmlFor="link">
            <h3>
              Website <i className="f5">(optional)</i>
            </h3>
            <Field type="text" name="link" placeholder="https://google.com" />
            <ErrorMessage name="link" className="error" component="div" />
          </label>
        </section>
        <section>
          <label htmlFor="description">
            <h3>Tell us about the organization&apos;s mission</h3>
            <Field
              name="description"
              component="textarea"
              row={6}
              style={{ resize: "none" }}
            />
            <ErrorMessage
              name="description"
              className="error"
              component="div"
            />
          </label>
        </section>
      </>
    );
  }
}

export default Step3;
