class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    // this.updateEvents();
  }

  render() {
    const { user } = this.props;

    let actionButton = <span>No Leader Button for you!</span>;

    if (is_leader(user)) {
      actionButton = <a href="#">Leader Button</a>;
    }

    return (
      <div>{actionButton}</div>
    );
  }
}
