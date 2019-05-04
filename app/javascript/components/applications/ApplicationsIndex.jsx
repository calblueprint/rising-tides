import React from "react";
import axios from "axios";
import Dropdown from '../utils/Dropdown';
import FlashMessage from '../utils/FlashMessage'
import ApplicationList from './ApplicationList';

class ApplicationsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      show_filtering: false,
      keyword: "",
      application_statuses: [
        {
            id: 0,
            uid: 'pending',
            title: 'Pending',
            selected: true,
            key: 'application_statuses'
        },
        {
            id: 1,
            uid: 'denied',
            title: 'Denied',
            selected: false,
            key: 'application_statuses'
        },
        {
            id: 2,
            uid: 'interviewing',
            title: 'Interviewing',
            selected: true,
            key: 'application_statuses'
        },
        {
            id: 3,
            uid: 'accepted',
            title: 'Accepted',
            selected: false,
            key: 'application_statuses'
        }
      ],
      loading: true
    };
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleFiltering = this.toggleFiltering.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.handleKeyPress = this.handleKeyPress(this);
  }

  componentDidMount() {
    this.updateSearch();
  }

  handleKeyPress(e) {
    console.log(e.key);
    if (e.key === 'Enter') {
        this.updateSearch();
    }
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  updateSearch() {
    var statuses = [];

    var i;
    for (i in this.state.application_statuses) {
        if (this.state.application_statuses[i].selected)
            statuses.push(this.state.application_statuses[i].uid);
    }

    var payload = {
        query: {
            with_statuses: statuses,
            with_keyword: this.state.keyword
        }
    };
    if (this.props.user) {
        payload.query.with_user_id = this.props.user.id;
    } else {
        payload.query.with_organization_id = this.props.organization.id;
    }

    axios.post("/api/applications/filter", payload).then(ret => {
      const { applications, message } = ret.data;
      this.setState({
        applications: applications,
        loading: false
      });
    }).catch(res => {
        this.flash_message.flashError(
            res.response.data.message
        );
    });
  }

  toggleFiltering() {
    this.setState({
        show_filtering: !this.state.show_filtering
    })
  }

  toggleSelected(id, key) {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp
    });
  }

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  render() {
    return (
        <div className="w-100 h-100 tc bg-white">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            <div className="h4 w-100 bg-black bg-image"></div>
            <div className="tl fl w-75 ml6 mr6 mt4 mb5 bg-white pa3">
                <div className="w-100 h3">
                    <div className="tl dib fl">
                        <h1 className="f1 ma0">My Applications</h1>
                    </div>
                    <div className="dib fr mt2">
                        <div className="tr">
                            <div className="dib flex items-center ba">
                                <span className="fa fa-search ma2"></span>
                                <input
                                    onKeyPress={this.handleKeyPress}
                                    onChange={this.handleChange("keyword")}
                                    className="bn bg-transparent w5"
                                    type="text"
                                    placeholder="Find Projects..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cf"></div>
                <div className="w-100 h1 mb3 mt3">
                    <div className="dib fl">
                        <h3>Applications</h3>
                    </div>
                    <div className="dib fr">
                        <h3
                            className="pointer disable-selection dim"
                            onClick={() => this.toggleFiltering()}>
                            Filter <span className="f6 fa fa-filter"></span>
                        </h3>
                    </div>
                </div>
                {this.state.show_filtering &&
                <div className="w-100 flex items-center">
                    <Dropdown
                        titleHelper="Application Status"
                        title="Select Status..."
                        list={this.state.application_statuses}
                        toggleItem={this.toggleSelected}
                    />
                    <a
                        className="w-100 std-button pv2"
                        href="#"
                        onClick={() => this.updateSearch()}>
                        Update Search</a>
                </div>}
                <ApplicationList
                    is_org_view={this.props.organization}
                    applications={this.state.applications} 
                    loading={this.state.loading}/>
            </div>
        </div>
    );
  }
}

export default ApplicationsIndex;
