import React from "react";
import PropTypes from "prop-types";

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
    this.goToProject = this.goToProject.bind(this);
    console.log(props);
  }

  goToProject = () => {
    window.location.href = `/projects/${this.props.project.id}`;
  };

  render() {
    return (
        <div className="proj-card col-item dib ma2 shadow-1" onClick={this.goToProject}>
          <div className="pic-height w-100 br--top db bg-light-gray flex justify-center items-center">
            <i className="fas fa-image gray f1"/>
          </div>
          <div className="bt b--white pa3">
            <p className="f4 b lato compact mt3 ma2">
              {this.props.project.title}
            </p>
            <p className="f5 lato fl truncate mb0 ma2">
              {this.props.project.organization.name}
            </p>
        </div>
      </div>
    )
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object
};

export default ProjectCard;