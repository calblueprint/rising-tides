/**
 * Component to handle barebones form submissions
 */

class DefaultForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _formatTitle(str) {
    str = str.split("_").join(" ");
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _handleChange(e) {
    let target = $(e.target);
    this.setState({ [target.attr('name')]: target.val() });
  }

  // route is accessed through api constants ie: APIConstants.requests.update returns
  //  /api/requests/${id}
  // params is a dictionary where key = object attribute, value = attribute value
  // resolve is a success function you pass in

  _attemptAction(route, params, success, reject) {
    Requester.post(route, params, success, reject);
  }

  _toggleEdit() {
    this.setState({ editable : !this.state.editable });
  }

  _formFields() {
    // Necessary because bootstrap-select does not fire onChange events
    const extraFields = { };
    $('.selectpicker').each((index, element) => {
        extraFields[$(element).attr("name")] = $(element).val();
    });
    return $.extend({}, this.state, extraFields);
  }
}