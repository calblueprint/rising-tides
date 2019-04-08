/**
 * @prop project - project object associated with this row
 */

import React from "react";
import axios from "axios";

class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      organization: null
    };
  }

  componentDidMount() {
    axios
      .get(`/api/projects/${this.props.project.id}/applications`)
      .then(ret => {
        const applications = ret.data;
        this.setState({ applications });
      });
    if (this.props.project.organization_id != null) {
      console.log(this.props);
      axios
        .get(`/api/organizations/${this.props.project.organization_id}`)
        .then(ret => {
          const organization = ret.data;
          this.setState({ organization });
        });
    } else {
      console.log(
        `Project ${this.props.project.id} not tied to an organization!`
      );
    }
  }

  goToApplication = () => {
    window.location.href = `/projects/${this.props.project.id}/applications/new`;
  };

  goBack = e => {
    e.preventDefault();
    window.location.href = "/projects";
  };

  render() {
    const { project, organization } = this.props;

    var org_img = <span></span>;
    if (this.props.org_image_url) {
        org_img = <img className="w2 h2 mr2 dib"
                       src={this.props.org_image_url} />;
    }

    var project_string_status = "Accepting Applications";
    if (project.status == "in_progress") {
        project_string_status = "Applications Closed";
    } else if (project.status == "completed") {
        project_string_status = "Project Completed";
    }
    console.log("PROJECT STATUS: " + project.status);

    return (
        <div className="w-100 h-100 tc bg-white">
            <div
                className="h5 absolute w-100 bg-moon-gray"
                style={{zIndex: -1}}></div>
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
                <h1 className="f1 ma0">{project.title}</h1>
                <div className="dib rt-yellow-bg ph3 pv2 mv4 f5 fw4">
                    {project_string_status}
                </div>
                <h3 className="mt3">Project Overview</h3>
                <p>{project.description}</p>
                <h3 className="mt4">Project Plan</h3>
                <div className="mt3 flex items-start">
                    <div className="w-75 flex">
                        <div className="w-05 pl2 pr3 pv4">
                            <div className="vl-black h-100 p"></div>
                        </div>
                        <div className="w-90 pr4">
                            <div className="relative">
                                <div
                                    className="bg-black br-100 absolute mt1"
                                    style={{width: "11px", height: "11px", left: "-1.4072rem"}}></div>
                                <h4 className="fw4">mm/dd/yy</h4>
                            </div>
                            <p>
                                kjsalkf jksd fjdsk fjdka sljfdsaj fk jdadf
                                asfkdsj k sdjaflk jd lfkjdsa fkd ajfdksal
                                asdfjk dsjafk djsaklf das jakld f
                                asdfkldjds fkjsdakl fjdsklf
                            </p>
                            <div className="relative">
                                <div
                                    className="bg-black br-100 absolute mt1"
                                    style={{width: "11px", height: "11px", left: "-1.4072rem"}}></div>
                                <h4 className="fw4">mm/dd/yy</h4>
                            </div>
                            <p>
                                kjsalkf jksd fjdsk fjdka sljfdsaj fk jdadf
                                asfkdsj k sdjaflk jd lfkjdsa fkd ajfdksal
                                asdfjk dsjafk djsaklf das jakld f
                                asdfkldjds fkjsdakl fjdsklf
                            </p>
                            <div className="relative">
                                <div
                                    className="bg-black br-100 absolute mt1"
                                    style={{width: "11px", height: "11px", left: "-1.4072rem"}}></div>
                                <h4 className="fw4">mm/dd/yy</h4>
                            </div>
                            <p>
                                kjsalkf jksd fjdsk fjdka sljfdsaj fk jdadf
                                asfkdsj k sdjaflk jd lfkjdsa fkd ajfdksal
                                asdfjk dsjafk djsaklf das jakld f
                                asdfkldjds fkjsdakl fjdsklf
                            </p>
                        </div>
                    </div>
                    <div className="w-25 bg-light-gray pa4 h-auto">
                        <div className="flex items-center">
                            {org_img}
                            <h4 className="ma0 dib">{organization.name}</h4>
                        </div>
                        <div className="mt2">
                            <span className="fa fa-map-pin mr2"></span>{organization.city}, {organization.state}
                        </div>
                        <div className="mt2">
                            <span className="fa fa-phone mr2"></span>{organization.contact_phone_number}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default ProjectView;
