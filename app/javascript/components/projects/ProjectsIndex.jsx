import React from "react";
import axios from 'axios';
import ProjectCard from '../utils/ProjectCard';
import Dropdown from '../utils/Dropdown';
import Loader from '../utils/Loader';
import FlashMessage from '../utils/FlashMessage'
import ProjectList from '../projects/ProjectList'

class ProjectsIndex extends React.Component {
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
      keyword: "",
      loading: true,
      filter_by_user_skills: false
    };
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleSelectedSingle = this.toggleSelectedSingle.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSkillCheck = this.handleSkillCheck.bind(this);
  }

  componentDidMount() {
    this.updateSearch();
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
            with_free_slots: true
        }
    }
    if (this.state.filter_by_user_skills) {
        payload.query.with_user_skills = this.props.user.id;
        console.log("Filtering by user skills");
    }
    axios.post("/api/projects/filter", payload).then(ret => {
      const { projects, message } = ret.data;
      this.setState({
        projects: projects,
        loading: false
    });
    }).catch(res => {
        this.flash_message.flashError(
            res.response.data.message
        );
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.updateSearch();
    }
  }

  handleSkillCheck() {
    console.log("setting filter_by_user_skills:" + this.state.filter_by_user_skills);
    this.setState({
        filter_by_user_skills: !this.state.filter_by_user_skills
    });
  }

  goBack = e => {
    e.preventDefault();
    window.location.href = "/";
  };

  render() {
    let { user_type} = this.props
    let { loading, projects, filter_by_user_skills } = this.state;

    var skill_filter_checkbox;
    if (this.props.user) {
        skill_filter_checkbox = (
            <div className="dib fr f5 mr4 bg-white disable-selection pt1">
                Filter by My Skills: <input
                    type="checkbox"
                    onChange={this.handleSkillCheck}
                    checked={filter_by_user_skills} />
            </div>);
    }

    return (
      <div className="w-100 h-100 tc">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            <div className="h4 w-100 bg-black bg-image"></div>
            <div className="tl fl w-100 pl6 pr6 pt5 pb5 bg-white">
                <div className="h-auto">
                    <div className="w-100 h3">
                        <div className="tl dib fl">
                            <h2>Browse Projects</h2>
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
                    {
                      user_type === 'Organization' ?
                        <a
                        className="dib std-button pa2 fr"
                        href="/projects/new">
                        Create Project
                        </a>
                        : ''
                    }
                    <div className="cf"></div>
                    <div className="w-100 h1 mt3">
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
                        {skill_filter_checkbox}
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
                        onClick={() => this.updateSearch()}>
                        Update Search</a>
                </div>}
                <ProjectList projects={projects} loading={loading} />
            </div>
      </div>
    );
  }
}

export default ProjectsIndex;
