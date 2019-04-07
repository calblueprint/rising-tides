import React from "react";
import axios from 'axios';
import ProjectCard from '../../utils/ProjectCard';

class ProjectsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get("/api/all_projects").then(ret => {
      const projects = ret.data;

      this.setState({ projects });
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
            <div className="tl fl w-100 pl6 pr6 pt5 pb5">
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
                <hr className="mt3" />
                <div className="w-100 flex items-center">
                    <input className="dib ba b--black-10 w-25 mr2 bg-transparent pa2" type="text" placeholder="Select location..."  />
                    <input className="dib ba b--black-10 w-25 mr2 bg-transparent pa2" type="text" placeholder="mm/dd/yyyy"  />
                    <input className="dib ba b--black-10 w-25 mr2 bg-transparent pa2" type="text" placeholder="Project Type"  />
                    <input className="dib ba b--black-10 w-25 mr2 bg-transparent pa2" type="text" placeholder="Select skills..."  />
                    <a className="w-25 std-button" href="#">Update Search</a>
                </div>
                {projectList}
            </div>
      </div>
    );
  }
}

export default ProjectsIndex;
