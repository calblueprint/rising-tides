/**
 * Default modal template. For all components that require modals,
 * extend this class.
 */

class DefaultModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }
}