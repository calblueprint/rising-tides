import React from "react";
import axios from 'axios';
import ProjectCard from '../../utils/ProjectCard';
import Dropdown from '../../utils/Dropdown';

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

    this.state = {
      projects: [],
      skills: skills_a,
      project_types: project_types_a
    };
    console.log(this.state);
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  componentDidMount() {
    axios.get("/api/all_projects").then(ret => {
      const projects = ret.data;

      this.setState({ projects });
    });
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
    let projectList;

    if (this.state.projects.length !== 0) {
      projectList = this.state.projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />
      });
    } else {
      projectList = <li>No Results</li>;
    }

    return (
      <div className="w-100 h-100 tc">
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
                                    <input className="bn bg-transparent" type="text" placeholder="Find Projects..." />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cf"></div>
                    <div className="w-100 h1">
                        <div className="dib fl">
                            <h3>Current Projects</h3>
                        </div>
                        <div className="dib fr">
                           <h3>Filter <span className="f6 fa fa-filter"></span></h3>
                        </div>
                    </div>
                </div>
                <div className="mb2 mt3 bt b--black-10" />
                <div className="w-100 flex items-center">
                    <input className="dib ba b--black-10 w-25 mr2 bg-transparent pa2" type="text" placeholder="Select location..."  />
                    <input className="dib ba b--black-10 w-25 mr2 bg-transparent pa2" type="text" placeholder="mm/dd/yyyy"  />
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
                    <a className="w-25 std-button" href="#">Update Search</a>
                </div>
                {projectList}
            </div>
      </div>
    );
  }
}

export default ProjectsIndex;
