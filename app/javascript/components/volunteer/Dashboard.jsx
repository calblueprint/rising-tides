import React from "react"
import axios from 'axios';
import Logout from "./Logout"
import NavBar from "../utils/NavBar"
import ProjectCard from '../utils/ProjectCard';
import Dropdown from '../utils/Dropdown';


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
      skills: skills_a,
      project_types: project_types_a,
      deliverable_types: deliverable_types_a,
      show_filtering: false,
      keyword: ""
    };

    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

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

  updateSearch() {
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
            with_user_id: this.props.user.id,
            with_limit: 3
        }
    }
    axios.post("/api/projects/filter", payload).then(ret => {
      const projects = ret.data;
      this.setState({ projects });
      console.log("UPDATED PROJECTS LENGTH: " + projects.length);
    }).catch(ret => {
        console.log(JSON.stringify(ret));
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.updateSearch();
    }
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
    this.updateSearch();
  }

  render() {
    console.log(this.props);
    const { user } = this.props;

    let projectList;

    if (this.state.projects.length !== 0) {
      projectList = this.state.projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />
      });
    } else {
      projectList = <div>No Results</div>;
    }

    let applicationList;

    if (this.props.user_applications.length !== 0) {
      applicationList = this.props.user_applications.map((application, index) => {
        var project_status = (
            <div className="dib rt-yellow-bg ph3 pv2 fw4">
                In Review
            </div>
        );
        if (application.project.status == "interviewing") {
            project_status = (
                <div className="dib rt-yellow-bg ph3 pv2 fw4">
                    Interview
                </div>
            );
        } else if (application.project.status == "accepted") {
            project_status = (
                <div className="dib rt-yellow-bg ph3 pv2 fw4">
                    Interview
                </div>
            );
        } else if (application.project.status == "denied") {
            project_status = (
                <div className="dib ph3 pv2 fw4">
                    No longer in consideration
                </div>
            );
        }
        return (
            <div className="">
                <div className="bt b--black-10" />
                <div className="flex items-center pv3" key={index}>
                    <h4 className="w-25 ma0">{application.project.title}</h4>
                    <div className="w-25">
                        {project_status}
                    </div>
                    <div className="w-25">{application.project.organization.name}</div>
                    <a
                        className="w-25 tr"
                        href={"/applications/" + application.id}
                        >View job description <span className="ml3 f5 fa fa-angle-right"></span></a>
                </div>
            </div>
        );
      });
    } else {
      applicationList = <div>No Results</div>;
    }

    return (
        <div className="w-100 h-100 tc bg-white">
            <div className="h4 w-100 bg-moon-gray"></div>
            <div className="tl fl w-75 ml6 mr6 mt4 mb5 bg-white pa3">
                <div className="w-100 h3">
                    <div className="tl dib fl">
                        <h1 className="f1 ma0">Welcome, {user.first_name}</h1>
                    </div>
                    <div className="dib fr mt2">
                        <div className="tr">
                            <div className="dib flex items-center ba">
                                <span className="fa fa-search ma2"></span>
                                <input
                                    onKeyPress={this.handleKeyPress}
                                    onChange={this.handleChange("keyword")}
                                    className="bn bg-transparent"
                                    type="text"
                                    placeholder="Find Projects..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cf"></div>
                <div className="w-100 h1 mb3">
                    <div className="dib fl">
                        <h3>Applications</h3>
                    </div>
                </div>
                {applicationList}

                <div className="cf"></div>
                <div className="w-100 h1 mt5">
                    <div className="dib fl">
                        <h3>Current Projects</h3>
                    </div>
                    <div className="dib fr">
                        <h3
                            className="pointer disable-selection dim"
                            onClick={() => this.toggleFiltering()}>
                            Filter <span className="f6 fa fa-filter"></span>
                        </h3>
                    </div>
                </div>
                <div className="mb2 mt3 bt b--black-10" />
                {this.state.show_filtering &&
                <div className="w-100 flex items-center">
                    <Dropdown
                        titleHelper="Deliverable Type"
                        title="Deliverable Types"
                        list={this.state.deliverable_types}
                        toggleItem={this.toggleSelected}
                    />
                    <Dropdown
                        titleHelper="Project Type"
                        title="Project Types"
                        list={this.state.project_types}
                        toggleItem={this.toggleSelected}
                    />
                    <Dropdown
                        titleHelper="Skill"
                        title="Select Skills..."
                        list={this.state.skills}
                        toggleItem={this.toggleSelected}
                    />
                    <a
                        className="w-25 std-button pv2"
                        href="#"
                        onClick={() => this.updateSearch()}>
                        Update Search</a>
                </div>}
                {projectList}
            </div>
            <Logout />
        </div>
    );
  }
}

export default Dashboard;
