import React from "react";
import axios from 'axios';
import Logout from "./Logout";
import NavBar from "../utils/NavBar"
import Loader from "../utils/Loader"
import ProjectCard from '../utils/ProjectCard';
import Dropdown from '../utils/Dropdown';
import FlashMessage from '../utils/FlashMessage';
import ApplicationList from '../applications/ApplicationList';
import ProjectList from '../projects/ProjectList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    var skills_a = [];
    var i, skill;
    for (i in props.skills) {
        skill = props.skills[i];
        skills_a.push({
            id: i,
            uid: skill['id'],
            title: skill['name'],
            selected: false,
            key: 'skills'
        });
    }

    var project_types_a = [];
    var project_type;
    for (i in props.project_types) {
        project_type = props.project_types[i];
        project_types_a.push({
            id: i,
            uid: project_type['id'],
            title: project_type['name'],
            selected: false,
            key: 'project_types'
        });
    }

    var deliverable_types_a = [];
    var deliverable_type;
    for (i in props.deliverable_types) {
        deliverable_type = props.deliverable_types[i];
        deliverable_types_a.push({
            id: i,
            uid: deliverable_type['id'],
            title: deliverable_type['name'],
            selected: false,
            key: 'deliverable_types'
        });
    }

    this.state = {
      projects: [],
      applications: [],
      skills: skills_a,
      project_types: project_types_a,
      deliverable_types: deliverable_types_a,
      show_project_filtering: false,
      show_application_filtering: false,
      keyword: "",
      applicationsLoading: true,
      projectsLoading: true,
      application_statuses: [
        {
            id: 0,
            uid: 'pending',
            title: 'Pending',
            selected: false,
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
            selected: false,
            key: 'application_statuses'
        },
        {
            id: 3,
            uid: 'accepted',
            title: 'Accepted',
            selected: false,
            key: 'application_statuses'
        }
      ]
    };

    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleSelectedSingle = this.toggleSelectedSingle.bind(this);
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  toggleProjectFiltering() {
    this.setState({
        show_project_filtering: !this.state.show_project_filtering
    })
  }

  toggleApplicationFiltering() {
    this.setState({
        show_application_filtering: !this.state.show_application_filtering
    })
  }

  toggleSelected(id, key) {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp
    });
  }

  toggleSelectedSingle(id, key) {
    let temp = this.state[key];
    // clear selected first
    temp = temp.map(function(item) {
        item.selected = false;
        return item;
    });
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp
    });
  }

  updateProjectSearch() {
    var skill_ids = [];
    var project_type_ids = [];
    var deliverable_type_ids = [];

    var i;
    for (i in this.state.skills) {
        if (this.state.skills[i].selected)
            skill_ids.push(this.state.skills[i].uid);
    }
    for (i in this.state.project_types) {
        if (this.state.project_types[i].selected)
            project_type_ids.push(this.state.project_types[i].uid);
    }
    for (i in this.state.deliverable_types) {
        if (this.state.deliverable_types[i].selected)
            deliverable_type_ids.push(this.state.deliverable_types[i].uid);
    }

    var payload = {
        query: {
            with_skill_ids: skill_ids,
            with_project_type_ids: project_type_ids,
            with_deliverable_type_ids: deliverable_type_ids,
            with_keyword: this.state.keyword,
            with_organization_id: this.props.organization.id,
            with_limit: 3
        }
    }
    axios.post("/api/projects/filter", payload).then(ret => {
      const { projects, message } = ret.data;
        this.setState( {
            projects: projects,
            projectsLoading: false
        });

    }).catch(res => {
        this.flash_message.flashError(
            res.response.data.error
        );
    });
  }

  updateApplicationSearch() {
    var statuses = [];
    var i;
    for (i in this.state.application_statuses) {
        if (this.state.application_statuses[i].selected)
            statuses.push(this.state.application_statuses[i].uid);
    }

    var payload = {
        query: {
            with_statuses: statuses,
            with_organization_id: this.props.organization.id,
            with_statuses: [0, 2],
            with_limit: 3
        }
    };

    axios.post("/api/applications/filter", payload).then(ret => {
      const { applications, message } = ret.data;
      this.setState({
            applications: applications, 
            applicationsLoading: false
        });
    }).catch(res => {
        this.flash_message.flashError(
            res.response.data.error
        );
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.updateProjectSearch();
    }
  }

  componentDidMount() {
    this.updateApplicationSearch();
    this.updateProjectSearch();
  }

  render() {
    const { organization } = this.props;
    const { projects, projectsLoading } = this.state;

    return (
        <div className="w-100 h-100 tc bg-white">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            <div className="h4 w-100 bg-black bg-image"></div>
            <div className="tl fl w-75 ml6 mr6 mt4 mb5 bg-white pa3">
                <div className="w-100 h3">
                    <div className="tl dib fl">
                        <h1 className="f1 ma0">Welcome, {organization.name}</h1>
            
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
                <a
                    className="dib std-button pa2 fr"
                    href="/projects/new">
                    Create Project</a> 
                <div className="cf"></div>
                <div className="w-100 mb1 mt3 flex items-center">
                    <div className="dib w-100">
                        <a className="f4 pa0" href="/applications">Applications</a>
                    </div>
                    <div className="dib w-100 tr">
                        <h3
                            className="pointer disable-selection dim"
                            onClick={() => this.toggleApplicationFiltering()}>
                            Filter <span className="f6 fa fa-filter"></span>
                        </h3>
                    </div>
                </div>
                <div className="mb2 bt b--black-10" />
                {this.state.show_application_filtering &&
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
                        onClick={() => this.updateApplicationSearch()}>
                        Update Search</a>
                </div>}
                <ApplicationList
                    is_org_view={true}
                    applications={this.state.applications}
                    loading={this.state.applicationsLoading} />
                <div className="cf"></div>
                <div className="pv3 tc">
                    <a
                        href={"/applications"}
                        >View More Applications</a>
                </div>
                <div className="w-100 mt5 mb1 flex items-center">
                    <div className="dib w-100">
                        <a className="f4 pa0" href="/my-projects">Current Projects</a>
                    </div>
                    <div className="dib w-100 tr">
                        <h3
                            className="pointer disable-selection dim"
                            onClick={() => this.toggleProjectFiltering()}>
                            Filter <span className="f6 fa fa-filter"></span>
                        </h3>
                    </div>
                </div>
                <div className="mb2 bt b--black-10" />
                {this.state.show_project_filtering &&
                <div className="w-100 flex items-center">
                    <Dropdown
                        titleHelper="Deliverable Type"
                        title="Deliverable Types"
                        list={this.state.deliverable_types}
                        toggleItem={this.toggleSelectedSingle}
                        singleItem={true}
                    />
                    <Dropdown
                        titleHelper="Project Type"
                        title="Project Types"
                        list={this.state.project_types}
                        toggleItem={this.toggleSelectedSingle}
                        singleItem={true}
                    />
                    <Dropdown
                        titleHelper="Skill"
                        title="Select Skills..."
                        list={this.state.skills}
                        toggleItem={this.toggleSelected}
                    />
                    <a
                        className="w-100 std-button pv2"
                        href="#"
                        onClick={() => this.updateProjectSearch()}>
                        Update Search</a>
                </div>}
                <div className="cf"></div>
                <ProjectList projects={projects} loading={projectsLoading} />
                <div className="cf"></div>
                <div className="pv3 tc">
                    <a
                        href={"/my-projects"}
                        >View More Projects</a>
                </div>
            </div>
        </div>
    );
  }
}

export default Dashboard;
