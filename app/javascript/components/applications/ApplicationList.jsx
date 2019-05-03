/**
 * @prop application - application object associated with this row
 */

import React from "react";
import axios from "axios";
import Loader from "../utils/Loader"

class ApplicationList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { applications, is_org_view } = this.props;
    let applicationList;

    if (applications.length !== 0) {
      applicationList = applications.map((application, index) => {
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
        var app_columns;
        var date_string = application.created_at.split('T')[0];
        var time_string = application.created_at.split('T')[1].split('.')[0];
        var creation_time = date_string + ' ' + time_string;
        if (is_org_view) {
            app_columns = (
                <div className="flex items-center pv3">
                    <h4 className="w-25 ma0"><a className="pa0" href={"/users/" + application.user.id}>{application.user.first_name} {application.user.last_name}</a></h4>
                    <div className="w-25">
                        {project_status}
                    </div>
                    <div className="w-25"><a className="pa0" href={"/projects/" + application.project.id}>{application.project.title}</a></div>
                    <div className="w-25">{creation_time}</div>
                    <a
                        className="w-25 tr pa0"
                        href={"/applications/" + application.id}
                        >View Application <span className="ml3 f5 fa fa-angle-right"></span></a>
                </div>
            );
        } else {
            app_columns = (
                <div className="flex items-center pv3">
                    <div className="w-25"><a className="pa0" href={"/projects/" + application.project.id}>{application.project.title}</a></div>
                    <div className="w-25">
                        {project_status}
                    </div>
                    <h4 className="w-25 ma0"><a className="pa0" href={"/organizations/" + application.project.organization.id}>{application.project.organization.name}</a></h4>
                    <div className="w-25">{creation_time}</div>
                    <a
                        className="w-25 tr pa0"
                        href={"/applications/" + application.id}
                        >View Application <span className="ml3 f5 fa fa-angle-right"></span></a>
                </div>
            );
        }
        return (
            <div key={index}>
                <div className="bt b--black-10" />
                {app_columns}
            </div>
        );
      });
    } else {
      if (this.props.loading == false) {
            projectList = <div className="f4 tc pa3">There are no applications. </div>;
        }
    }

    var header_row;
    if (is_org_view) {
        header_row = (
            <div className="flex items-center pv3">
                <div className="w-25 ma0">User Name</div>
                <div className="w-25">
                    Application Status
                </div>
                <div className="w-25">Project Name</div>
                <div className="w-25">Submission Time</div>
                <div className="w-25 tr"></div>
            </div>
        );
    } else {
        header_row = (
            <div className="flex items-center pv3">
                <div className="w-25">Project Name</div>
                <div className="w-25">
                    Application Status
                </div>
                <div className="w-25 ma0">User Name</div>
                <div className="w-25">Submission Time</div>
                <div className="w-25 tr"></div>
            </div>
        );
    }
    return (
      <div>
        <div className="cf" />
         <Loader loading={this.props.loading} />
        {header_row}
        {applicationList}
      </div>
    );
  }
}

export default ApplicationList;
