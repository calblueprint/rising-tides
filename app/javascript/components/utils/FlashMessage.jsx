import React from "react";

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        message: "",
        show: false,
        is_error: false
    }
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  flashMessage(message) {
    this.setState({
        message: message,
        show: true,
        is_error: false
    });
    setTimeout(() => { this.hideMessage(); }, 4000);
  }

  flashError(message) {
    this.setState({
        message: message,
        show: true,
        is_error: true
    });
    setTimeout(() => { this.hideMessage(); }, 4000);
  }

  hideMessage() {
    this.setState({
        show: false
    });
  }

  render() {
    const { show, message, is_error } = this.state;

    return (
        <span>
            {is_error && <div className={`mw6 pa3 fixed mt3 top-3 left-1 bg-dark-red near-white br3 b ${show ? 'alert-shown' : 'alert-hidden'}`}>
                <span>{message}</span>
            </div>}
            {!is_error && <div className={`mw6 pa3 fixed mt3 top-3 left-1 bg-blue near-white br3 b ${show ? 'alert-shown' : 'alert-hidden'}`}>
                <span>{message}</span>
            </div>}
        </span>
    );
  }
}

export default FlashMessage;
