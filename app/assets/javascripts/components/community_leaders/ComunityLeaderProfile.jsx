class CommunityLeaderProfile extends React.Component {

  constructor(props) {
    super();
    this.state = {
      community_leader: {},
      dataLoaded: false,
    }
  }

  componentDidMount() {
    Requester.get('/api/community_leaders/' + this.props.community_leader.id).then((data) => {
      this.setState({
        community_leader: data,
        dataLoaded: true,
      });
    });
  }

  render() {
    const { community_leader, dataLoaded } = this.state;
    let pageContent;

    if (!dataLoaded) {
      pageContent = <div className="">Loading...</div>
    } else {
      pageContent = (
        <div className="">
          <div className="">
            <h2 className="">Personal Details</h2>
            <h3>Email</h3>
            {showValue(`${community_leader.email}`)}
          </div>
        </div>
      )
    }

    return (
      <div className="">
        <div className="container">
          {pageContent}
        </div>
      </div>
    );
  }

}
