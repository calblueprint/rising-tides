/**
 * @prop project - project object associated with this row
 */

import React from "react";
import axios from "axios";
import profile_pic from "images/profile_pic.png";
import ApplicationList from '../applications/ApplicationList';

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
        current_organization,
        milestones
    } = this.props;

    let profileUrl = this.props.org_image_url ? this.props.org_image_url : profile_pic;
    if (profileUrl === "/profile_images/original/missing.png") {
        profileUrl = profile_pic;
    }
    let org_img = <a href ={"/organizations/" + organization.id}><img className="h-100 ba" style={{width: 48}}  src={profileUrl} /></a>;


    var project_string_status = "Accepting Applications";
    if (project.status == "in_progress" || project.application_limit - project.application_count < 1) {
        project_string_status = "Applications Closed";
    } else if (project.status == "completed") {
        project_string_status = "Project Completed";
    }
    console.log("PROJECT STATUS: " + project.status);

    let apply_button = (
        <a className="b dib ph3 ba fr pv2 mv3 f5 fw4 bg-accent" href={project.id + "/applications/new"}>
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

    let skillList = null;
    
    if (this.props.skills) {
        skillList = this.props.skills.map((skill, index) => {
            return <div className="f5 ma1 dim br-pill ba ph3 pv2 dib lato black">{skill.name}</div>;
        })
    } else {
        skillList = <div>No skills.</div>;
    }

    let start_date = project.start_time;
    let end_date = project.end_date;
    if (project.start_time) {
        start_date = project.start_time.slice(6);
    }
    if (project.end_time) {
        end_date = project.end_time.slice(6);
    }
    let applications;

    applications = (!organization_signed_in || organization.id != current_organization.id) ? <span></span> : ( 
        <div>
            <div className="w-100 h1 mb3">
                    <div className="dib fl">
                        <a href="/applications"><h3>Applications</h3></a>
                    </div>
                    
            </div>
            <ApplicationList
                    is_org_view={true}
                    applications={this.props.applications} />
            </div>
        )

    let milestonesList = milestones.map((deliverable, index) => {
        return (
            <div className="ml4 mb4 relative">
                <div style={{left: '-38px', height: '11px', width: '11px'}} className="w1 h1 br-pill bw3 absolute bg-black"></div>
                <div className="f5">{deliverable.title}</div>
                <div className="mt3">{deliverable.description}</div>
            </div>
        );
    });

    return (
        <div className="w-100 h-100 tc bg-white">
            <div
                className="h5 absolute w-100 bg-black bg-image"
                style={{zIndex: -1}} />
            <div className="tl fl w-75 ml6 mr6 mt6 mb5 bg-white pa5">
                <h1 className="f1 ma0">{project.title}</h1>
                {edit_button}
                <div>
                    <div className="dib ph3 ba pv2 mv3 f5 fw4">
                        {project_string_status} 
                    </div>
                    {apply_button}
                </div>
                  <div className="bg-light-gray ma2 pa4 h-auto">
                    <div className="flex items-center">
                        {org_img}
                        <a href ={"/organizations/" + organization.id} className="ma0 f3 truncate dib">{organization.name}</a>
                    </div>
                    <div className="flex pt3">
                        <div className="pa2 w-33 truncate">
                            <i style={{marginLeft: 3}} className="fas fa-map-pin f4"></i><span style={{marginLeft: 10}} className="f5 truncate">{organization.city}, {organization.state}</span>
                        </div>
                        <div className="pa2 w-33 truncate">
                            <i className="fas fa-calendar f4"></i><span className="ml2 f5 truncate">{start_date} to {end_date}</span>
                        </div>
                        <div className="pa2 w-33 truncate">
                            <i className="fas fa-phone f4"></i><span style={{marginLeft: 5}} className="f5 truncate">E{organization.contact_phone_number}</span>
                        </div>
                    </div>
                </div>
                {project.overview ? (
                            <div className="pt3">
                                <h2 className="mt3 f3">Project Overview</h2>
                                <p className="f5">{project.overview}</p>
                            </div>
                        ) : (null)}
                <div className="mt3 flex items-start">
                    <div className="w-75">
                        <h3 className="mt3 mb3">Project Plan</h3>
                        <div className="ml4 bl">
                            {milestonesList}
                        </div>
                        {project.description ? (
                            <div>
                                <h2 className="mt4 f3">Description</h2>
                                <p className="f5">{project.description}</p>
                            </div>
                        ) : (null)}
                        {project.deliverable ? (
                            <div>
                                <h2 className="mt4 f3">Deliverable</h2>
                                <p className="f5">{project.deliverable}</p>
                            </div>
                        ) : (null)}
                        {this.props.skills ? (
                            <div>
                                <h2 className="mt4 f3 pb3">Volunteer Skills</h2>
                                {skillList}
                            </div>
                        ) : (null)}
                        {project.volunteer_requirements ? (
                            <div>
                                <h2 className="mt4 f3">Volunteer Requirements</h2>
                                <p className="f5">{project.volunteer_requirements}</p>
                            </div>
                        ) : (null)}
                        {project.other_details ? (
                            <div>
                                <h2 className="mt4 f3">Other Details</h2>
                                <p className="f5">{project.other_details}</p>
                            </div>
                        ) : (null)}
                        {project.question1 ? (
                            <div>
                                <h2 className="mt4 f3">Our Community Needs This If</h2>
                                <p className="f5"> {project.question1}</p>
                            </div>
                        ) : (null)}
                        {project.question2 ? (
                            <div>
                                <h2 className="mt4 f3">The Right Volunteer for this Project Is</h2>
                                <p className="f5">{project.question2}</p>
                            </div>
                        ) : (null)}
                        {project.question3 ? (
                            <div>
                                <h2 className="mt4 f3">What You Give, What You Get</h2>
                                <p className="f5">{project.question3}</p>
                            </div>
                        ) : (null)}
                    </div>
                    <div className="w-third bg-light-gray pa4 h-auto">
                        <div className="flex items-center">
                            {org_img}
                            <a className="ma0 f3 truncate dib">{organization.name}</a>
                        </div>
                        <div className="mt4 truncate">
                            <i className="fas fa-map-pin f4"></i><span className="ml2 f5 truncate">{organization.city}, {organization.state}</span>
                        </div>
                        <div className="mt4 truncate">
                            <i className="fas fa-calendar f4"></i><span className="ml2 f5 truncate">{project.start_time} - {project.end_time}</span>
                        </div>
                        <div className="mt4 truncate">
                            <i className="fas fa-phone f4"></i><span className="ml2 f5 truncate">{organization.contact_phone_number}</span>
                        </div>
                    </div>
                </div>
                <div className="w-100 h1 mt2">
                    <div className="dib fl">
                        <a className="mb2" href="/applications"><h2 className="f3">Applications</h2></a>
                    </div>
                </div>
                    <a className="mb2" href="/applications"><h2 className="f3">Applications</h2></a>
                {applications}
            </div>
        </div>
    );
  }
}

export default ProjectView;
