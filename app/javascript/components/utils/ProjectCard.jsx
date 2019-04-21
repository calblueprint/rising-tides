import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this);
    this.goToProject = this.goToProject.bind(this);
    this.state = {
    }
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
  project: PropTypes.object
};

export default ProjectCard;