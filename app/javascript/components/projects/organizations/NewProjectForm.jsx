import React from "react";
import axios from "axios";
import Dropdown from '../../utils/Dropdown';
import FlashMessage from '../../utils/FlashMessage'

class NewProjectForm extends React.Component {
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
            selected: i == 0,
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
            selected: i == 0,
            key: 'deliverable_types'
        });
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.state = {
      project: {
        application_limit: 2,
        user_limit: 1,
        organization_id: props.organization.id
      },
      deliverables: [{
        id: 0,
        deadline: date,
        description: ""
      }],
      message: "",
      error: "",
      skills: skills_a,
      project_types: project_types_a,
      deliverable_types: deliverable_types_a
    };
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleSelectedSingle = this.toggleSelectedSingle.bind(this);
    this.addDeliverable = this.addDeliverable.bind(this);
    this.removeDeliverable = this.removeDeliverable.bind(this);
    this.handlers = [];
  }

  componentDidMount() {

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

  addDeliverable() {
    var { deliverables } = this.state;
    deliverables.push({
        id: this.state.deliverables.length,
        deadline: "",
        description: ""
    });
    this.setState({
        deliverables
    });
  }

  removeDeliverable() {
    var { deliverables } = this.state;
    deliverables.splice(-1, 1);
    this.setState({
        deliverables
    });
  }

  handleChange = name => {
    if (!this.handlers[name]) {
      this.handlers[name] = event => {
        const { project } = this.state;
        project[name] = event.target.value;
        this.setState({ project });
      };
    }
    return this.handlers[name];
  };

  handleDeliverableChange = (id, name) => {
    if (!this.handlers[id + ":" + name]) {
      this.handlers[id + ":" + name] = event => {
        const { deliverables } = this.state;
        deliverables[id][name] = event.target.value;
        this.setState({ deliverables });
      };
    }
    return this.handlers[id + ":" + name];
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = "/projects/" + this.props.project.id;
  };

  handleSubmit() {
    var skill_ids = [];
    var project_type_id = 1;
    var deliverable_type_id = 1;

    var i;
    for (i in this.state.skills) {
        if (this.state.skills[i].selected)
            skill_ids.push(this.state.skills[i].uid);
    }
    for (i in this.state.project_types) {
        if (this.state.project_types[i].selected)
            project_type_id = this.state.project_types[i].uid;
    }
    for (i in this.state.deliverable_types) {
        if (this.state.deliverable_types[i].selected)
            deliverable_type_id = this.state.deliverable_types[i].uid;
    }

    let { project, deliverables } = this.state;
    project.skill_ids = skill_ids;
    project.project_type_id = project_type_id;
    project.deliverable_type_id = deliverable_type_id;
    project.application_limit = parseInt(project.application_limit);
    project.user_limit = parseInt(project.user_limit);

    const payload = {
        project: project,
        deliverables: deliverables
    };

    axios
      .post(`/api/projects`, payload)
      .then(res => {
        const { project, message } = res.data;
        if (message) {
          this.flash_message.flashMessage(
            message
          );
        }
        window.location.href = `/projects/${project.id}`;
      }).catch(res => {
        this.flash_message.flashError(
            res.response.data.message
        );
    });

    return false;
  }

  render() {
    const { project } = this.state;
    let deliverables = this.state.deliverables.map((deliverable, index) => {
        return (
            <div key={index}>
                <input
                    className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                    type="date"
                    onChange={this.handleDeliverableChange(index, "deadline")}
                    value={this.state.deliverables[index].deadline}
                />
                <textarea
                    rows="4"
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    onChange={this.handleDeliverableChange(index, "description")}
                    placeholder="Enter deliverable..."
                    value={this.state.deliverables[index].description}></textarea>
            </div>);
    });
    return (
        <div className="w-100 h-100 tc bg-white">
            <FlashMessage onRef={ref => (this.flash_message = ref)} />
            <div
                className="h5 absolute w-100 bg-moon-gray"
                style={{zIndex: -1}}></div>
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
                <h1 className="f1 ma0">New Project</h1>
                <h3 className="mt5">Title</h3>
                <input
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    type="text"
                    onChange={this.handleChange("title")}
                    value={this.state.project.title}
                />
                <div className="flex justify-between w-100">
                    <div className="dib w-100 mr3">
                        <h3 className="mt3">Start Time</h3>
                        <input
                            className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                            type="date"
                            onChange={this.handleChange("start_time")}
                            value={this.state.project.start_time}
                        />
                    </div>
                    <div className="dib w-100 ml3">
                        <h3 className="mt3">End Time</h3>
                        <input
                            className="dib essay-box bg-light-gray mt1 w-100 pa3 input"
                            type="date"
                            onChange={this.handleChange("end_time")}
                            value={this.state.project.end_time}
                        />
                    </div>
                </div>
                <h3 className="mt3">Brief Description</h3>
                <textarea
                    rows="6"
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    onChange={this.handleChange("description")}
                    value={this.state.project.description}></textarea>
                <h3 className="mt3">Project Plan</h3>
                <textarea
                    rows="6"
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    onChange={this.handleChange("overview")}
                    value={this.state.project.overview}></textarea>
                <div className="flex justify-between w-100">
                    <div className="dib w-30">
                        <h3 className="mt3">Professional Skills Needed</h3>
                        <Dropdown
                            titleHelper="Skill"
                            title="Select Skills..."
                            list={this.state.skills}
                            toggleItem={this.toggleSelected}
                        />
                    </div>
                    <div className="dib w-30">
                        <h3 className="mt3">Project Type</h3>
                        <Dropdown
                            titleHelper="Project Type"
                            title="Project Type"
                            list={this.state.project_types}
                            toggleItem={this.toggleSelectedSingle}
                            singleItem={true}
                        />
                    </div>
                    <div className="dib w-30">
                        <h3 className="mt3">Deliverable Type</h3>
                        <Dropdown
                            titleHelper="Deliverable Type"
                            title="Deliverable Type"
                            list={this.state.deliverable_types}
                            toggleItem={this.toggleSelectedSingle}
                            singleItem={true}
                        />
                    </div>
                </div>
                <h3 className="mt3">Our Community Needs This If</h3>
                <textarea
                    rows="6"
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    onChange={this.handleChange("question1")}
                    value={this.state.project.question1}></textarea>
                <h3 className="mt3">The Right Volunteer for this Project Is</h3>
                <textarea
                    rows="6"
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    onChange={this.handleChange("question2")}
                    value={this.state.project.question2}></textarea>
                <h3 className="mt3">What You Give, What You Get</h3>
                <textarea
                    rows="6"
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    onChange={this.handleChange("question3")}
                    value={this.state.project.question3}></textarea>
                <h3 className="mt5">Application Limit</h3>
                <input
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    type="number"
                    onChange={this.handleChange("application_limit")}
                    value={this.state.project.application_limit}
                />
                <h3 className="mt5">Volunteer Limit</h3>
                <input
                    className="essay-box bg-light-gray mt1 w-100 pa3"
                    type="number"
                    onChange={this.handleChange("user_limit")}
                    value={this.state.project.user_limit}
                />
                <h3 className="mt5">Project Plan</h3>
                {deliverables}
                <div className="flex mt3 w-100">
                    <div className="w-100">
                        <a className="dib std-button-white ph3 pv1 fw4 f5" onClick={this.addDeliverable}>
                            Add Deliverable
                        </a>
                    </div>
                    <div className="tr w-100">
                        <a className="dib std-button-black ph3 pv1 fw4 f5" onClick={this.removeDeliverable}>
                            Remove
                        </a>
                    </div>
                </div>
                <div className="mt5">
                    <a className="fl std-button-black ph3 pv1 fw4 f5" onClick={this.goBack}>
                        Cancel
                    </a>
                    <a className="fr std-button ph3 pv1 fw4 f5 ml3" onClick={() => this.handleSubmit()}>
                        Save
                    </a>
                </div>
            </div>
        </div>
    );
  }
}

export default NewProjectForm;
