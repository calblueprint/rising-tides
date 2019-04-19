import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
    this.renderStatusButton = this.renderStatusButton.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.goToProject = this.goToProject.bind(this);
    this.spotsLeft = this.props.project.application_limit - this.props.project.application_count;
    this.state = {
    }
  }

  renderStatusButton() {
    if (this.spotsLeft == 0) {
      this.statusButton = <div className="fl f5 w4 tc br1 ph3 pv2 mt0 mb2 font-accent bg-black lato">
                            All spots filled
                          </div>
    } else if (this.spotsLeft == 1) {
      this.statusButton = <div className="fl f5 w4 tc br1 ph3 pv2 mt0 mb2 black bg-white lato b">
                            1 spot left
                          </div>
    } else {
      this.statusButton = <div className="fl f5 w4 tc br1 ph3 pv2 mt0 mb2 black bg-white lato b">
                            {this.spotsLeft} spots left
                          </div>
    }
    return this.statusButton
  }

  renderCard() {
    return (<div className="proj-card-size col-item fl bg-black ma2 shadow-1" onClick={this.goToProject}>
        <img src="http://placekitten.com/g/600/300" className="db pic-height w-100 br2 br--top" alt="Photo of a kitten looking menacing."/>
        <div className="bt b--white pr3 pl3 pb3">
          <h1 className="white f4 b lato compact mt3 ma2">
            {this.props.project.title}
          </h1>
          <p className="white f5 lato fl truncate mb0 ma2">
            {this.props.project.organization.name}
          </p>
          <br/><br/>
          {this.renderStatusButton()}
      </div>
    </div>);
  }

  goToProject = () => {
    window.location.href = `/projects/${this.props.project.id}`;
  };

  render() {
    return (
      <div>
        {this.renderCard()}
      </div>
    )
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object,
  // TO-DO: add photos, project_type, project_status, project_capacity
  // photos: PropTypes.string,
  // project_type: PropTypes.string
};

export default ProjectCard;