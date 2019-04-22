/**
 * @prop project - project object associated with this row
 */

import React from "react";
import axios from "axios";

class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.spotsLeft = this.props.project.application_limit - this.props.project.application_count;
    this.state = {
      organization: null
    };
    if (props.project.start_time) {
        props.project.start_time = props.project.start_time.split('T')[0];
    }
    if (props.project.end_time) {
        props.project.end_time = props.project.end_time.split('T')[0];
    }
  }

  componentDidMount() {
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
    const { 
        project,
        organization,
        organization_signed_in,
        current_organization
    } = this.props;

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

    let apply_button = (
        <a className="std-button ph3 pv1 fw4 f5" href={project.id + "/applications/new"}>
            Apply
        </a>
    );
    if (organization_signed_in || this.spotsLeft <= 0) {
        apply_button = <span></span>;
    }

    let edit_button = (
        <div>
            <a className="std-button ph3 pv1 fw4 f5" href={project.id + "/edit"}>
                Edit
            </a>
        </div>
    );
    if (!organization_signed_in || organization.id != current_organization.id) {
        edit_button = <span></span>;
    }

    let applicationList;

    if (this.props.applications) {
      applicationList = this.props.applications.map((application, index) => {
        var project_status = (
            <div className="dib rt-yellow-bg ph3 pv2 fw4">
                In Review
            </div>
        );
        if (application.status == "interviewing") {
            project_status = (
                <div className="dib rt-yellow-bg ph3 pv2 fw4">
                    Interview
                </div>
            );
        } else if (application.status == "accepted") {
            project_status = (
                <div className="dib rt-yellow-bg ph3 pv2 fw4">
                    Interview
                </div>
            );
        } else if (application.status == "denied") {
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
                    <div className="w-25">{application.user.first_name} {application.user.last_name}</div>
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
            <div
                className="h5 absolute w-100 bg-moon-gray"
                style={{zIndex: -1}}></div>
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
                <h1 className="f1 ma0">{project.title}</h1>
                {edit_button}
                <div className="dib rt-yellow-bg ph3 pv2 mv4 f5 fw4">
                    {project_string_status}
                </div>
                <h3 className="mt3">Project Overview</h3>
                <p>{project.overview}</p>
                <div className="mt3 flex items-start">
                    <div className="w-75">
                        <h3 className="mt3">Description</h3>
                        <p>{project.overview}</p>
                        <h3 className="mt3">Deliverable</h3>
                        <p>{project.deliverable}</p>
                        <h3 className="mt3">Volunteer Requirements</h3>
                        <p>{project.volunteer_requirements}</p>
                        <h3 className="mt3">Other Details</h3>
                        <p>{project.other_details}</p>
                        <h3 className="mt3">Our Community Needs This If</h3>
                        <p>{project.question1}</p>
                        <h3 className="mt3">The Right Volunteer for this Project Is</h3>
                        <p>{project.question2}</p>
                        <h3 className="mt3">What You Give, What You Get</h3>
                        <p>{project.question3}</p>
                    </div>
                    <div className="w-25 bg-light-gray pa3 h-auto">
                        <div className="flex items-center">
                            {org_img}
                            <h4 className="ma0 dib">{organization.name}</h4>
                        </div>
                        <div className="mt2">
                            <span className="fa fa-map-pin mr2"></span>{organization.city}, {organization.state}
                        </div>
                        <div className="mt2">
                            <span className="fa fa-calendar mr2"></span>{project.start_time} - {project.end_time}
                        </div>
                        <div className="mt2 mb3">
                            <span className="fa fa-phone mr2"></span>{organization.contact_phone_number}
                        </div>
                        {apply_button}
                    </div>
                </div>
                <div className="w-100 h1 mb3">
                    <div className="dib fl">
                        <a href="/applications"><h3>Applications</h3></a>
                    </div>
                </div>
                {applicationList}
            </div>
        </div>
    );
  }
}

export default ProjectView;